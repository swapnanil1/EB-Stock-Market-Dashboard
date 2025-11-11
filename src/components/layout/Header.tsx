import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Theme } from "../../App";
import { useAuth } from "../../context/AuthContext";
import { TransactionForm } from "../stocks/TransactionForm";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";

interface HeaderProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

// --- Inline SVG Icons ---
const SunIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-5 w-5"
	>
		<title>Light Mode</title>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2" />
		<path d="M12 20v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="m17.66 17.66 1.41 1.41" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="m6.34 17.66-1.41 1.41" />
		<path d="m19.07 4.93-1.41 1.41" />
	</svg>
);
const MoonIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-5 w-5"
	>
		<title>Dark Mode</title>
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
	</svg>
);
const SearchIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-4 w-4 mr-2"
	>
		<title>Search</title>
		<path d="m21 21-4.34-4.34" />
		<circle cx="11" cy="11" r="8" />
	</svg>
);

export function Header({ theme, setTheme }: HeaderProps) {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<>
			<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
				<div className="container mx-auto flex h-14 items-center justify-between">
					<div className="flex items-center">
						<Link to="/" className="font-bold text-lg">
							StockPils
						</Link>
					</div>

					<div className="flex items-center gap-x-6">
						<nav className="flex items-center gap-x-6 text-sm font-medium">
							<Link
								to="/"
								className="text-foreground/80 transition-colors hover:text-foreground"
							>
								Portfolio
							</Link>
							<Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
								<SearchIcon /> Search
							</Button>
							<Link
								to="/watchlist"
								className="text-foreground/60 transition-colors hover:text-foreground"
							>
								Watchlist
							</Link>
						</nav>
					</div>

					<div className="flex items-center gap-x-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							{theme === "dark" ? <SunIcon /> : <MoonIcon />}
						</Button>
						{isAuthenticated ? (
							<Button onClick={handleLogout} variant="ghost">
								Logout
							</Button>
						) : (
							<Link to="/login">
								<Button>Login</Button>
							</Link>
						)}
					</div>
				</div>
			</header>

			<Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
				<TransactionForm />
			</Dialog>
		</>
	);
}
