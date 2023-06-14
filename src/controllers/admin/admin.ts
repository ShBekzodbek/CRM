/** @format */

import { Response, NextFunction } from "express";

import validator from "validator";

import { PrismaClient } from "@prisma/client";

import { AuthenticatedRequest } from "../../types/express";

import { Validator } from "../../utils/validators/Joi";

const prisma = new PrismaClient();

export const createCompany = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = Validator.CreateCompanyValidator(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const company = await prisma.company.create({
      data: {
        name: value.name,
        phone: value.phone,
        status: value.status,
        Employee: { connect: { id: req.auth?.userId } },
      },
    });
    return res.status(200).send(company);
  } catch (err) {
    return next(err);
  }
};

export const modifyCompany = (action: string) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.params.id) {
      if (!validator.isUUID(req.params.id)) {
        return res.status(400).send("Invalid id");
      }
      const isValidCompany = await prisma.company.findUnique({
        where: {
          id: req.params.id,
        },
      });
      if (!isValidCompany) {
        return res.status(404).send("Company not found");
      }
    }
    switch (action) {
      case "update":
        const { error, value } = Validator.UpdateCompany(req.body);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
        const company = await prisma.company.update({
          where: { id: req.params.id },
          data: {
            name: value.name,
            phone: value.phone,
            status: value.status,
          },
        });
        return res.status(200).send(company);
      case "delete":
        const company1 = await prisma.company.delete({
          where: { id: req.params.id },
        });
        return res.status(200).send("Company has been deleted");
      case "getCompany":
        const company2 = await prisma.company.findUnique({
          where: {
            id: req.params.id,
          },
        });
        return res.status(200).send(company2);
      case "getAll":
        const companies = await prisma.company.findMany({
          where: {
            Employee: {
              id: req.auth?.userId,
            },
          },
        });
        return res.status(200).send(companies);
    }
  };
};

export const modifer = (action: string, type: string) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.params.id) {
      if (!validator.isUUID(req.params.id)) {
        return res.status(400).send("Invalid id");
      }
      const isValid =
        (await prisma.task.findUnique({
          where: {
            id: req.params.id,
          },
        })) ||
        (await prisma.company.findUnique({
          where: {
            id: req.params.id,
          },
        }));
      if (!isValid) {
        return res.status(404).send(type + "not found");
      }
    }
    try {
      switch (action) {
        case "update":
          const { error, value } =
            type == "company"
              ? Validator.UpdateCompany(req.body)
              : Validator.UpdateDepartment(req.body);
          if (error) {
            return res.status(400).send(error.details[0].message);
          }
          const data =
            type == "company"
              ? await prisma.company.update({
                  where: { id: req.params.id },
                  data: {
                    name: value.name,
                    phone: value.phone,
                    status: value.status,
                  },
                })
              : await prisma.department.update({
                  where: { id: req.params.id },
                  data: {
                    name: value.name,
                    status: value.status,
                    Employee: value.lead,
                  },
                });
          return res.status(200).send(data);
        case "delete":
          const company1 = await prisma.company.delete({
            where: { id: req.params.id },
          });
          return res.status(200).send("Company has been deleted");
        case "getCompany":
          const company2 = await prisma.company.findUnique({
            where: {
              id: req.params.id,
            },
          });
          return res.status(200).send(company2);
        case "getAll":
          const companies = await prisma.company.findMany({
            where: {
              Employee: {
                id: req.auth?.userId,
              },
            },
          });
          return res.status(200).send(companies);
      }
    } catch (err) {
      next(err);
    }
  };
};
