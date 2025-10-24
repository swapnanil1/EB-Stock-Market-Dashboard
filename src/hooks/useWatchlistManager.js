import { useCallback, useEffect, useState } from "react"

const getAuthHeaders = () => {
	const token = localStorage.getItem("token")
	if (!token) throw new Error("Authentication token not found.")
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

const API_URL = "https://stockpils-api.onrender.com/api"

export const useWatchlistManager = () => {
	const [watchlist, setWatchlist] = useState([])
	const [searchQuery, setSearchQuery] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const [isLoading, setIsLoading] = useState(true) // For initial watchlist load
	const [isSearching, setIsSearching] = useState(false) // For search-as-you-type
	const [isMutating, setIsMutating] = useState(false) // For add/remove actions

	// Fetch logic
	const fetchWatchlist = useCallback(async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`${API_URL}/watchlist`, { headers: getAuthHeaders() })
			if (!response.ok) throw new Error("Failed to fetch watchlist")
			const data = await response.json()
			setWatchlist(data)
		} catch (error) {
			console.error("Error fetching watchlist:", error)
			setWatchlist([]) // Reset to empty on error
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchWatchlist()
	}, [fetchWatchlist])

	// Add/Remove logic
	const addStock = useCallback(async (stockToAdd) => {
		setIsMutating(true)
		try {
			const response = await fetch(`${API_URL}/watchlist`, {
				method: "POST",
				headers: getAuthHeaders(),
				body: JSON.stringify({ symbol: stockToAdd.symbol, name: stockToAdd.name }),
			})
			if (!response.ok) throw new Error("Failed to add stock")
			const data = await response.json()
			setWatchlist(data)
			setSearchQuery("") // Clear search if success
			setSearchResults([])
		} catch (error) {
			console.error("Error adding stock:", error)
		} finally {
			setIsMutating(false)
		}
	}, [])

	const removeStock = useCallback(async (symbol) => {
		setIsMutating(true)
		try {
			const response = await fetch(`${API_URL}/watchlist/${symbol}`, {
				method: "DELETE",
				headers: getAuthHeaders(),
			})
			if (!response.ok) throw new Error("Failed to remove stock")
			const data = await response.json()
			setWatchlist(data) // Update local state
		} catch (error) {
			console.error("Error removing stock:", error)
		} finally {
			setIsMutating(false)
		}
	}, [])

	// Search logic
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setSearchResults([])
			return
		}
		setIsSearching(true)
		const debounce = setTimeout(async () => {
			try {
				const response = await fetch(`${API_URL}/stocks/search?query=${searchQuery}`, {
					headers: getAuthHeaders(),
				})
				if (!response.ok) throw new Error("Search failed.")
				const data = await response.json()
				setSearchResults(data)
			} catch (error) {
				console.error("Failed to search stocks:", error)
			} finally {
				setIsSearching(false)
			}
		}, 300)
		return () => clearTimeout(debounce)
	}, [searchQuery])

	// Expose all the state and functions
	return {
		watchlist,
		isLoading,
		searchQuery,
		setSearchQuery,
		searchResults,
		isSearching,
		isMutating,
		addStock,
		removeStock,
	}
}
