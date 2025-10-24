import { useTheme } from "@/components/theme-provider"
import { useUser } from "@/context/UserContext"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// Import all necessary components from shadcn/ui
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Import all necessary icons
import { Menu, Moon, Search, Sun, UserCircle } from "lucide-react"

import { AuthDialog } from "@/components/auth/AuthDialog" // The newly extracted component
// Import our new custom components
import { StockSearch } from "@/components/search/StockSearch"
import { TradePanel } from "@/components/trading/TradePanel"

export function Header() {
	const { theme, setTheme } = useTheme()
	const navigate = useNavigate()
	const { cashBalance, fetchBalance } = useUser()

	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false) // Manages dialog visibility

	// State for the Trading Terminal
	const [tradePanelStocks, setTradePanelStocks] = useState([])

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			setIsLoggedIn(true)
			fetchBalance()
		}
	}, [fetchBalance])

	const handleLogout = () => {
		localStorage.removeItem("token")
		setIsLoggedIn(false)
		navigate("/")
	}

	// Callback function for the AuthDialog to call on success
	const handleLoginSuccess = () => {
		setIsLoggedIn(true)
		setIsAuthDialogOpen(false) // Close the dialog
	}

	const handleSelectStockForTrade = (stock) => {
		if (!tradePanelStocks.find((s) => s.symbol === stock.symbol)) {
			setTradePanelStocks((prevStocks) => [...prevStocks, stock])
		}
	}

	const navItems = [
		{ href: "/portfolio", label: "Portfolio" },
		{ href: "/", label: "Dashboard" },
		{ href: "/watchlist", label: "Watchlist" },
	]

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="relative flex h-14 items-center px-4 md:px-6">
				<div className="flex items-center">
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left">
								<SheetHeader>
									<SheetTitle>Navigation</SheetTitle>
								</SheetHeader>
								{isLoggedIn && (
									<nav className="grid gap-6 text-lg font-medium mt-6">
										{navItems.map((item) => (
											<Link
												key={item.href}
												to={item.href}
												className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted rounded-md"
											>
												{item.label}
											</Link>
										))}
									</nav>
								)}
							</SheetContent>
						</Sheet>
					</div>
					<Link to="/" className="ml-2 flex items-center space-x-2">
						<span className="font-bold text-lg">StockPils</span>
					</Link>
				</div>

				{isLoggedIn && (
					<nav className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium">
						{navItems.map((item) => (
							<Link
								key={item.href}
								to={item.href}
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
					</nav>
				)}

				<div className="flex items-center space-x-2 md:space-x-4 ml-auto">
					{isLoggedIn && cashBalance !== null && (
						<div className="hidden sm:block text-lg font-semibold text-primary animate-in fade-in">
							{cashBalance.toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							})}
						</div>
					)}

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="ghost" size="icon" className="w-9 h-9">
								<Search className="h-5 w-5" />
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-[90vw] h-[90vh] flex flex-col p-0 gap-0">
							<DialogHeader className="p-6 pb-4">
								<DialogTitle>Trading Terminal</DialogTitle>
								<DialogDescription className="sr-only">
									Search for a stock to view its live data and execute trades.
								</DialogDescription>
							</DialogHeader>
							<div className="px-6 pb-4 z-20">
								<StockSearch onSelectStock={handleSelectStockForTrade} />
							</div>
							<div className="grow p-6 pt-2 overflow-y-auto">
								{tradePanelStocks.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
										{tradePanelStocks.map((stock) => (
											<div key={stock.symbol} className="flex flex-col">
												<TradePanel stock={stock} />
											</div>
										))}
									</div>
								) : (
									<div className="flex items-center justify-center h-full text-muted-foreground rounded-lg border border-dashed">
										<p>Search for a stock to start trading.</p>
									</div>
								)}
							</div>
						</DialogContent>
					</Dialog>

					<Button
						variant="ghost"
						size="icon"
						className="w-9 h-9"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</Button>

					{isLoggedIn ? (
						<Button onClick={handleLogout}>
							<UserCircle className="mr-2 h-5 w-5" />
							Log Out
						</Button>
					) : (
						<AuthDialog
							open={isAuthDialogOpen}
							onOpenChange={setIsAuthDialogOpen}
							onLoginSuccess={handleLoginSuccess}
						/>
					)}
				</div>
			</div>
		</header>
	)
}
