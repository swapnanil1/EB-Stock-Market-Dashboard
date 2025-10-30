import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input"; // import Input for the new search bar
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/Table";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "https://stockpils-api.onrender.com";

interface WatchlistItem {
	symbol: string;
	name: string;
	currentPrice: number;
	change: number;
	percentChange: number;
}

interface SearchResult {
	symbol: string;
	name: string;
}

const formatCurrency = (value: number) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
		value,
	);

export function WatchlistPage() {
	const { token } = useAuth();
	const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// state for local search ---
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	// fetch Watchlist on load
	useEffect(() => {
		if (!token) return;
		const fetchWatchlist = async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/api/watchlist`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (res.ok) setWatchlist(await res.json());
			} finally {
				setIsLoading(false);
			}
		};
		fetchWatchlist();
	}, [token]);

	// local Search Effect (Debounced)
	useEffect(() => {
		if (searchTerm.trim() === "") {
			setSearchResults([]);
			return;
		}
		const delayDebounceFn = setTimeout(async () => {
			setIsSearching(true);
			try {
				const res = await fetch(
					`${API_BASE_URL}/api/stocks/search?query=${searchTerm}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				if (res.ok) setSearchResults(await res.json());
			} finally {
				setIsSearching(false);
			}
		}, 300);
		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, token]);

	// Handle Add to Watchlist
	const handleAdd = async (stock: SearchResult) => {
		//  don't wait for server to update UI, clear search immediately
		setSearchTerm("");
		setSearchResults([]);

		try {
			const res = await fetch(`${API_BASE_URL}/api/watchlist`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ symbol: stock.symbol, name: stock.name }),
			});
			if (res.ok) {
				// The server returns the updated watchlist, so we can just set it
				setWatchlist(await res.json());
				// We need to re-fetch to get live prices, or just wait for the next natural refresh.
				// For simplicity, we'll trigger a full refresh of the list:
				const refreshRes = await fetch(`${API_BASE_URL}/api/watchlist`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (refreshRes.ok) setWatchlist(await refreshRes.json());
			}
		} catch (err) {
			console.error("Failed to add to watchlist", err);
		}
	};

	// handle Remove
	const handleRemove = async (symbol: string) => {
		setWatchlist((current) => current.filter((s) => s.symbol !== symbol)); // Optimistic
		await fetch(`${API_BASE_URL}/api/watchlist/${symbol}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});
	};

	if (!token) return <div className="p-4 text-center">Please log in.</div>;

	return (
		<div className="container mx-auto p-4 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">My Watchlist</h1>
			</div>

			{/* Watchlist Search Section */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Add to Watchlist</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="relative">
						<Input
							placeholder="Search for a stock to add..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						{/* Search Results Dropdown */}
						{searchResults.length > 0 && (
							<div className="absolute top-full mt-1 w-full z-10 bg-popover border rounded-md shadow-md max-h-48 overflow-y-auto">
								{searchResults.map((stock) => (
									<div
										key={stock.symbol}
										className="flex items-center justify-between p-2 hover:bg-secondary"
									>
										<div>
											<span className="font-semibold">{stock.symbol}</span>
											<span className="text-sm text-muted-foreground ml-2">
												{stock.name}
											</span>
										</div>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleAdd(stock)}
										>
											Add
										</Button>
									</div>
								))}
							</div>
						)}
						{isSearching && (
							<div className="absolute top-full mt-1 p-2 text-sm text-muted-foreground">
								Searching...
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Existing Watchlist Table */}
			<Card>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Symbol</TableHead>
								<TableHead className="hidden md:table-cell">Company</TableHead>
								<TableHead className="text-right">Price</TableHead>
								<TableHead className="text-right">Change</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={5} className="text-center h-24">
										Loading...
									</TableCell>
								</TableRow>
							) : watchlist.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="text-center h-24">
										Your watchlist is empty.
									</TableCell>
								</TableRow>
							) : (
								watchlist.map((stock) => (
									<TableRow key={stock.symbol}>
										<TableCell className="font-medium">
											{stock.symbol}
										</TableCell>
										<TableCell className="hidden md:table-cell text-muted-foreground">
											{stock.name}
										</TableCell>
										<TableCell className="text-right">
											{formatCurrency(stock.currentPrice)}
										</TableCell>
										<TableCell
											className={`text-right ${stock.change >= 0 ? "text-green-600" : "text-destructive"}`}
										>
											{stock.change.toFixed(2)} (
											{stock.percentChange.toFixed(2)}%)
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleRemove(stock.symbol)}
												className="text-destructive hover:text-destructive"
											>
												Remove
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
