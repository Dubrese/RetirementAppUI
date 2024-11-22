import React, { useEffect } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Grid, Typography, Slider } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import OneTimeFormGroup from "./OneTimeFormGroup"; // Import the new FormGroup component
import GridComponent from "./premitive/GridComponent";
import InputField from "./premitive/InputField";
import { inputFormSchema } from "../types/formFields";

type InputForm = z.infer<typeof inputFormSchema>;

function UserInputForm() {
  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch("/api/form-config");
      const config = await response.json();

      setValue("currentAge", config.currentAge);
      setValue("retirementAge", config.retirementAge);
      setValue("annualExpense", config.annualExpense);
      setValue("savingCapacity", config.savingCapacity);
      setValue("existingCorpus", config.existingCorpus);

      if (config.formGroups && Array.isArray(config.formGroups)) {
        config.formGroups.forEach((group, index) => {
          append(group);
        });
      }
    };

    fetchConfig();
  }, [setValue, append]);

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3}>
        <GridComponent xs={12} sm={6}>
          <Typography gutterBottom>Current Age</Typography>
          <Slider
            value={parseInt("18", 10)}
            onChange={(_, newValue) =>
              setValue("currentAge", newValue as number)
            }
            aria-labelledby="current-age-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            min={18}
            max={100}
          />
          <InputField
            label="Current Age"
            name="currentAge"
            register={register}
            errors={errors}
            type="text"
          />
        </GridComponent>

        <GridComponent xs={12} sm={6}>
          <Typography gutterBottom>Retirement Age</Typography>
          <Slider
            value={parseInt("50", 10)}
            onChange={(_, newValue) =>
              setValue("retirementAge", newValue as number)
            }
            aria-labelledby="retirement-age-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            min={50}
            max={100}
          />
          <InputField
            label="Retirement Age"
            name="retirementAge"
            register={register}
            errors={errors}
            type="text"
          />
        </GridComponent>

        <GridComponent xs={12}>
          <Typography variant="h6">One Time Expense</Typography>
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
            onClick={() => append({ age: "18", amount: "0" })}
            fullWidth
            startIcon={<AddIcon />}
          >
            Add Form Group
          </Button>
        </GridComponent>

        <GridComponent xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "12px" }}
          >
            Submit
          </Button>
        </GridComponent>
      </Grid>
    </form>
  );
}

export default UserInputForm;
