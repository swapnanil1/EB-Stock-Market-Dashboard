import { useEffect, useState } from "react"

// A helper function to get auth headers. This could also live in a shared utility file
const getAuthHeaders = () => {
	const token = localStorage.getItem("token")
	if (!token) return { "Content-Type": "application/json" }
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export const useStockSearch = () => {
	const [query, setQuery] = useState("")
	const [results, setResults] = useState([])
	const [isSearching, setIsSearching] = useState(false)

	useEffect(() => {
		// If  query empty, clear results
		if (query.trim() === "") {
			setResults([])
			setIsSearching(false)
			return
		}

		setIsSearching(true)
		// Debounce API calls will avoid spamming the server on every keystroke
		const debounce = setTimeout(async () => {
			try {
				const response = await fetch(
					`https://stockpils-api.onrender.com/api/stocks/search?query=${query}`,
					{
						headers: getAuthHeaders(),
					},
				)
				if (!response.ok) {
					throw new Error("Search failed. Please try again.")
				}
				const data = await response.json()
				setResults(data)
			} catch (error) {
				console.error("Stock search error:", error)
				setResults([])
			} finally {
				setIsSearching(false)
			}
		}, 300)

		// Cleanup fn()  It runs when the component the query changes
		// This will prevents old, outdated API calls from resolving
		return () => clearTimeout(debounce)
	}, [query]) // This effect re-runs only when the `query` state changes

	return { query, setQuery, results, setResults, isSearching }
}
