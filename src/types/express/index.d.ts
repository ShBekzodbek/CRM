/** @format */

import { Request } from "express";
import { AuthUser } from "../../interfaces/Auth/auth";

export type AuthenticatedRequest = {
  [prop: string]: any;
  auth?: AuthUser;
} & Request;
