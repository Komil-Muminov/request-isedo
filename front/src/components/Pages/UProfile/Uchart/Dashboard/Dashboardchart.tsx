import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { DashboardchartData } from "../ChartsData";
// import UchartInfo from "../UchartInfo/UchartInfo";
import "./Dashboard.css";
const Dashboardchart: React.FC = () => {
	return (
		<>
			<PieChart
				width={1000}
				height={400}
				className="dashboard__content charts__bg"
			>
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
			{/* <UchartInfo desc="km" children={"yes22"} /> */}
		</>
	);
};

export default Dashboardchart;
