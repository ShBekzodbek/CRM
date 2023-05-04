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

export const DeleteATaskById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const GiveATask = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const UpdateATask = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const AddDepartament = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const AddEmployee = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};
