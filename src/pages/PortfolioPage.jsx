import { HoldingsTable } from "@/components/portfolio/HoldingsTable"
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary"
import { TransactionsTable } from "@/components/portfolio/TransactionsTable"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { Loader2 } from "lucide-react"

export function PortfolioPage() {
	// 1 Get all data and state from our custom hook
	const { portfolio, isLoading, error } = usePortfolioData()

	// 2 Handle the loading state
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="h-12 w-12 animate-spin" />
			</div>
		)
	}

	// 3 Handle the error state
	if (error || !portfolio) {
		return (
			<div className="container mx-auto p-4 text-center">
				<h2 className="text-2xl font-bold text-destructive mb-4">Failed to Load Portfolio</h2>
				<p className="text-muted-foreground">
					{error || "Could not load portfolio data. Please try refreshing the page."}
				</p>
			</div>
		)
	}

	// 4 If data is ready, render the clean &compose layout.
	return (
		<div className="container mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold">My Portfolio</h1>

			<PortfolioSummary data={portfolio} />

			<HoldingsTable holdings={portfolio.holdings} />

			<TransactionsTable transactions={portfolio.transactions} />
		</div>
	)
}
