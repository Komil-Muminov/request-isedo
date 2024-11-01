import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; // Import Typography for better text handling
import { Container } from "@mui/material";

interface ProgressBarProps {
	completed: number;
	total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
	const percentage = total ? (completed / total) * 100 : 0;

	return (
		<Box
			position="relative"
			display="inline-flex"
			alignItems="center"
			justifyContent="center"
		>
			<CircularProgress variant="determinate" value={percentage} />
			<Box
				sx={{
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "red",
				}}
			>
				<Typography variant="caption" color="text.white">
					<p style={{ color: "#fff" }}>{`${Math.round(percentage)}%`}</p>
				</Typography>
			</Box>
		</Box>
	);
};

export default ProgressBar;
