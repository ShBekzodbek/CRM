/** @format */

import { UserStatus } from "@prisma/client";
import { boolean, date, string } from "joi";

export interface User {
  fullName: string;
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  email: string;
  image: string | null;
  phoneNumber: string | null;
  password: string;
  adminId?: string | null;
  isAdmin: boolean;
  step: string|null;
  isBanned: boolean|undefined;
  position: string|null;
  status: UserStatus;
}
