import React from "react";
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";

interface DataItem {
	name: string;
	value: number;
}

// Данные для графика
const data: DataItem[] = [
	{ name: "1", value: 40 },
	{ name: "2", value: 80 },
	{ name: "3", value: 60 },
	{ name: "4", value: 100 },
	{ name: "5", value: 70 },
	{ name: "6", value: 90 },
	{ name: "7", value: 30 },
];

// Функция для определения цвета столбца
const getBarColor = (value: number): string => {
	if (value < 50) return "#ee698e";
	if (value < 75) return "#ffd700";
	return "#84fab0";
};

const EqualizerChart: React.FC = () => {
	return (
		<BarChart width={95} height={105} data={data}>
			<CartesianGrid stroke="transparent" />

			<XAxis dataKey="name" hide />
			<YAxis hide />

			<Tooltip content={null} />

			<Bar dataKey="value" radius={[10, 10, 0, 0]} animationDuration={300}>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
				))}
			</Bar>
		</BarChart>
	);
};

export default EqualizerChart;
