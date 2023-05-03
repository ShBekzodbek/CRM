/** @format */

import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

import logger from "morgan";

import session from "express-session";

import { createClient } from "redis";

import RedisStore from "connect-redis";

let redisClient = createClient({});

import path from "path";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

redisClient.connect().catch((err: any) => console.log(err));

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "dapps",
});

declare module "express-session" {
  interface SessionData {
    user: User;
    code: Code;
  }
}

import * as dotenv from "dotenv";
dotenv.config({ path: "../" + __dirname + "/.env" });

const app = express();

import * as auth from "./routes/auth/auth";
import main from "./utils/functions/connect_db";
import { User } from "./interfaces/User/user.interface";
import { Code } from "./interfaces/User/code.interface";

app.use(limiter);
app.use(
  session({
    secret: process.env.SESSION_KEY as string,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365 * 10,
    },
  })
);

app.use(express.json());

app.use(logger("dev"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Hello World!");
});

app.use("/auth", auth.router as RequestHandler);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(404).send("Page Not Found!");
  } catch (err) {
    console.log(err);
    return;
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  main();
  console.log(`Server running at http://localhost:${port}`);
});
