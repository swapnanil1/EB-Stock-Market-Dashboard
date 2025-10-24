import { useUser } from "@/context/UserContext"
import { useCallback, useEffect, useState } from "react"

const getAuthHeaders = () => {
	const token = localStorage.getItem("token")
	if (!token) {
		return { "Content-Type": "application/json" }
	}
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export const usePortfolioData = () => {
	const [portfolio, setPortfolio] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	// Get the portfolioVersion and fetchBalance from the context.
	const { portfolioVersion, fetchBalance } = useUser()

	const fetchPortfolio = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch("http://localhost:5000/api/portfolio", {
				headers: getAuthHeaders(),
			})
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || "Could not fetch portfolio data.")
			}
			const data = await response.json()
			setPortfolio(data)
		} catch (err) {
			console.error("Failed to fetch portfolio:", err)
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}, [])

	// This is the key effect. It runs initially and then again &again
	// anytime "portfolioVersion" changes, triggering a refetch

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchPortfolio()
		fetchBalance() // refresh the cash balance when portfolio changes
	}, [fetchPortfolio, fetchBalance, portfolioVersion])

	return { portfolio, isLoading, error }
}
