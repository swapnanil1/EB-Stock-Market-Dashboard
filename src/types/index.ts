/*
 Signifies the essential data for a holding that is relevant to the user.
 This information is what our application would be storing, to our backend 
 */
export interface UserHolding {
	symbol: string;
	quantity: number;
	averagePrice: number;
}

/*
 Represents the raw quote data we anticipate getting from the Finnhub API
 for an individual stock symbol. The property names (c, d, dp) mirror the API.
 */
export interface FinnhubQuote {
	c: number; // Current price
	d: number; // Change
	dp: number; // Percent change
	pc: number; // Previous close price
}

/*
 A representation of a fully calculated and consolidated holding that is displayable.
 It combines the user's data (UserHolding) with live market data (FinnhubQuote)
 and includes calculated fields like the marketValue and totalProfitLoss.
 This is the main type we will be using in our UI components.
 */
export interface DisplayHolding {
	// Data from UserHolding
	symbol: string;
	quantity: number;
	averagePrice: number;

	// Data from FinnhubQuote
	currentPrice: number;
	dailyChange: number;
	dailyChangePercentage: number;

	// Will calculate to these for app logic
	totalCost: number;
	marketValue: number;
	totalProfitLoss: number;
	totalProfitLossPercentage: number;
}

/*
 Represents the summary of the entirety of the portfolio.
 This remains the same as before - it is just a collection of all DisplayHoldings.
 */
export interface PortfolioSummary {
	totalValue: number;
	totalCost: number;
	totalProfitLoss: number;
	dailyChange: number;
	dailyChangePercentage: number;
}

/*
 Represents the total portfolio data structure for our dashboard.
 It includes the summary as well as a List of all individual holdings that are ready to be displayed.
 */
export interface PortfolioData {
	summary: PortfolioSummary;
	holdings: DisplayHolding[];
}
