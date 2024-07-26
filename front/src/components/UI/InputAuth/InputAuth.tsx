import React from "react";

import { TProps } from "./InpAuthType";

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
    <input
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
    />
  );
};

export default InputAuth;
