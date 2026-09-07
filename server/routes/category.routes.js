import express from "express";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authorizeRoles("ADMIN"), createCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put("/:id", authorizeRoles("ADMIN"), updateCategory);

router.delete("/:id", authorizeRoles("ADMIN"), deleteCategory);

export default router;
