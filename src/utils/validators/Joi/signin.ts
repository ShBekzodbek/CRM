/** @format */

import { Response } from "express";
import Joi from "joi";

interface UserLogIn {
  email: string;
  password: string;
}

// define a Joi schema for user registration
const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// define a function to validate user input
export function Login(userInput: UserLogIn, res: Response): any {
  // validate the user input against the schema
  const { error, value } = schema.validate(userInput);
  // check if there is any validation error
  if (error) {
    // log the error details and return false
    return res.status(400).send(error.details[0].message);
  }
}
