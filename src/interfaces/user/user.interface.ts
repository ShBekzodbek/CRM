/** @format */

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  email: string;
  image: string;
  phoneNumber: string;
  password: string;
  employeeId: string;
  adminId: string;
  isAdmin: boolean;
  step: string;
  isBanned: boolean;
  position: string;
}
