import React from "react";
import { TextField } from "@mui/material";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: any;
  type: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  errors,
  type,
}) => {
  return (
    <TextField
      label={label}
      {...register(name)}
      fullWidth
      variant="outlined"
      type={type}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      inputProps={{
        min: type === "number" ? 0 : undefined,
        step: type === "number" ? 1 : undefined,
      }}
    />
  );
};

export default InputField;
