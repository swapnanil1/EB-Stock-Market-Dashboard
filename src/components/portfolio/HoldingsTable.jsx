import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

// utility function for formatting currency
const formatCurrency = (value) => {
	if (typeof value !== "number") return "$0.00"
	return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function HoldingsTable({ holdings }) {
	const holdingsArray = Object.values(holdings || {})

	return (
		<Card>
			<CardHeader>
				<CardTitle>My Holdings</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Symbol</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Current Price</TableHead>
							<TableHead>Market Value</TableHead>
							<TableHead className="text-right">Net P/L</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{holdingsArray.length > 0 ? (
							holdingsArray.map((stock) => (
								<TableRow key={stock.symbol}>
									<TableCell className="font-medium">{stock.symbol}</TableCell>
									<TableCell>{stock.quantity}</TableCell>
									<TableCell>{formatCurrency(stock.currentPrice)}</TableCell>
									<TableCell>{formatCurrency(stock.marketValue)}</TableCell>
									<TableCell
										className={`text-right ${
											stock.netProfitLoss >= 0 ? "text-success" : "text-destructive"
										}`}
									>
										{formatCurrency(stock.netProfitLoss)}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan="5" className="h-24 text-center text-muted-foreground">
									You do not own any stocks yet.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
