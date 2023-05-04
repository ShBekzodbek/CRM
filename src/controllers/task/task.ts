/** @format */

import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

import { AuthenticatedRequest } from "../../types/express";

export const CreateTask = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const GetAllMyTasks = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const GetOneTaskById = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const UpdateMyTaskById = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const GetStatistics = async (
  //TODO
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};
