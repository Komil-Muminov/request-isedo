import { BarchartData } from "../ChartsData";
import React from "react";
import { Paper, Typography } from "@mui/material";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export const Barchart: React.FC = () => {
	return (
		<Paper style={{ padding: 16 }}>
			<Typography variant="h6" gutterBottom>
				График
			</Typography>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart
					data={BarchartData}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="ExistingCustomers" stackId="a" fill="#8884d8" />
					<Bar dataKey="NewCustomers" stackId="a" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default Barchart;
