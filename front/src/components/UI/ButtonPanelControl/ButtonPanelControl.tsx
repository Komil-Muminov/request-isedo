import { Button, Typography } from "@mui/material";
import { TProps } from "./ButtonPanelControlType";

const ButtonPanelControl = ({ icon, text, goBack }: TProps) => {
  return (
    <Button
      onClick={() => goBack(-1)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "10px",
        borderRadius: "50px",
        color: "#607d8b",
      }}
    >
      {icon}
      <Typography
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "14px",
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default ButtonPanelControl;
