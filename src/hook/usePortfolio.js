import { useEffect, useMemo, useState } from "react"

const getAuthHeaders = () => {
	const token = localStorage.getItem("token")
	if (!token) return { "Content-Type": "application/json" }
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export const usePortfolio = () => {
	const [portfolio, setPortfolio] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchPortfolio = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const response = await fetch("http://localhost:5000/api/portfolio", {
					headers: getAuthHeaders(),
				})
				if (!response.ok) {
					throw new Error("Could not fetch portfolio data. Please ensure you are logged in.")
				}
				const data = await response.json()
				setPortfolio(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchPortfolio()
	}, [])

	const pieChartData = useMemo(() => {
		if (!portfolio?.holdings) return []
		return Object.values(portfolio.holdings)
			.map((h) => ({ name: h.symbol, value: h.marketValue }))
			.filter((h) => h.value > 0)
	}, [portfolio])

	const barChartData = useMemo(() => {
		if (!portfolio?.holdings) return []
		return Object.values(portfolio.holdings).map((h) => ({
			name: h.symbol,
			"Profit/Loss": h.netProfitLoss,
		}))
	}, [portfolio])

	return { portfolio, pieChartData, barChartData, isLoading, error }
}
