import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useWatchlistManager } from "@/hooks/useWatchlistManager"
import { Loader2, Search, X } from "lucide-react"

const generateColorForSymbol = (symbol) => {
	if (!symbol)
		return {
			bg: "bg-gray-200/50",
			text: "text-gray-800",
			hoverBg: "hover:bg-gray-200/80",
			darkBg: "dark:bg-gray-900/50",
			darkText: "dark:text-gray-300",
			darkHover: "dark:hover:bg-gray-900/80",
		}
	let hash = 0
	for (let i = 0; i < symbol.length; i++) hash = symbol.charCodeAt(i) + ((hash << 5) - hash)
	const colorPalette = [
		{
			bg: "bg-blue-200/50",
			text: "text-blue-800",
			hoverBg: "hover:bg-blue-200/80",
			darkBg: "dark:bg-blue-900/50",
			darkText: "dark:text-blue-300",
			darkHover: "dark:hover:bg-blue-900/80",
		},
		{
			bg: "bg-green-200/50",
			text: "text-green-800",
			hoverBg: "hover:bg-green-200/80",
			darkBg: "dark:bg-green-900/50",
			darkText: "dark:text-green-300",
			darkHover: "dark:hover:bg-green-900/80",
		},
		{
			bg: "bg-yellow-200/50",
			text: "text-yellow-800",
			hoverBg: "hover:bg-yellow-200/80",
			darkBg: "dark:bg-yellow-900/50",
			darkText: "dark:text-yellow-300",
			darkHover: "dark:hover:bg-yellow-900/80",
		},
		{
			bg: "bg-purple-200/50",
			text: "text-purple-800",
			hoverBg: "hover:bg-purple-200/80",
			darkBg: "dark:bg-purple-900/50",
			darkText: "dark:text-purple-300",
			darkHover: "dark:hover:bg-purple-900/80",
		},
		{
			bg: "bg-red-200/50",
			text: "text-red-800",
			hoverBg: "hover:bg-red-200/80",
			darkBg: "dark:bg-red-900/50",
			darkText: "dark:text-red-300",
			darkHover: "dark:hover:bg-red-900/80",
		},
		{
			bg: "bg-indigo-200/50",
			text: "text-indigo-800",
			hoverBg: "hover:bg-indigo-200/80",
			darkBg: "dark:bg-indigo-900/50",
			darkText: "dark:text-indigo-300",
			darkHover: "dark:hover:bg-indigo-900/80",
		},
	]
	return colorPalette[Math.abs(hash % colorPalette.length)]
}

export function WatchlistPage() {
	const {
		watchlist,
		isLoading,
		searchQuery,
		setSearchQuery,
		searchResults,
		isSearching,
		isMutating,
		addStock,
		removeStock,
	} = useWatchlistManager()

	return (
		<div className="container mx-auto max-w-screen-xl p-4" style={{ width: "90%" }}>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="md:col-span-1">
					<CardHeader>
						<CardTitle>My Watchlist</CardTitle>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="flex items-center justify-center py-10">
								<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
							</div>
						) : (
							<div className="flex flex-wrap gap-2">
								{watchlist.length > 0 ? (
									watchlist.map((stock) => {
										if (!stock || !stock.symbol) return null
										const colorClasses = generateColorForSymbol(stock.symbol)
										const className = `flex items-center justify-between pl-3 pr-1 py-1 rounded-full text-sm font-medium transition-colors ${colorClasses.bg} ${colorClasses.text} ${colorClasses.hoverBg} ${colorClasses.darkBg} ${colorClasses.darkText} ${colorClasses.darkHover}`

										return (
											<TooltipProvider key={stock.symbol} delayDuration={300}>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className={className}>
															<span>{stock.symbol}</span>
															<Button
																variant="ghost"
																size="icon"
																className="h-6 w-6 rounded-full"
																onClick={() => removeStock(stock.symbol)}
																disabled={isMutating}
															>
																{isMutating ? (
																	<Loader2 className="h-4 w-4 animate-spin" />
																) : (
																	<X className="h-4 w-4" />
																)}
															</Button>
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>{stock.name}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										)
									})
								) : (
									<p className="text-muted-foreground">Your watchlist is empty.</p>
								)}
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Add to Watchlist</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
							<Input
								placeholder="Search by symbol or name (e.g., AAPL)"
								className="pl-10"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							{isSearching && (
								<Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />
							)}
						</div>

						<div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
							{searchResults.length > 0 &&
								searchQuery.length > 0 &&
								searchResults.map((stock) => (
									<button
										key={stock.symbol}
										type="button"
										onClick={() => addStock(stock)}
										disabled={isMutating}
										className="w-full flex items-center justify-between text-left p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
									>
										<div>
											<p className="font-semibold">{stock.symbol}</p>
											<p className="text-sm text-muted-foreground">{stock.name}</p>
										</div>
										<Button variant="outline" size="sm" className="pointer-events-none">
											{isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
										</Button>
									</button>
								))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
