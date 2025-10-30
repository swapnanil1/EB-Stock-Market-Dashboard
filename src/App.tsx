import { useEffect, useState } from "react"; // 1. Import hooks
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { PortfolioPage } from "./pages/Portfolio";
import { WatchlistPage } from "./pages/WatchlistPage";

export type Theme = "light" | "dark";

export default function App() {
	const [theme, setTheme] = useState<Theme>("dark");

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
	}, [theme]);

	return (
		<AuthProvider>
			<BrowserRouter>
				<Header theme={theme} setTheme={setTheme} />
				<main>
					<Routes>
						<Route path="/" element={<PortfolioPage />} />
						<Route path="/watchlist" element={<WatchlistPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</main>
			</BrowserRouter>
		</AuthProvider>
	);
}
