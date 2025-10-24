import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function PortfolioAllocationChart({ data }) {
	// The component expects a `data` prop, which will be the pieChartData from our hook.

	return (
		<Card>
			<CardHeader>
				<CardTitle>Holdings Allocation</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					{data && data.length > 0 ? (
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
								outerRadius={100}
								dataKey="value"
								nameKey="name"
							>
								{data.map((_entry, index) => (
									<Cell
										key={`cell-${_entry.name}`} // 2. Use a stable key (e.g., 'AAPL')
										fill={PIE_COLORS[index % PIE_COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
						</PieChart>
					) : (
						<div className="flex items-center justify-center h-full text-muted-foreground">
							No holdings to display.
						</div>
					)}
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
