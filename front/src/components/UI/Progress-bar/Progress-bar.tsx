import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; // Import Typography for better text handling

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
			<CircularProgress
				sx={{ color: "#4caf50" }}
				variant="determinate"
				value={percentage}
				size={60}
			/>
			<Box
				sx={{
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="caption" color="#fff" fontSize={"16px"}>
					{`${Math.round(percentage)}%`}
				</Typography>
			</Box>
		</Box>
	);
};

export default ProgressBar;
