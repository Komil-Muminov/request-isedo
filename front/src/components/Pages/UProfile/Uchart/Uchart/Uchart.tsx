import { RadialBarChart, RadialBar, Legend, Tooltip, Cell } from "recharts";

const data = [
	{
		name: "KM",
		value: 46,
		color: "#28A745", // зеленый
	},
	{
		name: "KM",
		value: 56,
		color: "#007BFF", // синий
	},
	{
		name: "KM",
		value: 48,
		color: "#DC3545", // красный
	},
	{
		name: "KM",
		value: 63,
		color: "#FFC107", // оранжевый
	},
];

const Uchart = () => {
	return (
		<RadialBarChart
			width={400}
			height={400}
			innerRadius="10%"
			outerRadius="80%"
			data={data}
			startAngle={90}
			endAngle={-270}
		>
			<RadialBar
				minAngle={15}
				background
				clockWise
				dataKey="value"
				cornerRadius={10}
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={entry.color} />
				))}
			</RadialBar>
			<Tooltip />
			<Legend
				iconSize={10}
				layout="horizontal"
				verticalAlign="bottom"
				align="center"
				formatter={(value, entry) => (
					<span style={{ color: entry.color }}>{value}</span>
				)}
			/>
		</RadialBarChart>
	);
};

export default Uchart;
