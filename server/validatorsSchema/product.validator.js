import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name cannot exceed 100 characters"),

  sku: z
    .string()
    .trim()
    .min(2, "SKU must be at least 2 characters")
    .max(50, "SKU cannot exceed 50 characters")
    .transform((value) => value.toUpperCase()),

  category: z.string().trim().min(1, "Category is required"),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional()
    .default(""),

  quantity: z.number().min(0, "Quantity cannot be negative"),

  unitPrice: z.number().min(0, "Unit price cannot be negative"),

  supplierName: z
    .string()
    .trim()
    .min(2, "Supplier name must be at least 2 characters")
    .max(100, "Supplier name cannot exceed 100 characters"),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name cannot exceed 100 characters")
    .optional(),

  sku: z
    .string()
    .trim()
    .min(2, "SKU must be at least 2 characters")
    .max(50, "SKU cannot exceed 50 characters")
    .transform((value) => value.toUpperCase())
    .optional(),

  category: z.string().trim().min(1, "Category is required").optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  quantity: z.number().min(0, "Quantity cannot be negative").optional(),

  unitPrice: z.number().min(0, "Unit price cannot be negative").optional(),

  supplierName: z
    .string()
    .trim()
    .min(2, "Supplier name must be at least 2 characters")
    .max(100, "Supplier name cannot exceed 100 characters")
    .optional(),
});

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
