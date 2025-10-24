import { Input } from "@/components/ui/input"
import { useStockSearch } from "@/hooks/useStockSearch"
import { Loader2, Search } from "lucide-react"

export function StockSearch({ onSelectStock }) {
	// All the logic and state are now handled by the hook.
	const { query, setQuery, results, setResults, isSearching } = useStockSearch()

	const handleSelect = (stock) => {
		onSelectStock(stock)
		// Clear the search state after selection.
		setQuery("")
		setResults([])
	}

	// This component's only job is to render the UI based on the hook's state.
	return (
		<div className="relative w-full">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
				<Input
					placeholder="Search by symbol or name..."
					className="pl-10"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				{isSearching && (
					<Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />
				)}
			</div>
			{results.length > 0 && (
				<div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
					{results.map((stock) => (
						<button
							key={stock.symbol}
							type="button"
							onClick={() => handleSelect(stock)}
							className="w-full flex items-center justify-between text-left p-3 hover:bg-muted cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
						>
							<div>
								<p className="font-semibold">{stock.symbol}</p>
								<p className="text-sm text-muted-foreground">{stock.name}</p>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
