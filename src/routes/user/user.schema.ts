/* eslint-disable indent */
import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import Utility from "../../utility/utility";

class UserSchema {
  addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmpsw: Joi.string().required(),
        address:Joi.string().required()
      });
      const validatedData = schema.validate(userData);
      Utility.validatedData(validatedData, res, next);
    } catch (error) {
      return Utility.errorRes(res, 400, error);
    }
  }

  signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const schema = Joi.object({
        address: Joi.string().required(),
        password: Joi.string().required(),
      });
      const validatedData = schema.validate(userData);
      Utility.validatedData(validatedData, res, next);
    } catch (error) {
      return Utility.errorRes(res, 400, error);
    }
  }
}

export default new UserSchema();
