/** @format */

import express from "express";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

export const Signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).send({ message: "You have signed in" });
  } catch (err) {
    console.log(err);
    return;
  }
};
