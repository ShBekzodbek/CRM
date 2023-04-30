/** @format */

import { Signin } from "../../controllers/auth/signin.controller";

import { Signup } from "../../controllers/auth/signup.controller";

import { Router } from "express";

export const router = Router();

router.post("/signup", Signup);

router.post("/signin", Signin);
