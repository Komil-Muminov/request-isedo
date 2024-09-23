import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

interface SalesData {
	month: string;
	sales: number;
	color: string;
}

const salesData: SalesData[] = [
	{ month: "Январь", sales: 200, color: "#FFBB28" },
	{ month: "Февраль", sales: 3500, color: "#FF8042" },
	{ month: "Март", sales: 2800, color: "#0088FE" },
	{ month: "Апрель", sales: 700, color: "#00C49F" },
	{ month: "Май", sales: 1600, color: "#FF8042" },
];

const SalesTargetChart: React.FC = () => {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart data={salesData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="basis"
					dataKey="sales"
					stroke={salesData[0]?.color || "#8884d8"}
					activeDot={{ r: 2 }}
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default SalesTargetChart;
