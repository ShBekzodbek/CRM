/** @format */

// Import dependencies
import { NextFunction, Response } from "express";

import { AuthenticatedRequest } from "../../types/express";

require("dotenv").config();

import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";
import { TokenPayload } from "./isAuth";

const prisma = new PrismaClient();

// Define middleware function
export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      jwt.verify(
        token,
        process.env.jwt_secret as string,
        async (err, decoded) => {
          if (err || !decoded || typeof decoded !== "object") {
            return res.status(401).json({ message: "Invalid token" });
          }
          const payload = decoded as TokenPayload;
          const employee = await prisma.employee.findUnique({
            where: {
              id: payload.userId,
            },
          });
          if (employee?.position !== "admin") {
            return res.status(401).json({ message: "You are not admin" });
          }
          req.auth = payload;
          next();
        }
      );
    } else {
      return res.status(401).json({ message: "Missing token" });
    }
  } catch (err) {
    return next(err);
  }
};
