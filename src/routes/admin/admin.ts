/** @format */

import { RequestHandler, Router } from "express";

import { createCompany, modifyCompany } from "../../controllers/admin/admin";

const router: Router = Router();

router.post("/company", createCompany as RequestHandler);

router.put("/company/:id", modifyCompany("update") as RequestHandler);

router.get("/company/:id", modifyCompany("getCompany") as RequestHandler);

router.delete("/company/:id", modifyCompany("delete") as RequestHandler);

router.get("/companies", modifyCompany("getAll") as RequestHandler);

export default router;
