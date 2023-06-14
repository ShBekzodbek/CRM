/** @format */

import { Login } from "./signin";
import { Signup } from "./signup";
import {
  createCompanyValidator,
  createDepartmentValidator,
  updateCompanyValidator,
  updateDepartmentValidator,
} from "./company";

export class Validator {
  static Login = Login;
  static Signup = Signup;
  static CreateCompanyValidator = createCompanyValidator;
  static UpdateCompany = updateCompanyValidator;
  static CreateDepartmentValidator = createDepartmentValidator;
  static UpdateDepartment = updateDepartmentValidator;
}
