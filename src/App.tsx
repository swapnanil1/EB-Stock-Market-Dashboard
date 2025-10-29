import { BrowserRouter, Route, Routes } from "react-router";
import { PortfolioPage } from "./pages/Portfolio";
export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PortfolioPage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
