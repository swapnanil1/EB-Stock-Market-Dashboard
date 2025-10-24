import { useCallback, useEffect, useState } from "react"

const getAuthHeaders = () => {
	const token = localStorage.getItem("token")
	if (!token) return { "Content-Type": "application/json" }
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export const useWatchlist = () => {
	const [watchlist, setWatchlist] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchWatchlist = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch("http://localhost:5000/api/watchlist/details", {
				headers: getAuthHeaders(),
			})
			if (!response.ok) {
				throw new Error("Could not fetch watchlist details.")
			}
			const data = await response.json()
			setWatchlist(data)
		} catch (err) {
			console.error("Failed to fetch watchlist:", err)
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}, [])
	useEffect(() => {
		fetchWatchlist()
	}, [fetchWatchlist])

	return { watchlist, isLoading, error, refreshWatchlist: fetchWatchlist }
}
