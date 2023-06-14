/** @format */

import { PrismaClient } from "@prisma/client";

import { ExtraInfo } from "./../../interfaces/User/extraInfo";

import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/express";

const prisma = new PrismaClient();
export const GetExtraInfo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const extra: ExtraInfo = req.body;
    extra.userId = req.auth?.userId as string;
    if (
      !extra.hear ||
      !extra.membersC ||
      !extra.membersT ||
      !extra.position ||
      !extra.usage
    ) {
      return res.status(400).send({
        message: "Something is missing for Extra info",
        body: req.body,
        required: {
          hear: req.body.hear || null,
          membersC: req.body.membersC || null,
          membersT: req.body.membersT || null,
          role: req.body.position || null,
          usage: req.body.usage || null,
        },
      });
    }

    const exInfo: any = await prisma.exInfo.create({
      data: {
        userId: extra.userId,
        hear: extra.hear,
        membersC: extra.membersC,
        membersT: extra.membersT,
        position: extra.position,
        usage: extra.usage,
      },
    });
    return res.status(200).send({ message: "Got it!" });
  } catch (err) {
    console.error(err);
    return;
  }
};
