import { z } from "zod";

export const createMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  loginId: z
    .string()
    .trim()
    .min(3, "Login ID must be at least 3 characters")
    .max(50, "Login ID cannot exceed 50 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),

  role: z.enum(["ADMIN", "MANAGER", "USER"]),
});

export const updateMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .optional(),

  role: z.enum(["ADMIN", "MANAGER", "USER"]).optional(),
});
