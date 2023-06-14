/** @format */

import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

import { Request, Response, NextFunction } from "express";

import generateToken from "../../utils/jwt/jwt_service";

import { Validator } from "../../utils/validators/Joi";

const prisma = new PrismaClient();

export const Signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = Validator.Login(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user =
      (await prisma.user.findUnique({
        where: { email: value.email },
      })) ||
      (await prisma.employee.findUnique({
        where: { email: value.email },
      }));
    if (!user) {
      return res.status(400).send({ message: "User not found!" });
    }
    const validPassword = await bcrypt.compare(value.password, user.password);
    if (!validPassword) {
      return res.status(200).send({ message: "Invalid password or email !" });
    }
    req.session.user = user;
    await prisma.blackTokenList.create({
      data: {
        token: user.accessToken as string,
      },
    });
    const token = generateToken(user.id, user.position as string);
    user.accessToken = token;
    await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: token },
    });
    return res.status(200).send({ token });
  } catch (err) {
    return next(err);
  }
};
