import express from "express";

import {
  register,
  login,
  memberLogin,
  logout,
  getMe,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Owner registration
router.post("/register", register);

// Owner login
router.post("/login", login);

// Organization Member login
router.post("/member-login", memberLogin);

// Logout
router.post("/logout", logout);

export default router;
