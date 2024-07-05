import React from "react";
import "./Loader.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export const Loader = () => (
	<div className="loader">
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={true}
		>
			<CircularProgress color="inherit" />
			<Typography
				variant="h6"
				component="div"
				sx={{
					position: "absolute",
					bottom: "40%",
					left: "51%",
					transform: "translate(-50%, -50%)",
					color: "#fff",
				}}
			>
				Подождите...
			</Typography>
		</Backdrop>
	</div>
);
