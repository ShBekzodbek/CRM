"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
let redisClient = (0, redis_1.createClient)({});
const UserRoute = __importStar(require("./routes/User/user"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
redisClient.connect().catch((err) => console.log(err));
let redisStore = new connect_redis_1.default({
    client: redisClient,
    prefix: "dapps",
});
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "../" + __dirname + "/.env" });
const app = (0, express_1.default)();
const auth = __importStar(require("./routes/Auth/auth"));
const connect_db_1 = __importDefault(require("./utils/functions/connect_db"));
const isAuth_1 = require("./middlewares/auth/isAuth");
app.use(limiter);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 365 * 10,
    },
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", isAuth_1.authMiddleware, (req, res, next) => {
    return res.status(200).send("Hello World!");
});
app.use("/auth", auth.router);
app.use("/me", UserRoute.default);
app.use("*", (req, res, next) => {
    try {
        return res.status(404).send("Page Not Found!");
    }
    catch (err) {
        console.log(err);
        return;
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    (0, connect_db_1.default)();
    console.log(`Server running at http://localhost:${port}`);
});
