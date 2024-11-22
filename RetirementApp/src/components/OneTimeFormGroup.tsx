import React from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface OneTimeExpenseForm {
  index: number;
  register: UseFormRegister<FieldValues>;
  errors: any;
  remove: (index: number) => void;
}

const OneTimeFormGroup: React.FC<OneTimeExpenseForm> = ({
  index,
  register,
  errors,
  remove,
}) => {
  return (
    <Grid container spacing={2} key={index}>
      <Grid item xs={5}>
        <TextField
          label="Age"
          {...register(`formGroups.${index}.age` as const)}
          fullWidth
          variant="outlined"
          type="number"
          error={!!errors.formGroups?.[index]?.age}
          helperText={errors.formGroups?.[index]?.age?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4f46e5",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#4f46e5",
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          label="Amount"
          {...register(`formGroups.${index}.amount` as const)}
          fullWidth
          variant="outlined"
          type="number"
          error={!!errors.formGroups?.[index]?.amount}
          helperText={errors.formGroups?.[index]?.amount?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4f46e5",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#4f46e5",
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="error"
          onClick={() => remove(index)}
          aria-label="remove"
        >
          <RemoveIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default OneTimeFormGroup;
