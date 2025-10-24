import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const formatCurrency = (value) => {
	if (typeof value !== "number") return "$0.00"
	return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function WatchlistTable({ data }) {
	// This component does expects a `data` prop that we get from watchlist from our hook

	return (
		<Card>
			<CardHeader>
				<CardTitle>My Watchlist</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Symbol</TableHead>
							<TableHead>Company Name</TableHead>
							<TableHead>Price</TableHead>
							<TableHead className="text-right">Change (%)</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data && data.length > 0 ? (
							data.map((stock) => (
								<TableRow key={stock.symbol}>
									<TableCell className="font-medium">{stock.symbol}</TableCell>
									<TableCell className="text-muted-foreground truncate max-w-xs">
										{stock.name}
									</TableCell>
									<TableCell>{formatCurrency(stock.currentPrice)}</TableCell>
									<TableCell
										className={`text-right font-medium ${
											stock.change >= 0 ? "text-success" : "text-destructive"
										}`}
									>
										{stock.change != null && stock.percentChange != null
											? `${stock.change.toFixed(2)} (${stock.percentChange.toFixed(2)}%)`
											: "N/A"}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan="4" className="h-24 text-center text-muted-foreground">
									Your watchlist is empty.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
