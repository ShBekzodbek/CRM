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
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.slice(7);
            jsonwebtoken_1.default.verify(token, process.env.jwt_secret, (err, decoded) => {
                if (err || !decoded || typeof decoded !== "object") {
                    return res.status(401).json({ message: "Invalid token" });
                }
                const payload = decoded;
                console.log("Passed");
                req.auth = payload;
                next();
            });
        }
        else {
            return res.status(401).json({ message: "Missing token" });
        }
    }
    catch (err) {
        console.log(err);
        return;
    }
};
exports.authMiddleware = authMiddleware;
