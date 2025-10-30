import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TransactionForm } from "../stocks/TransactionForm";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";

export function Header() {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<>
			<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
								Search
							</Button>
							<Link
								to="/watchlist"
								className="text-foreground/60 transition-colors hover:text-foreground"
							>
								Watchlist
							</Link>
						</nav>
					</div>

					<div className="flex items-center">
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
