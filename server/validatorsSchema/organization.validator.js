import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name cannot exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(3, "Organization code must be at least 3 characters")
    .max(20, "Organization code cannot exceed 20 characters")
    .transform((value) => value.toUpperCase()),
});

export const updateOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name cannot exceed 100 characters")
    .optional(),
});
