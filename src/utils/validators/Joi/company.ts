/** @format */

import Joi from "joi";

interface createCompany {
  name?: string;
  phone?: string;
  status?: string;
}

// define a Joi schema for user registration
const createSchema = Joi.object().keys({
  name: Joi.string().max(255).required(),
  phone: Joi.string().max(55).required(),
  status: Joi.string().valid("active", "inactive", "pending").required(),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().max(255),
  phone: Joi.string().max(55),
  status: Joi.string().valid("active", "inactive", "pending"),
});

// define a Joi schema for user registration
const createSchemaD = Joi.object().keys({
  name: Joi.string().max(255).required(),
  lead: Joi.string().max(100).required(),
  status: Joi.string().valid("active", "inactive", "pending").required(),
});

const updateSchemaD = Joi.object().keys({
  name: Joi.string().max(255),
  lead: Joi.string().max(100),
  status: Joi.string().valid("active", "inactive", "pending"),
});

// define a function to validate user input
export function createCompanyValidator(input: createCompany) {
  // validate the user input against the schema
  return createSchema.validate(input);
}

export function updateCompanyValidator(input: createCompany) {
  return updateSchema.validate(input);
}

export function createDepartmentValidator(input: createCompany) {
  // validate the user input against the schema
  return createSchema.validate(input);
}

export function updateDepartmentValidator(input: createCompany) {
  return updateSchema.validate(input);
}
