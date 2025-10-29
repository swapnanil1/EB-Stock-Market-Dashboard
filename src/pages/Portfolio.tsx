import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/Card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/Table";
import { useAuth } from "../context/AuthContext"; // import the auth hook
import type {
	ApiPortfolioResponse, // raw data from API
	PortfolioDisplayData, // final calculated data for display
} from "../types";

const API_BASE_URL = "API_BASE_URL";

// Helper function for formatting currency
const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
};

export function PortfolioPage() {
	const { token } = useAuth(); // get the auth token from our context
	const [portfolioData, setPortfolioData] =
		useState<PortfolioDisplayData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAndProcessPortfolio = async () => {
			// Don't fetch if the user is not logged in
			if (!token) {
				setIsLoading(false);
				return;
			}

			try {
				setIsLoading(true);
				setError(null);

				// fetch raw data from our backend
				const response = await fetch(`${API_BASE_URL}/api/portfolio`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch portfolio data.");
				}

				const rawData: ApiPortfolioResponse = await response.json();

				// perform all calculations on the frontend
				const displayHoldings = rawData.holdings.map((holding) => {
					const totalCost = holding.quantity * holding.averagePrice;
					const marketValue = holding.quantity * holding.currentPrice;
					const totalProfitLoss = marketValue - totalCost;
					return { ...holding, marketValue, totalCost, totalProfitLoss };
				});

				const summary = displayHoldings.reduce(
					(acc, holding) => {
						acc.totalCost += holding.totalCost;
						acc.totalMarketValue += holding.marketValue;
						return acc;
					},
					{ totalCost: 0, totalMarketValue: 0 },
				);

				const totalProfitLoss = summary.totalMarketValue - summary.totalCost;
				const totalValue = rawData.cashBalance + summary.totalMarketValue;

				// set the final, calculated data into state
				setPortfolioData({
					summary: {
						totalValue,
						totalCost: summary.totalCost,
						totalProfitLoss,
					},
					holdings: displayHoldings,
				});
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unknown error occurred.",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAndProcessPortfolio();
	}, [token]); // re-render if the token changes like on login

	if (isLoading) {
		return <div className="p-4 text-center">Loading portfolio...</div>;
	}

	if (error) {
		return (
			<div className="p-4 text-center text-destructive">Error: {error}</div>
		);
	}

	// ff the user is logged out, show a message
	if (!token)
		return (
			<div className="p-4 text-center">
				Please log in to view your portfolio.
			</div>
		);

	if (!portfolioData)
		return <div className="p-4 text-center">No portfolio data available.</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">My Portfolio</h1>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
				{" "}
				{/* Changed to 3 columns */}
				<Card>
					<CardHeader>
						<CardTitle>Total Value</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">
							{formatCurrency(portfolioData.summary.totalValue)}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Total Profit/Loss</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">
							{formatCurrency(portfolioData.summary.totalProfitLoss)}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Total Invested</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">
							{formatCurrency(portfolioData.summary.totalCost)}
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Your Holdings</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Symbol</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead className="text-right">Market Value</TableHead>
								<TableHead className="text-right">Total P/L</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{portfolioData.holdings.map((holding) => (
								<TableRow key={holding.symbol}>
									<TableCell className="font-medium">
										{holding.symbol}
									</TableCell>
									<TableCell>{holding.quantity}</TableCell>
									<TableCell className="text-right">
										{formatCurrency(holding.marketValue)}
									</TableCell>
									<TableCell className="text-right">
										{formatCurrency(holding.totalProfitLoss)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
