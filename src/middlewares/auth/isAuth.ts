/** @format */

// Import dependencies
import express from "express";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

require("dotenv").config();
// Define types
interface TokenPayload {
  userId: string;
  email: string;
}

import { Req } from "../../../custom";

// Define middleware function
export const authMiddleware: (
  req: Req,
  res: Response,
  next: NextFunction
) => Response | undefined = (req, res, next) => {
  try {
    // Get authorization header from request
    const authHeader = req.headers["authorization"];

    // Check if header exists and has the format 'Bearer <token>'
    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract the token from the header
      const token = authHeader.slice(7);

      // Verify the token with the secret key
      jwt.verify(token, process.env.jwt_secret as string, (err, decoded) => {
        // Check if verification succeeded and decoded payload is valid
        if (err || !decoded || typeof decoded !== "object") {
          // Send unauthorized error
          return res.status(401).json({ message: "Invalid token" });
        }
        // Cast decoded payload to TokenPayload type
        const payload = decoded as TokenPayload;

        // Set the payload on the request object
        req.auth = payload;

        // Call the next middleware function
        next();
      });
    } else {
      // Send unauthorized error
      return res.status(401).json({ message: "Missing token" });
    }
  } catch (err) {
    console.log(err);
  }
};
