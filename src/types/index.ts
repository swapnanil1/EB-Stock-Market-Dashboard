/*  
	Types for API Responses
	Raw holding data from the API.
*/
export interface ApiHolding {
	symbol: string;
	quantity: number;
	averagePrice: number;
	currentPrice: number;
}

/*  
	The entire /api/portfolio response.
*/
export interface ApiPortfolioResponse {
	cashBalance: number;
	holdings: ApiHolding[];
}

/*
	Types for Frontend Display
	A holding with calculated values for display.
*/
export interface DisplayHolding {
	symbol: string;
	quantity: number;
	averagePrice: number;
	currentPrice: number;

	// frontend controlled fields
	marketValue: number;
	totalCost: number;
	totalProfitLoss: number;
}

// calculated portfolio summary.
export interface PortfolioSummary {
	totalValue: number;
	totalCost: number;
	totalProfitLoss: number;
}

// structure for the portfolio page.
export interface PortfolioDisplayData {
	summary: PortfolioSummary;
	holdings: DisplayHolding[];
}
