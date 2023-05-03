/** @format */

// import { express } from "express";
/** @format */

declare global {
  namespace Express {
    interface User {
      id?: string;
      fullName: string;
      email: string;
      password: string;
      // add other properties as needed
    }
    interface Code {
      id?: string;
      code: string;
      userId: string;
    }

    interface Request {
      user: User;
      code: Code;
    }
  }
}

export {};
