import React from "react"
import { Route, Routes } from "react-router-dom"
import { Header } from "./components/layout/Header"
import { ThemeProvider } from "./components/theme-provider"
import { DashboardPage } from "./pages/DashboardPage"
import { PortfolioPage } from "./pages/PortfolioPage"
import { WatchlistPage } from "./pages/Watchlist"
function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Header />
			<main>
				<Routes>
					<Route path="/portfolio" element={<PortfolioPage />} />
					<Route path="/watchlist" element={<WatchlistPage />} />
					<Route path="/" element={<DashboardPage />} />
				</Routes>
			</main>
		</ThemeProvider>
	)
}

export default App
