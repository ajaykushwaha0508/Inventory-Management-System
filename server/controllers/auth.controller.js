import {
  registerSchema,
  loginSchema,
  memberLoginSchema,
} from "../validatorsSchema/auth.validator.js";

import {
  registerUser,
  loginOwner,
  loginMember,
  getMeService,
} from "../services/auth.service.js";

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

    const { name, email, password, organizationName, organizationCode } =
      result.data;

    const resultData = await registerUser({
      name,
      email,
      password,
      organizationName,
      organizationCode,
    });

    res.cookie("token", resultData.token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "Owner registered successfully",
      data: {
        user: resultData.user,
        organization: resultData.organization,
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

    const resultData = await loginOwner({
      email,
      password,
    });

    res.cookie("token", resultData.token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Owner login successful",
      data: {
        user: resultData.user,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const memberLogin = async (req, res) => {
  try {
    const result = memberLoginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const { organizationCode, loginId, password } = result.data;

    const resultData = await loginMember({
      organizationCode,
      loginId,
      password,
    });

    res.cookie("token", resultData.token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Member login successful",
      data: {
        member: resultData.member,
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

export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
