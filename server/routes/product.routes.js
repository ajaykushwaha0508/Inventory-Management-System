import express from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authorizeRoles("ADMIN"), createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", authorizeRoles("ADMIN"), updateProduct);

router.delete("/:id", authorizeRoles("ADMIN"), deleteProduct);

export default router;
