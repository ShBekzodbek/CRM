/** @format */

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
export function Login(userInput: UserLogIn) {
  // validate the user input against the schema
  return schema.validate(userInput);
}
