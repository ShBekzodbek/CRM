/** @format */

import { Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

import { AuthenticatedRequest } from "../../types/express";

const prisma = new PrismaClient();

export const UpdateUser = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const GetUserById = async (
  //TODO No auth
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const UploadImage = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const DeleteUser = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const JoinTo = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};
