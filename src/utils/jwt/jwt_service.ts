/** @format */

import jwt from "jsonwebtoken";
require("dotenv").config();
/** @format */

export default function generateToken(
  userId: string,
  position: string
): string {
  return jwt.sign(
    { userId: userId, position: position },
    process.env.jwt_secret as string,
    {
      expiresIn: "500h",
    }
  );
}

// A helper function to verify and decode tokens
export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as any;
  } catch (error) {
    return null;
  }
};
