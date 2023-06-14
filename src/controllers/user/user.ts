/** @format */

import { Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

import { AuthenticatedRequest } from "../../types/express";

import { exclude } from "../../utils/prisma/exclude_user_property";

const prisma = new PrismaClient();

export const UpdateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, phoneNumber, password, position, gender } = req.body;
    if (req.auth?.position == "employee") {
      const updatedEmployee = await prisma.employee.update({
        data: {
          fullName,
          phoneNumber,
          password,
          position,
          gender,
        },
        where: { id: req.auth?.userId },
      });
      return res.status(200).send(updatedEmployee);
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: req.auth?.userId },
        data: {
          fullName,
          phoneNumber,
          password,
          position,
          gender,
        },
      });
      return res.status(200).send(updatedUser);
    }
  } catch (err) {
    return next(err);
  }
};

export const GetUserByIdOrAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.userId && !req.auth?.userId) {
      return res
        .status(400)
        .send({ message: `To show User id or Auth  are required` });
    }
    const userId = req.params.userId || req.auth?.userId;

    const user =
      (await prisma.user.findUnique({
        where: { id: userId },
      })) ||
      (await prisma.employee.findUnique({
        where: { id: userId },
      }));
    if (!user) {
      return res.status(404).send({ message: `User not found` });
    }
    return res
      .status(200)
      .send(
        exclude(user, [
          "password",
          "token",
          "id",
          "createdAt",
          "updatedAt",
        ] as never)
      );
  } catch (err) {
    console.log(err);
    return;
  }
};

export const UploadImage = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file;
    if (!image) {
      return res.status(400).send({ message: "Image is required" });
    }
    if (req.auth?.position == "employee") {
      const user = await prisma.employee.update({
        data: {
          image: image.path,
        },
        where: { id: req.auth?.userId },
      });
      if (!user) {
        return res.status(404).send({ message: "User image not updated" });
      }
    } else {
      const user = await prisma.user.update({
        data: {
          image: image.path,
        },
        where: { id: req.auth?.userId },
      });
      if (!user) {
        return res.status(404).send({ message: "User image not updated" });
      }
    }
    return res.status(200).send("Profile image has been updated!");
  } catch (err) {
    return next(err);
  }
};

export const DeleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    req.auth?.position == "employee"
      ? await prisma.employee.delete({ where: { id: req.auth?.userId } })
      : await prisma.user.delete({ where: { id: req.auth?.userId } });
  } catch (err) {
    return next(err);
  }
};

export const JoinTo = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};
