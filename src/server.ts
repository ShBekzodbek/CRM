/** @format */

/** @format */

import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

import  logger from "morgan";

const app = express();

import { Req } from "../custom";

import * as auth from "./routes/auth/auth";

app.use(express.json());
app.use(logger("dev"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Hello World!");
});

app.use("/auth", auth.router as RequestHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
