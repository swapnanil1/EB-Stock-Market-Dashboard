import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "https://stockpils-api.onrender.com";

export function LoginPage() {
	// add a state to toggle between modes
	const [mode, setMode] = useState<"login" | "signup">("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setIsLoading(true);

		// choose the API endpoint based on the current mode
		const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";

		try {
			const response = await fetch(`${API_BASE_URL}${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "An error occurred.");
			}

			// handle success differently for each mode
			if (mode === "login") {
				login(data.token);
				navigate("/"); // redirect to portfolio on login
			} else {
				setSuccess("Account created! Please log in.");
				setMode("login"); // switch to login mode on successful signup
				setIsLoading(false);
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unknown error occurred.",
			);
			setIsLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center h-[80vh]">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">
						{mode === "login" ? "Login" : "Create Account"}
					</CardTitle>
					<CardDescription>Enter your credentials to continue.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="email">Email</label>
							<Input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password">Password</label>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						{error && <p className="text-sm text-destructive">{error}</p>}
						{success && <p className="text-sm text-green-600">{success}</p>}

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading
								? "Processing..."
								: mode === "login"
									? "Login"
									: "Sign Up"}
						</Button>

						{/* toggles button to switch between modes */}
						<div className="mt-4 text-center text-sm">
							{mode === "login"
								? "Don't have an account?"
								: "Already have an account?"}{" "}
							<button
								type="button"
								onClick={() => setMode(mode === "login" ? "signup" : "login")}
								className="underline"
							>
								{mode === "login" ? "Sign Up" : "Login"}
							</button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
