import React from "react";

import { TextField } from "@mui/material";

import { TProps } from "./InputIdentificationType";

const InputIdentification = ({ labelText, typeInput }: TProps) => {
	return (
		<TextField
			type={typeInput}
			fullWidth
			label={labelText}
			sx={{
				backgroundColor: "#FEFBFF",
				borderRadius: "50px",
				height: "50px",
				paddingBottom: "55px",
				border: "2px solid var(--form-inp)",
				"& .MuiOutlinedInput-root": {
					borderRadius: "50px",
					"& fieldset": {
						border: "none",
					},
				},
				"& .MuiInputLabel-root": {
					backgroundColor: "#FEFBFF",
					borderRadius: "50px",
					padding: "0 5px",
				},
			}}
		/>
	);
};

export default InputIdentification;
