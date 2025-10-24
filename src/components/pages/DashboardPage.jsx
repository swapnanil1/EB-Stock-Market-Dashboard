import { PortfolioAllocationChart } from "@/components/dashboard/PortfolioAllocationChart"
import { ProfitLossChart } from "@/components/dashboard/ProfitLossChart"
import { RecommendationsChart } from "@/components/dashboard/RecommendationsChart" // 1. Import the new component
import { WatchlistTable } from "@/components/dashboard/WatchlistTable"
import { usePortfolio } from "@/hooks/usePortfolio"
import { useWatchlist } from "@/hooks/useWatchlist"
import { Loader2 } from "lucide-react"

export function DashboardPage() {
	// Call the custom hooks to get data and state.
	const {
		pieChartData,
		barChartData,
		isLoading: isPortfolioLoading,
		error: portfolioError,
	} = usePortfolio()
	const { watchlist, isLoading: isWatchlistLoading, error: watchlistError } = useWatchlist()

	if (isPortfolioLoading || isWatchlistLoading) {
		return (
			<div className="flex items-center justify-center h-[80vh]">
				<Loader2 className="h-12 w-12 animate-spin" />
			</div>
		)
	}

	if (portfolioError || watchlistError) {
		return (
			<div className="container mx-auto p-4 text-center">
				<h2 className="text-2xl font-bold text-destructive mb-4">Failed to Load Dashboard</h2>
				<p className="text-muted-foreground">
					There was an error fetching your data. Please try refreshing the page.
				</p>
				<p className="text-sm text-destructive mt-2">{portfolioError || watchlistError}</p>
			</div>
		)
	}

	return (
		<div className="container mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold">Dashboard</h1>

			<div className="grid gap-6 md:grid-cols-2">
				<PortfolioAllocationChart data={pieChartData} />
				<ProfitLossChart data={barChartData} />
			</div>

			<WatchlistTable data={watchlist} />

			<RecommendationsChart />
		</div>
	)
}
