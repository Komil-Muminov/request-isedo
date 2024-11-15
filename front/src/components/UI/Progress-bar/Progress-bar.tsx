import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface ProgressBarProps {
	completed: string | number;
	total: number;
	size?: number;
	item?: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	completed,
	total,
	size = 60,
	item,
}) => {
	// Преобразуем completed в число, чтобы избежать ошибок
	const completedValue = isNaN(Number(completed)) ? 0 : Number(completed);

	// Безопасное вычисление процента
	const percentage = total > 0 ? (completedValue / total) * 100 : 0;

	// Определяем цвет круга на основе процента
	const circleColor =
		percentage === 100 ? "#4caf50" : percentage >= 50 ? "#ff9800" : "#f44336";

	return (
		<Box
			position="relative"
			display="inline-flex"
			alignItems="center"
			justifyContent="center"
		>
			<CircularProgress
				sx={{
					color: `${circleColor} !important`,
				}}
				variant="determinate"
				value={percentage}
				size={size}
			/>
			<Box
				sx={{
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="caption"
					sx={{
						color: item?.state && "#fff !important",
					}}
					fontSize={item ? "12px" : "15px"}
				>
					{`${Math.round(percentage)}%`}
				</Typography>
			</Box>
		</Box>
	);
};

export default ProgressBar;
