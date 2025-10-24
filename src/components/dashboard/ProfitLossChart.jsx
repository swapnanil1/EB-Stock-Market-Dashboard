import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ProfitLossChart({ data }) {
	// The component expects a `data` prop, which would be barChartData from our hook.

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profit / Loss by Holding</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					{data && data.length > 0 ? (
						<BarChart
							data={data}
							margin={{
								top: 5,
								right: 20,
								left: -10,
								bottom: 5,
							}}
						>
							<XAxis
								dataKey="name"
								stroke="hsl(var(--muted-foreground))"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke="hsl(var(--muted-foreground))"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `$${value}`}
							/>
							<Tooltip
								formatter={(value) => `$${Number(value).toFixed(2)}`}
								cursor={{ fill: "hsl(var(--muted))" }}
								contentStyle={{
									backgroundColor: "hsl(var(--background))",
									borderColor: "hsl(var(--border))",
								}}
							/>
							<Bar dataKey="Profit/Loss" radius={[4, 4, 0, 0]}>
								{data.map((entry) => (
									<Cell
										key={`cell-${entry.name}`}
										fill={
											entry["Profit/Loss"] >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"
										}
									/>
								))}
							</Bar>
						</BarChart>
					) : (
						<div className="flex items-center justify-center h-full text-muted-foreground">
							No profit or loss data.
						</div>
					)}
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
