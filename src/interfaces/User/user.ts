/** @format */

import { UserStatus } from "@prisma/client";

export interface User {
  fullName: string;
  email: string;
  password: string;
  position: string | null;
  gender: string | null;
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
  step: string | null;
  gender: string | null;
  isBanned: boolean | undefined;
  position: string | null;
  status: UserStatus;
}
