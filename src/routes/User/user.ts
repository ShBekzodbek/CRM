/** @format */

import { RequestHandler, Router } from "express";
import { GetExtraInfo } from "../../controllers/user/getExtraInfo";
import { authMiddleware } from "../../middlewares/auth/isAuth";

const router: Router = Router();

router.post("/extra", authMiddleware, GetExtraInfo as RequestHandler);

export default router;
