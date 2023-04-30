/** @format */

import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface UserRegistration {
  fullName: string;
  email: string;
  password: string;
}

// define a Joi schema for user registration
const schema = Joi.object().keys({
  fullName: Joi.string().max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// define a function to validate user input
export function validateUserInput(
  userInput: UserRegistration,
  res: Response
): any {
  // validate the user input against the schema
  const { error, value } = schema.validate(userInput);
  // check if there is any validation error
  if (error) {
    // log the error details and return false
    return res.status(400).send(error.details[0].message);
  }
}
