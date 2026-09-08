import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "this-is-my-secret";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env.local");
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("error in jwt verify", error);
    return null;
  }
}
