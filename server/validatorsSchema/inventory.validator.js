import { z } from "zod";

export const stockSchema = z.object({
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1"),

  note: z
    .string()
    .trim()
    .max(500, "Note cannot exceed 500 characters")
    .optional()
    .default(""),
});
