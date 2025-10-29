import { use, useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../component/ui/Card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../component/ui/Table";
import type { PortfolioData } from "../types";

const MOCK_PORTFOLIO_DATA: PortfolioData = {
	summary: {
		totalValue: 10550.0,
		totalCost: 10000.0,
		totalProfitLoss: 550.0,
		dailyChange: 150.0,
		dailyChangePercentage: 1.43,
	},
	holdings: [
		{
			symbol: "AAPL",
			quantity: 10,
			averagePrice: 150.0,
			currentPrice: 175.0,
			totalCost: 1500.0,
			marketValue: 1750.0,
			dailyChange: 50.0,
			dailyChangePercentage: 2.04,
			totalProfitLoss: 250.0,
			totalProfitLossPercentage: 16.0,
		},
		{
			symbol: "GOOGL",
			quantity: 5,
			averagePrice: 1300.0,
			currentPrice: 1360.0,
			totalCost: 6500.0,
			marketValue: 6800.0,
			dailyChange: 100.0,
			dailyChangePercentage: 1.0,
			totalProfitLoss: 300.0,
			totalProfitLossPercentage: 4.0,
		},
		{
			symbol: "TSLA",
			quantity: 10,
			averagePrice: 200.0,
			currentPrice: 200.0,
			totalCost: 2000.0,
			marketValue: 2000.0,
			dailyChange: 0.0,
			dailyChangePercentage: 0.0,
			totalProfitLoss: 0.0,
			totalProfitLossPercentage: 0.0,
		},
	],
};
const callAPI = (): Promise<PortfolioData> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			Math.random() > 0.9
				? reject(
						new Error("Failed to connect to the server . Please try later"),
					)
				: resolve(MOCK_PORTFOLIO_DATA);
		}, 1500);
	});
};
export function PortfolioPage() {
	// State Management
	const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadPortfolio = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const data = await callAPI();
				// if no errors setProtfolio data
				setPortfolio(data);
			} catch (err) {
				err instanceof Error
					? setError(err.message)
					: setError("Unknown error");
			} finally {
				setIsLoading(false);
			}
		};
		loadPortfolio();
	}, []);
	if (isLoading) {
		return <div className="p-4">Loading portfolio...</div>;
	}

	if (error) {
		return <div className="p-4 text-destructive">Error: {error}</div>;
	}
	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold mb-4">My Portfolio</h1>

			<p>Summary Cards </p>
			<br />
			<p>Holdings Table </p>

			<pre className="mt-4 p-4 bg-secondary rounded-md">
				{JSON.stringify(portfolio, null, 2)}
			</pre>
		</div>
	);
}
