import { z } from "zod";

// Owner Registration
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.string().trim().email("Please provide a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),

  organizationName: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name cannot exceed 100 characters"),
});

// Owner Login
export const loginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

// Organization Member Login
export const memberLoginSchema = z.object({
  organizationCode: z
    .string()
    .trim()
    .min(3, "Organization code must be at least 3 characters")
    .max(20, "Organization code cannot exceed 20 characters"),

  loginId: z
    .string()
    .trim()
    .min(3, "Login ID must be at least 3 characters")
    .max(50, "Login ID cannot exceed 50 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});
