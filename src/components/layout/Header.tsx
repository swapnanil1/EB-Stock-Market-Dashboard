import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for programmatic navigation
import { useAuth } from "../../context/AuthContext"; // to check login state
import { TransactionForm } from "../stocks/TransactionForm";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";
export function Header() {
	const { isAuthenticated, logout } = useAuth(); // get auth state and functions
	const navigate = useNavigate(); // hook to change pages

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login"); // redirect to login after logout
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 items-center">
				{/* main title */}
				<div className="mr-4 flex items-center">
					<a href="/" className="font-bold">
						{" "}
						StockPils
					</a>
				</div>

				{/* nav links */}
				<nav className="flex items-center space-x-6 text-sm font-medium">
					<a href="/" className="transition-colors hover:text-foreground/80">
						Portfolio
					</a>
					<a
						href="/watchlist"
						className="text-foreground/60 transition-colors hover:text-foreground/80"
					>
						Watchlist
					</a>
				</nav>

				{/* Right side buttons */}
				<div className="flex flex-1 items-center justify-end space-x-2">
					{/* Search Button */}
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setIsDialogOpen(true)}
					>
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
						>
							<title>Search</title>
							<path d="m21 21-4.34-4.34" />
							<circle cx="11" cy="11" r="8" />
						</svg>
					</Button>
					{isAuthenticated ? (
						<Button onClick={handleLogout} variant="ghost">
							Logout
						</Button>
					) : (
						<a href="/login">
							<Button>Login</Button>
						</a>
					)}
					<Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
						<TransactionForm />
					</Dialog>
				</div>
			</div>
		</header>
	);
}
