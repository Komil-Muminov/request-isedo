import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./DashboardMinify.css";

const data = [
	{ name: "TEST 1", value: 35 },
	{ name: "TEST 2", value: 23 },
	{ name: "TEST 3", value: 32 },
];

const COLORS = ["#69d2e7", "#f38630", "#f9d423"];

const DashboardMinify = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	// Функция для расчёта суммы и округления
	const totalValue = data.reduce((acc, item) => acc + item.value, 0);
	const roundedTotal = Math.round(totalValue);

	let centerText;
	if (roundedTotal < 50) {
		centerText = "Мало проектов";
	} else if (roundedTotal < 100) {
		centerText = "Среднее количество";
	} else {
		centerText = "Много проектов";
	}

	// Функция для расчета процента
	const getPercentage = (value: number) =>
		((value / totalValue) * 100).toFixed(1);

	return (
		<div style={{ position: "relative", width: "100%", height: "250px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={50}
						outerRadius={80}
						paddingAngle={10}
						dataKey="value"
						label={({ value }) => `${getPercentage(value)}%`}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
								innerRadius={index === activeIndex ? 45 : 50}
								outerRadius={index === activeIndex ? 85 : 80}
							/>
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							backgroundColor: "#fff",
							borderRadius: "10px",
							border: "none",
							color: "#fff",
							fontSize: "14px",
						}}
						formatter={(value: any, name: any) => [`${value}%`, name]}
					/>
				</PieChart>
			</ResponsiveContainer>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					fontSize: "12px",
					color: "#fff",
					textAlign: "center",
					lineHeight: "1.2",
				}}
			>
				<div style={{ fontSize: "18px", fontWeight: "bold" }}>
					{roundedTotal}
				</div>
				<span className="dashboard__minify-center-text">{centerText}</span>
			</div>

			{/* Описание секций под диаграммой */}
			<div className="dashboardMinify-desc">
				{data.map((entry, index) => (
					<div key={index} style={{ display: "flex", alignItems: "center" }}>
						<div
							style={{
								width: "16px",
								height: "16px",
								backgroundColor: COLORS[index % COLORS.length],
								marginRight: "8px",
							}}
						/>
						<span>
							{entry.name}: {entry.value} ({getPercentage(entry.value)}%)
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default DashboardMinify;
