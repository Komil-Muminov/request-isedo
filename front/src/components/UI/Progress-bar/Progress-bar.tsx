import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; // Import Typography for better text handling

import "../WorkSpace/WorkSpace.css";

interface ProgressBarProps {
  completed: string;
  total: number;
  size?: number;
  item: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
  size,
  item,
}) => {
  console.log(`completed: ${completed}, total: ${total}`);

  const completedChange = completed === "0" ? 0 : 1;

  const percentage = total ? (completedChange / total) * 100 : 0;

  console.log(percentage);

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
        value={percentage === 0 ? 33 : 100}
        size={size ? size : 60}
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
          color={item?.state ? "active" : "#000"}
          fontSize={"15px"}
        >
          {`${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
