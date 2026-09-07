import {
  registerSchema,
  loginSchema,
} from "../validatorsSchema/auth.validator.js";

import { registerUser, loginUser } from "../services/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const { name, email, password } = result.data;

    const user = await registerUser({
      name,
      email,
      password,
    });

    res.cookie("token", user.token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const { email, password } = result.data;

    const user = await loginUser({
      email,
      password,
    });

    res.cookie("token", user.token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: user.user,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
