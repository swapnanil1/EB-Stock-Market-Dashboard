import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { PortfolioPage } from "./pages/Portfolio";

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<PortfolioPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</main>
			</BrowserRouter>
		</AuthProvider>
	);
}
