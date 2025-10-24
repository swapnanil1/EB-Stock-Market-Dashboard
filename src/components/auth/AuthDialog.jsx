import { useAuth } from "@/hooks/useAuth"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Terminal } from "lucide-react"

export function AuthDialog({ onLoginSuccess, open, onOpenChange }) {
	// Using a custom hook to get all the logic and state
	const {
		isSignUp,
		setIsSignUp,
		email,
		setEmail,
		password,
		setPassword,
		isLoading,
		message,
		setMessage,
		handleSubmit,
	} = useAuth({ onLoginSuccess })

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button>Log In</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						{isSignUp ? "Create an Account" : "Welcome Back"}
					</DialogTitle>
					<DialogDescription>
						{isSignUp
							? "Enter your Gmail to sign up."
							: "Enter your credentials to access your account."}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="name@gmail.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isLoading}
							/>
						</div>
						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="********"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
							/>
						</div>
						{message.text && (
							<Alert variant={message.type === "error" ? "destructive" : "default"}>
								<Terminal className="h-4 w-4" />
								<AlertTitle>{message.type === "error" ? "Error" : "Success"}</AlertTitle>
								<AlertDescription>{message.text}</AlertDescription>
							</Alert>
						)}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							{isSignUp ? "Sign Up" : "Log In"}
						</Button>
					</div>
				</form>

				<DialogFooter className="text-sm text-muted-foreground">
					{isSignUp ? "Already have an account?" : "Don't have an account?"}
					<Button
						variant="link"
						onClick={() => {
							setIsSignUp(!isSignUp)
							setMessage({ type: "", text: "" })
						}}
						className="pl-1"
					>
						{isSignUp ? "Log In" : "Sign Up"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
