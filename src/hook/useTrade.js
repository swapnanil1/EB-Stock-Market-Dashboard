import { useUser } from "@/context/UserContext"
import { fetchWithAuth } from "@/lib/api"
import { useState } from "react"

export const useTrade = () => {
	const [isTrading, setIsTrading] = useState(false)
	const { fetchBalance, refreshPortfolio } = useUser()

	const executeTrade = async ({ stock, type, quantity }) => {
		if (!stock || !type || !quantity) {
			throw new Error("Missing trade parameters.")
		}

		setIsTrading(true)
		try {
			// Step 1: Get the live price.
			const quoteData = await fetchWithAuth(
				`http://localhost:5000/api/stocks/quote/${stock.symbol}`,
			)
			const price = quoteData.price
			if (!price) throw new Error("Live price is unavailable.")

			// Step 2: Submit the transaction.
			await fetchWithAuth("http://localhost:5000/api/transactions", {
				method: "POST",
				body: JSON.stringify({ symbol: stock.symbol, type, quantity, price }),
			})

			// Step 3: Handle success side-effects.
			fetchBalance()
			refreshPortfolio()
			alert(`Successfully ${type} ${quantity} share(s) of ${stock.symbol} @ $${price.toFixed(2)}`)
		} catch (error) {
			console.error("Trade execution error:", error.message)
			alert(`Error: ${error.message}`)
			// Re-throw the error so the component knows the trade failed
			throw error
		} finally {
			setIsTrading(false)
		}
	}

	// Return the state and the function the component needs.
	return { isTrading, executeTrade }
}
