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
  const completedValue = Number(completed);

  // Безопасное вычисление процента
  const percentage = total > 0 ? (completedValue / total) * 100 : 0;

  // Определяем цвет круга на основе процента
  const circleColor = React.useMemo(() => {
    if (percentage === 100) return "#4caf50"; // Зеленый при 100%
    return percentage >= 50 ? "#ff9800" : "#f44336"; // Оранжевый при 50-99%, Красный при < 50%
  }, [percentage]);

  // Лог для отладки
  console.log(`Completed: ${completedValue}, Total: ${total}`);
  console.log(`Percentage: ${percentage}`);

  return (
    <Box
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        sx={{ color: circleColor }} // Цвет круга меняется в зависимости от процента
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
          color={`${item?.state ? "#fff" : circleColor} #fff`}
          fontSize={item ? "12px" : "15px"}
        >
          {`${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
