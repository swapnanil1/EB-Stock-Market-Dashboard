import { useState } from "react"

// This hook takes a callback function to run on successful login
export const useAuth = ({ onLoginSuccess }) => {
	const [isSignUp, setIsSignUp] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState({ type: "", text: "" })

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setMessage({ type: "", text: "" })

		const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login"
		const apiUrl = `https://stockpils-api.onrender.com${endpoint}`

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data.message || "An unknown error occurred.")

			if (isSignUp) {
				setMessage({ type: "success", text: data.message })
				setIsSignUp(false)
				setPassword("")
			} else {
				localStorage.setItem("token", data.token)
				if (onLoginSuccess) {
					onLoginSuccess()
				}
			}
		} catch (error) {
			setMessage({ type: "error", text: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return {
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
	}
}
