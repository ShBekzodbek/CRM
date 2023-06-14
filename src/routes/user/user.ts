/** @format */

import { RequestHandler, Router } from "express";

import multer from "multer";

import { GetExtraInfo } from "../../controllers/user/getExtraInfo";

import { authMiddleware } from "../../middlewares/auth/isAuth";

import {
  DeleteUser,
  GetUserByIdOrAuth,
  UpdateUser,
  UploadImage,
} from "../../controllers/user/user";

import { fileStorage, fileFilter } from "../../utils/functions/multer";

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const router: Router = Router();

router.post(
  "/image",
  authMiddleware as RequestHandler,
  upload.single("image"),
  UploadImage as RequestHandler
);

router.post(
  "/extra",
  authMiddleware as RequestHandler,
  GetExtraInfo as RequestHandler
);

router.get(
  "/user",
  authMiddleware as RequestHandler,
  GetUserByIdOrAuth as RequestHandler
);

router.put(
  "/update",
  authMiddleware as RequestHandler,
  UpdateUser as RequestHandler
);

router.delete(
  "/delete",
  authMiddleware as RequestHandler,
  DeleteUser as RequestHandler
);

export default router;
