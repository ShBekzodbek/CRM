/** @format */

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
  position: Joi.string().required().valid("employee", "user"),
});

// define a function to validate user input
export function Signup(userInput: UserRegistration) {
  // validate the user input against the schema
  return schema.validate(userInput);
  // check if there is any validation error
}
