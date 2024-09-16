import { UchartData } from "./ChartsData";
import React from "react";
import { Paper, Typography } from "@mui/material";
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

export const Uchart: React.FC = () => {
	return (
		<Paper style={{ padding: 16 }}>
			<Typography variant="h6" gutterBottom>
				График
			</Typography>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={UchartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="uv" stroke="#8884d8" />
					<Line type="monotone" dataKey="pv" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default Uchart;
