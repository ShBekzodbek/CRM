/** @format */

import bcrypt from "bcrypt";

import { Request, Response, NextFunction } from "express";

import { validateUserInput } from "../../utils/validators/Joi/signup";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const password: string = req.body.password;
    const fullName: string = req.body.fullName;
    const email: string = req.body.email;

    if (!fullName || !email || !password) {
      return res.status(400).send({ message: "Some input is missing" });
    }
    validateUserInput(req.body, res);
    const isOldUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isOldUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await prisma.user.create({
      data: {
        email: email,
        fullName: fullName,
        password: hash,
      },
    });
    return res.status(200).send({ message: "You have signed up", user: user });
  } catch (err) {
    console.log(err);
    return;
  }
};
