import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRecommendations } from "@/hooks/useRecommendations"
import { Loader2, Search } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const REC_COLORS = ["#16a34a", "#22c55e", "#84cc16", "#f97316", "#ef4444"]

export function RecommendationsChart() {
	const [searchTerm, setSearchTerm] = useState("AAPL")

	const { data, symbol, isLoading, error, searchSymbol } = useRecommendations("AAPL")

	const handleSearch = (e) => {
		e.preventDefault()
		if (searchTerm) {
			searchSymbol(searchTerm)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Analyst Recommendations for {symbol}</CardTitle>
				<form onSubmit={handleSearch} className="flex gap-2 pt-2 max-w-xs">
					<Input
						placeholder="Enter Symbol (e.g., TSLA)"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button type="submit" size="icon" disabled={isLoading}>
						{isLoading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Search className="h-4 w-4" />
						)}
					</Button>
				</form>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					{isLoading ? (
						<div className="flex items-center justify-center h-full">
							<Loader2 className="h-8 w-8 animate-spin" />
						</div>
					) : error ? (
						<div className="flex items-center justify-center h-full text-destructive text-center">
							{error}
						</div>
					) : data ? (
						<BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
							<XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
							<YAxis
								type="category"
								dataKey="name"
								width={80}
								stroke="hsl(var(--muted-foreground))"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip
								cursor={{ fill: "hsl(var(--muted))" }}
								contentStyle={{
									backgroundColor: "hsl(var(--background))",
									borderColor: "hsl(var(--border))",
								}}
							/>

							<Bar dataKey="value" name="Analysts" radius={[0, 4, 4, 0]}>
								{data.map((_entry, index) => (
									<Cell key={`cell-${_entry.name}`} fill={REC_COLORS[index % REC_COLORS.length]} />
								))}
							</Bar>
						</BarChart>
					) : (
						<div className="flex items-center justify-center h-full text-muted-foreground">
							No recommendation data available.
						</div>
					)}
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
