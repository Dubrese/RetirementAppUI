import { z } from "zod";

export const inputFormSchema = z.object({
  currentAge: z.string().regex(/^\d+$/, { message: "Age must be a number" }),
  retirementAge: z
    .string()
    .regex(/^\d+$/, { message: "Retirement age must be a number" }),
  annualExpense: z.string().nullable().optional(),
  savingCapacity: z.string().nullable().optional(),
  existingCorpus: z.string().nullable().optional(),
  formGroups: z
    .array(
      z.object({
        age: z.string().regex(/^\d+$/, { message: "Age must be a number" }),
        amount: z
          .string()
          .regex(/^\d+$/, { message: "Amount must be a number" }),
      })
    )
    .optional(),
});
