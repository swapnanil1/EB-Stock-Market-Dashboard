import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// A small utility function for formatting currency.
const formatCurrency = (value) => {
	if (typeof value !== "number") return "$0.00"
	return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function PortfolioSummary({ data }) {
	// This component expects the entire "portfolio" object as a "data" prop
	if (!data) {
		return null
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Value</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{formatCurrency(data.totalPortfolioValue)}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Net Profit / Loss</CardTitle>
				</CardHeader>
				<CardContent>
					<div
						className={`text-2xl font-bold ${
							data.netProfitLoss >= 0 ? "text-success" : "text-destructive"
						}`}
					>
						{formatCurrency(data.netProfitLoss)}
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Holdings Value</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{formatCurrency(data.holdingsValue)}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{formatCurrency(data.cashBalance)}</div>
				</CardContent>
			</Card>
		</div>
	)
}
