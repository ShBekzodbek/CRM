/** @format */

import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

import { Request, Response, NextFunction } from "express";
import generateToken from "../../utils/jwt/jwt_service";

const prisma = new PrismaClient();

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const isValidEmail: boolean = emailRegex.test(email);
    console.log(isValidEmail);
    if (!email || !password || !isValidEmail) {
      return res
        .status(400)
        .send({ message: `Email and password are missing or invalid email!` });
    }
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(400).send({ message: "User not found!" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(200).send({ message: "Invalid password or email !" });
    }
    req.session.user = user;
    await prisma.blackTokenList.create({
      data: {
        token: user.token as string,
      },
    });
    const token = generateToken(user.id, user.position as string);
    user.token = token;
    await prisma.user.update({
      where: { id: user.id },
      data: { token: token },
    });
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return;
  }
};
