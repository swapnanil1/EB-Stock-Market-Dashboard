import { Button } from "../ui/Button";
export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 items-center">
				{/* main title  */}
				<div className="mr-4 flex items-center">
					<span className="font-bold">StockPils</span>
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

				{/* search btn */}
				<div className="flex flex-1 items-center justify-end space-x-4">
					<Button variant="ghost" size="sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<title>Search</title>
							<path d="m21 21-4.34-4.34" />
							<circle cx="11" cy="11" r="8" />
						</svg>
					</Button>
				</div>
			</div>
		</header>
	);
}
