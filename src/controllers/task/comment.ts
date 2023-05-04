/** @format */

import { Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

import { AuthenticatedRequest } from "../../types/express";

const prisma = new PrismaClient();

export const CreateComment = async (//TODO 
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const DeleteComment = async (//TODO 
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};

export const UpdateComment = async (//TODO 
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {};
