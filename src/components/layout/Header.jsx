import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"

import { Menu, Moon, Sun, Search, UserCircle } from "lucide-react"

export function Header() {
	const { theme, setTheme } = useTheme()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const navItems = [
		{ href: "/portfolio", label: "Portfolio" },
		{ href: "/watchlist", label: "Watchlist" },
		{ href: "/news", label: "News" },
	]

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
									<SheetTitle className="text-2xl">Navigation Menu</SheetTitle>
									<SheetDescription className="text-xl">
										Select a page to navigate to from the list below.
									</SheetDescription>
								</SheetHeader>

								<nav className="flex flex-col ml-4 mr-4 gap-6 text-lg font-medium mt-6">
									{navItems.map((item) => (
										<Link
											key={item.href}
											to={item.href}
											className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted focus:bg-muted focus:text-foreground focus:outline-none rounded-md"
										>
											{item.label}
										</Link>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
					<Link to="/" className="ml-2 flex items-center space-x-2">
						<span className="font-bold text-lg">StockPils</span>
					</Link>
				</div>

				<nav className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium">
					{navItems.map((item) => (
						<Link
							key={item.href}
							to={item.href}
							className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted focus:bg-muted focus:text-foreground focus:outline-none rounded-md"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center space-x-2 ml-auto">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="ghost" size="icon" className="w-9 h-9">
								<Search className="h-5 w-5" />
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[80vw]">
							<DialogHeader>
								<DialogTitle>Search Stocks</DialogTitle>
								<DialogDescription>
									You can search for stocks by name or ticker symbol here.
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">Search functionality will be implemented here.</div>
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
						<Button onClick={() => setIsLoggedIn(false)}>
							<UserCircle className="mr-2 h-5 w-5" />
							Log Out
						</Button>
					) : (
						<Button onClick={() => setIsLoggedIn(true)}>Log In</Button>
					)}
				</div>
			</div>
		</header>
	)
}
