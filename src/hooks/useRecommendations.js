import { useCallback, useEffect, useState } from "react"

const getAuthHeaders = () => {
	const token = localStorage.getItem("token")
	if (!token) return { "Content-Type": "application/json" }
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export const useRecommendations = (initialSymbol = "AAPL") => {
	const [data, setData] = useState(null)
	const [symbol, setSymbol] = useState(initialSymbol)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchRecs = useCallback(async (fetchSymbol) => {
		if (!fetchSymbol) return
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch(
				`https://stockpils-api.onrender.com/api/stocks/recommendations/${fetchSymbol}`,
				{
					headers: getAuthHeaders(),
				},
			)
			if (!response.ok) {
				throw new Error(`Could not fetch recommendations for ${fetchSymbol}.`)
			}
			const responseData = await response.json()
			setData([
				{ name: "Strong Buy", value: responseData.strongBuy },
				{ name: "Buy", value: responseData.buy },
				{ name: "Hold", value: responseData.hold },
				{ name: "Sell", value: responseData.sell },
				{ name: "Strong Sell", value: responseData.strongSell },
			])
		} catch (err) {
			console.error(err)
			setError(err.message)
			setData(null)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchRecs(symbol)
	}, [symbol, fetchRecs])

	const searchSymbol = (newSymbol) => {
		setSymbol(newSymbol.toUpperCase())
	}

	return { data, symbol, isLoading, error, searchSymbol }
}
