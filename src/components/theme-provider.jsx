import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
	theme: "dark",
	setTheme: () => null,
})

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => {
		if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
			return localStorage.getItem("theme")
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
	})

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove("light", "dark")
		root.classList.add(theme)
		localStorage.setItem("theme", theme)
	}, [theme])

	const value = {
		theme,
		setTheme,
	}

	return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext)
	if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
	return context
}
