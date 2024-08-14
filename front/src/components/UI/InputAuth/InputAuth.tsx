import React from "react";

import { TProps } from "./InpAuthType";

import { TextField } from "@mui/material";

const InputAuth: React.FC<TProps> = ({
  register,
  inputName,
  inputPlaceholder,
  inputType,
  requiredMessage,
  minLengthMessage,
  kind,
  inputDefaultValue,
  inputDisabled,
}) => {
  return (
    <TextField
      {...register(inputName, {
        required: {
          value: true,
          message: requiredMessage,
        },
        minLength: {
          value: 2,
          message: minLengthMessage,
        },
      })}
      placeholder={inputPlaceholder}
      className={kind}
      name={inputName}
      type={inputType}
      defaultValue={inputDefaultValue}
      disabled={inputDisabled}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px", // Устанавливаем border-radius,
        },
      }}
    />
  );
};

export default InputAuth;
