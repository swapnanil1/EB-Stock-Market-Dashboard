export const getAuthHeaders = () => {
	const token = localStorage.getItem("token")
	if (!token) {
		throw new Error("No authentication token found.")
	}
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export const fetchWithAuth = async (url, options = {}) => {
	const headers = getAuthHeaders()
	const response = await fetch(url, { ...options, headers })

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || `API request failed with status ${response.status}`)
	}

	return response.json()
}
