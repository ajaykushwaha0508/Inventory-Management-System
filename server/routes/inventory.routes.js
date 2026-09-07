import express from "express";

import {
  increaseStock,
  decreaseStock,
  getStockHistory,
} from "../controllers/inventory.controller.js";

import { authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch("/:id/stock/increase", authorizeRoles("ADMIN"), increaseStock);

router.patch("/:id/stock/decrease", authorizeRoles("ADMIN"), decreaseStock);

router.get("/:id/stock/history", getStockHistory);

export default router;
