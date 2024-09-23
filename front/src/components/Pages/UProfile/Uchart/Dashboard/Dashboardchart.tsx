import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { DashboardchartData } from "../ChartsData";
const Dashboardchart: React.FC = () => {
	return (
		<PieChart width={400} height={400}>
			<Pie
				data={DashboardchartData}
				dataKey="value"
				nameKey="name"
				outerRadius={150}
				fill="#8884d8"
				label
			>
				{DashboardchartData.map((entry) => (
					<Cell key={entry.name} fill={entry.color} />
				))}
			</Pie>
			<Tooltip />
			<Legend />
		</PieChart>
	);
};

export default Dashboardchart;
