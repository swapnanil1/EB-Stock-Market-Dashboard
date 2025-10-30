import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const API_BASE_URL = "http://localhost:5000";

// define the shape of our search result
interface SearchResult {
	symbol: string;
	name: string;
}

export const TransactionForm = () => {
	const { token } = useAuth();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [selectedStock, setSelectedStock] = useState<SearchResult | null>(null);
	const [quantity, setQuantity] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);

	// debounced search effect
	useEffect(() => {
		// Don't search if the term is empty
		if (searchTerm.trim() === "") {
			setSearchResults([]);
			return;
		}

		const delayDebounceFn = setTimeout(async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/stocks/search?query=${searchTerm}`,
					{ headers: { Authorization: `Bearer ${token}` } },
				);
				if (!response.ok) throw new Error("Search failed");
				const data: SearchResult[] = await response.json();
				setSearchResults(data);
			} catch (err) {
				console.error(err);
			}
		}, 300); // wait for 300ms after typing stop

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, token]);

	const handleBuy = async () => {
		if (!selectedStock || !quantity || Number(quantity) <= 0) {
			setError("Please select a stock.");
			return;
		}

		setIsLoading(true);
		setError(null);
		setSuccess(null);

		try {
			// get the latest price before buying
			const quoteRes = await fetch(
				`${API_BASE_URL}/api/stocks/quote/${selectedStock.symbol}`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			if (!quoteRes.ok) throw new Error("Could not fetch latest price.");
			const quoteData = await quoteRes.json();

			// execute the transaction
			const transRes = await fetch(`${API_BASE_URL}/api/transactions`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					symbol: selectedStock.symbol,
					type: "buy",
					quantity: Number(quantity),
					price: quoteData.price,
				}),
			});

			if (!transRes.ok) {
				const errorData = await transRes.json();
				throw new Error(errorData.message || "Transaction failed.");
			}

			setSuccess(
				`Successfully purchased ${quantity} shares of ${selectedStock.symbol}!`,
			);
			// reset form after a delay
			setTimeout(() => {
				setSelectedStock(null);
				setSearchTerm("");
				setQuantity("");
				setSuccess(null);
			}, 2000);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	// UI when a stock has been selected
	if (selectedStock) {
		return (
			<div className="space-y-4">
				<div>
					<h3 className="font-semibold">
						{selectedStock.name} ({selectedStock.symbol})
					</h3>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setSelectedStock(null)}
						className="p-0 h-auto text-sm"
					>
						Back to search
					</Button>
				</div>
				<Input
					type="number"
					placeholder="Quantity"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
					min="1"
				/>
				{error && <p className="text-sm text-destructive">{error}</p>}
				{success && <p className="text-sm text-green-600">{success}</p>}
				<Button onClick={handleBuy} disabled={isLoading} className="w-full">
					{isLoading ? "Processing..." : `Buy ${selectedStock.symbol}`}
				</Button>
			</div>
		);
	}

	// UI for searching for a stock
	return (
		<div className="space-y-2">
			<Input
				type="text"
				placeholder="Search for a stock (e.g., AAPL)"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<div className="h-48 overflow-y-auto rounded-md border">
				{searchResults.map((stock) => (
					<button
						type="button"
						key={stock.symbol}
						onClick={() => setSelectedStock(stock)}
						className="block w-full text-left p-2 hover:bg-secondary cursor-pointer"
					>
						<p className="font-semibold">{stock.symbol}</p>
						<p className="text-sm text-foreground/70">{stock.name}</p>
					</button>
				))}
			</div>
		</div>
	);
};
