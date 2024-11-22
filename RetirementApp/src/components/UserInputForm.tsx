import React, { useEffect } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Grid,
  Typography,
  Slider,
  Card,
  CardContent,
  TextField,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import OneTimeFormGroup from "./OneTimeFormGroup";
import { inputFormSchema } from "../types/formFields";

type InputForm = z.infer<typeof inputFormSchema>;

function UserInputForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: zodResolver(inputFormSchema),
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formGroups",
  });

  // Watch values for sync between Slider and InputField
  const watchCurrentAge = watch("currentAge");
  const watchRetirementAge = watch("retirementAge");

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch("/api/form-config");
      const config = await response.json();

      setValue("currentAge", config.currentAge || 18);
      setValue("retirementAge", config.retirementAge || 50);
      setValue("annualExpense", config.annualExpense || 0);
      setValue("savingCapacity", config.savingCapacity || 0);
      setValue("existingCorpus", config.existingCorpus || 0);

      if (config.formGroups && Array.isArray(config.formGroups)) {
        config.formGroups.forEach((group) => append(group));
      }
    };

    fetchConfig();
  }, [setValue, append]);

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        {/* Current Age */}
        <Card sx={{ width: "100%", marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h6">Basic Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Current Age</Typography>
                <Slider
                  value={watchCurrentAge || 18}
                  onChange={(_, value) => setValue("currentAge", value as number)}
                  aria-labelledby="current-age-slider"
                  valueLabelDisplay="auto"
                  min={18}
                  max={65}
                  sx={{
                    color: "#4f46e5"
                  }}
                />
                <TextField
                  label="Current Age"
                  type="number"
                  {...register("currentAge", {
                    valueAsNumber: true,
                    min: 18,
                    max: 65,
                    required: "Current age is required",
                  })}
                  error={!!errors.currentAge}
                  helperText={errors.currentAge?.message}
                  fullWidth
                  value={watchCurrentAge || "18"}
                  onChange={(e) =>
                    setValue("currentAge", parseInt(e.target.value, 10) || 0)
                  }
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

              {/* Target Retirement Age */}
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Target Retirement Age</Typography>
                <Slider
                  value={watchRetirementAge || "50"}
                  onChange={(_, value) =>
                    setValue("retirementAge", value as number)
                  }
                  aria-labelledby="retirement-age-slider"
                  valueLabelDisplay="auto"
                  min={watchCurrentAge || 18}
                  max={65}
                  sx={{
                    color: "#4f46e5"
                  }}
                />
                <TextField
                  label="Retirement Age"
                  type="number"
                  {...register("retirementAge", {
                    valueAsNumber: true,
                    min: watchCurrentAge || 18,
                    max: 65,
                    required: "Retirement age is required",
                  })}
                  error={!!errors.retirementAge}
                  helperText={errors.retirementAge?.message}
                  fullWidth
                  value={watchRetirementAge || 50}
                  onChange={(e) =>
                    setValue("retirementAge", parseInt(e.target.value, 10) || 0)
                  }
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
            </Grid>
          </CardContent>
        </Card>

        {/* Other Sliders (Example for Inflation Rate) */}
        <Card sx={{ width: "100%", marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h6">Financial Assumptions</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Expected Inflation Rate (%)</Typography>
                <Slider
                  {...register("inflationRate", { valueAsNumber: true })}
                  onChange={(_, value) =>
                    setValue("inflationRate", value as number)
                  }
                  aria-labelledby="inflation-rate-slider"
                  valueLabelDisplay="auto"
                  min={1}
                  max={50}
                  sx={{
                    color: "#4f46e5"
                  }}
                />
                <TextField
                  label="Inflation Rate"
                  type="number"
                  {...register("inflationRate", {
                    valueAsNumber: true,
                    min: 1,
                    max: 50,
                    required: "Inflation rate is required",
                  })}
                  error={!!errors.inflationRate}
                  helperText={errors.inflationRate?.message}
                  fullWidth
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
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Expected Annual Step Up Rate (%)</Typography>
                <Slider
                  {...register("annualStepUpRate", { valueAsNumber: true })}
                  onChange={(_, value) =>
                    setValue("annualStepUpRate", value as number)
                  }
                  aria-labelledby="annual-stepup-rate-slider"
                  valueLabelDisplay="auto"
                  min={1}
                  max={50}
                  sx={{
                    color: "#4f46e5"
                  }}
                />
                <TextField
                  label="Annual Step-Up Rate"
                  type="number"
                  {...register("annualStepUpRate", {
                    valueAsNumber: true,
                    min: 1,
                    max: 50,
                    required: "Annual step-up rate is required",
                  })}
                  error={!!errors.annualStepUpRate}
                  helperText={errors.annualStepUpRate?.message}
                  fullWidth
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Expected Pre-Retirement Return Rate (%)</Typography>
                <Slider
                  {...register("preRetirementReturnRate", { valueAsNumber: true })}
                  onChange={(_, value) =>
                    setValue("preRetirementReturnRate", value as number)
                  }
                  aria-labelledby="pre-retirement-return-rate-slider"
                  valueLabelDisplay="auto"
                  min={1}
                  max={50}
                  sx={{
                    color: "#4f46e5"
                  }}
                />
                <TextField
                  label="Pre-Retirement Return Rate"
                  type="number"
                  {...register("preRetirementReturnRate", {
                    valueAsNumber: true,
                    min: 1,
                    max: 50,
                    required: "Pre-Retirement return rate is required",
                  })}
                  error={!!errors.preRetirementReturnRate}
                  helperText={errors.preRetirementReturnRate?.message}
                  fullWidth
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
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Expected Post-Retirement Return Rate (%)</Typography>
                <Slider
                  {...register("postRetirementReturnRate", { valueAsNumber: true })}
                  onChange={(_, value) =>
                    setValue("postRetirementReturnRate", value as number)
                  }
                  aria-labelledby="post-retirement-return-rate-slider"
                  valueLabelDisplay="auto"
                  min={1}
                  max={30}
                  sx={{
                    color: "#4f46e5"
                  }}
                />
                <TextField
                  label="Post-Retirement Return Rate"
                  type="number"
                  {...register("postRetirementReturnRate", {
                    valueAsNumber: true,
                    min: 1,
                    max: 30,
                    required: "Post-Retirement return rate is required",
                  })}
                  error={!!errors.postRetirementReturnRate}
                  helperText={errors.postRetirementReturnRate?.message}
                  fullWidth
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
            </Grid>
          </CardContent>
        </Card>

        {/* One-Time Expenses */}
        <Card sx={{ width: "100%", marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h6">One-Time Expenses</Typography>
            {fields.map((field, index) => (
              <OneTimeFormGroup
                key={field.id}
                index={index}
                register={register}
                errors={errors}
                remove={remove}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => append({ age: watchRetirementAge, amount: "0" })}
              fullWidth
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "#4f46e5", marginTop: "16px" }}
            >
              Add Expense
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px",
              backgroundColor: "#4f46e5",
              marginBottom: "16px",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UserInputForm;
