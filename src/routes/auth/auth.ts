/** @format */

import { Signin } from "../../controllers/auth/signin";

import { Signup, verifyUser } from "../../controllers/auth/signup";

import { Router } from "express";

export const router = Router();

router.post("/signup", Signup);

router.put("/verify", verifyUser);

router.post("/signin", Signin);
