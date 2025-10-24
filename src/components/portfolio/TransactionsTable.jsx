import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useMemo } from "react"

// utility function for formatting currency
const formatCurrency = (value) => {
	if (typeof value !== "number") return "$0.00"
	return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function TransactionsTable({ transactions }) {
	const sortedTransactions = useMemo(() => {
		if (!transactions) return []
		// Create a new array to avoid mutating the original prop
		return [...transactions].sort(
			(a, b) => new Date(b.transactionDate) - new Date(a.transactionDate),
		)
	}, [transactions])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Transaction History</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Symbol</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead className="text-right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedTransactions.length > 0 ? (
							sortedTransactions.map((tx) => (
								<TableRow key={tx._id}>
									<TableCell className="text-muted-foreground text-sm">
										{new Date(tx.transactionDate).toLocaleString()}
									</TableCell>
									<TableCell>
										<span
											className={`font-medium ${
												tx.type === "buy" ? "text-success" : "text-destructive"
											}`}
										>
											{tx.type.toUpperCase()}
										</span>
									</TableCell>
									<TableCell className="font-medium">{tx.stockSymbol}</TableCell>
									<TableCell>{tx.quantity}</TableCell>
									<TableCell className="text-right">{formatCurrency(tx.price)}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan="5" className="h-24 text-center text-muted-foreground">
									You have no transaction history yet.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
