"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
// Define middleware function
const authMiddleware = (req, res, next) => {
    try {
        // Get authorization header from request
        const authHeader = req.headers["authorization"];
        // Check if header exists and has the format 'Bearer <token>'
        if (authHeader && authHeader.startsWith("Bearer ")) {
            // Extract the token from the header
            const token = authHeader.slice(7);
            // Verify the token with the secret key
            jsonwebtoken_1.default.verify(token, process.env.jwt_secret, (err, decoded) => {
                // Check if verification succeeded and decoded payload is valid
                if (err || !decoded || typeof decoded !== "object") {
                    // Send unauthorized error
                    return res.status(401).json({ message: "Invalid token" });
                }
                // Cast decoded payload to TokenPayload type
                const payload = decoded;
                // Set the payload on the request object
                req.auth = payload;
                // Call the next middleware function
                next();
            });
        }
        else {
            // Send unauthorized error
            return res.status(401).json({ message: "Missing token" });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.authMiddleware = authMiddleware;
