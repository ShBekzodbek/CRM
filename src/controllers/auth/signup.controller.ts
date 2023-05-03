/** @format */

import { Validator } from "./../../utils/validators/Joi/index";

import { Code } from "./../../interfaces/User/code.interface";

import { IUser, User } from "./../../interfaces/User/user.interface";

import { generateCode } from "./../../utils/functions/code_generator";

import bcrypt from "bcrypt";

import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

import { sendEmail } from "../../utils/functions/code_send_service";

import generateToken from "../../utils/jwt/jwt_service";

import { v4 as uuid } from "uuid";

declare module "express-session" {
  interface SessionData {
    user: User;
    code: Code;
  }
}

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
    Validator.Signup(req.body, res);
    const isOldUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isOldUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const user: User = {
      email: email,
      fullName: fullName,
      password: password,
    };

    const code = generateCode();
    req.session.user = user;
    req.session.code = { code: code, userEmail: user.email };
    const text: string = `<h1>Hi ${fullName}</h1>
    <br/>
    <h3>Your confirmation code is ${code}`;
    sendEmail(email, "Confirmation code", "", text);
    return res.send("Email has been sent to " + email);
  } catch (err) {
    console.log(err);
    return;
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nums } = req.query;
    const { user, code } = req.session;
    if (nums !== code?.code || user?.email !== code?.userEmail) {
      return res.status(400).send({ message: `Invalid code or Invalid User` });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(user?.password as string, salt);
    const id: string = uuid();
    const token: string = generateToken(id, user?.email as string);
    const newUser: IUser = await prisma.user.create({
      data: {
        id: id,
        email: user?.email as string,
        fullName: user?.fullName as string,
        password: hash,
        token: token,
      },
    });
    req.session.user = newUser;
    return res.send({ message: "User has been created", token: token });
  } catch (err) {
    console.log(err);
    return;
  }
};
