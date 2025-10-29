import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

// define the types of the context data
interface AuthContextType {
	token: string | null;
	isAuthenticated: boolean;
	login: (newToken: string) => void;
	logout: () => void;
}

// creates the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// define the AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);

	// on initial load, check localStorage for an existing token
	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	const login = (newToken: string) => {
		setToken(newToken);
		localStorage.setItem("authToken", newToken); // persist token
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem("authToken"); // remove token
	};

	const value = {
		token,
		isAuthenticated: !!token, // `!!` converts a string to a boolean
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// create a custom hook for easy access to the context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must  an AuthProvider");
	}
	return context;
};
