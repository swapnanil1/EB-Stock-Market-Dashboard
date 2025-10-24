// src/context/UserContext.jsx
import { createContext, useCallback, useContext, useState } from "react"

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
	const [cashBalance, setCashBalance] = useState(null)
	const [portfolioVersion, setPortfolioVersion] = useState(0)

	const fetchBalance = useCallback(async () => {
		const token = localStorage.getItem("token")
		if (!token) return

		try {
			const response = await fetch("http://localhost:5000/api/portfolio", {
				headers: { Authorization: `Bearer ${token}` },
			})
			const data = await response.json()
			setCashBalance(data.cashBalance)
		} catch (error) {
			console.error("Failed to fetch balance:", error)
			setCashBalance(0)
		}
	}, [])

	const refreshPortfolio = () => {
		setPortfolioVersion((prevVersion) => prevVersion + 1)
	}

	return (
		<UserContext.Provider value={{ cashBalance, fetchBalance, refreshPortfolio, portfolioVersion }}>
			{children}
		</UserContext.Provider>
	)
}
