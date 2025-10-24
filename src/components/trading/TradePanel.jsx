import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTrade } from "@/hooks/useTrade"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export function TradePanel({ stock }) {
	const [quantity, setQuantity] = useState(1)
	// Gets all the logic and loading state from the hook
	const { isTrading, executeTrade } = useTrade()

	const handleTradeClick = async (type) => {
		//  this component just asks the hook to do the trade.
		await executeTrade({ stock, type, quantity })
	}

	return (
		<Card className="flex flex-col flex-grow">
			<CardHeader>
				<CardTitle className="truncate text-base">
					{stock.symbol} - {stock.name}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-grow flex flex-col justify-between">
				<div className="text-center p-4">
					<p className="text-sm text-muted-foreground">
						Click Buy or Sell to execute a trade at the current market price.
					</p>
				</div>
				<div className="flex items-end gap-2">
					<div className="grid flex-shrink-0 w-24 items-center gap-1.5">
						<Label htmlFor={`quantity-${stock.symbol}`}>Quantity</Label>
						<Input
							type="number"
							id={`quantity-${stock.symbol}`}
							value={quantity}
							s
							onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
							min="1"
						/>
					</div>
					<Button
						onClick={() => handleTradeClick("buy")}
						disabled={isTrading}
						className="flex-1 bg-green-600 hover:bg-green-700"
					>
						{isTrading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy"}
					</Button>
					<Button
						onClick={() => handleTradeClick("sell")}
						disabled={isTrading}
						variant="destructive"
						className="flex-1"
					>
						{isTrading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sell"}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
