/** @format */

// Import dependencies
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../../types/express";

require("dotenv").config();
// Define types
export interface TokenPayload {
  userId: string;
  position: string;
}

// Define middleware function
export const authMiddleware: (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Response | void = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      jwt.verify(token, process.env.jwt_secret as string, (err, decoded) => {
        if (err || !decoded || typeof decoded !== "object") {
          return res.status(401).json({ message: "Invalid token" });
        }
        const payload = decoded as TokenPayload;
        req.auth = payload;
        next();
      });
    } else {
      return res.status(401).json({ message: "Missing token" });
    }
  } catch (err) {
    return next(err);
  }
};
