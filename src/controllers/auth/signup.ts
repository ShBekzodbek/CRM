/** @format */

import { Validator } from "../../utils/validators/Joi/index";

import { Code } from "../../interfaces/User/code";

import { IUser, User } from "../../interfaces/User/user";

import { generateCode } from "../../utils/functions/code_generator";

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
    const { error, value } = Validator.Signup(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const isOldUser =
      (await prisma.user.findUnique({
        where: {
          email: value.email,
        },
      })) ||
      (await prisma.employee.findUnique({
        where: {
          email: value.email,
        },
      }));
    if (isOldUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const user: User = {
      email: value.email,
      fullName: value.fullName,
      password: value.password,
      gender: value.gender,
      position: value.position,
    };
    const code = generateCode();
    req.session.user = user;
    req.session.code = { code: code, userEmail: user.email };
    const text: string = `<h1>Hi ${value.fullName}</h1>
    <br/>
    <h3>Your confirmation code is ${code}`;
    sendEmail(value.email, "Confirmation code", "", text);
    return res.send("Email has been sent to " + value.email);
  } catch (err) {
    return next(err);
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
    const token: string = generateToken(id, user?.position as string);
    const token1: string = generateToken(id, user?.position as string);
    let authedUser;
    if (user?.position == "employee") {
      let newUser = await prisma.employee.create({
        data: {
          id: id,
          email: user?.email as string,
          fullName: user?.fullName as string,
          password: hash,
          position: "employee",
          gender: user?.gender as string,
          accessToken: token as string,
          refreshToken: token1,
        },
      });
      authedUser = newUser;
    } else {
      let newUser: IUser = await prisma.user.create({
        data: {
          id: id,
          email: user?.email as string,
          fullName: user?.fullName as string,
          password: hash,
          position: user?.position as string,
          gender: user?.gender as string,
          accessToken: token,
          refreshToken: token1,
        },
      });
      authedUser = newUser;
    }
    req.session.user = authedUser;
    return res.send({ message: "User has been created", token: token });
  } catch (err) {
    return next(err);
  }
};
