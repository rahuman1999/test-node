/* eslint-disable indent */
import { Request, Response, NextFunction } from "express";
import Constants from "../constant/constants";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltData = 10;

class Utility {
  successRes(res: Response, code = 200, data?: any, message = "Success!") {
    return res.status(code).json({
      code,
      status: "success",
      message,
      data,
    });
  }

  errorRes(res: Response, code = 400, error: any, message = "Error!") {
    return errorRes(res, code, error, message);
  }

  validatedData(validatedData: any, res: Response, next: NextFunction) {
    if (validatedData && !validatedData.error) {
      return next();
    } else if (validatedData) {
      const errorMessage =
        validatedData.error &&
        validatedData.error.details &&
        validatedData.error.details.length > 0 &&
        validatedData.error.details[0].message
          ? validatedData.error.details[0].message
          : "";
      return errorRes(res, 400, null, errorMessage);
    }
  }

  compareData(password: any, Userpassword: any) {
    try {
      const validUser = bcrypt.compare(password, Userpassword);
      return validUser;
    } catch (error) {
      throw error;
    }
  }

  async hashData(password: any) {
    try {
      const salt = await bcrypt.genSalt(saltData);
      const hashPassword = await bcrypt.hash(password, salt);
      return hashPassword;
    } catch (error) {
      throw error;
    }
  }

  tokenData(email: string, id: number, first_name: string) {
    try {
      const token = jwt.sign(
        { email: email, userid: id, name: first_name },
        Constants.SECRET_KEY
      );
      console.log(Constants.SECRET_KEY);
      return token;
    } catch (error) {
      throw error;
    }
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const tokenSignature = req.headers["auth-token"]
      ? (req.headers["auth-token"] as string)
      : "";

    console.log("token data",tokenSignature);
    if (tokenSignature) {
      const verifiedtoken = verifyToken(tokenSignature);
      if (verifiedtoken == "TokenExpiredError") {
        return errorRes(res, 401, null, "Token has expired.");
      } else if (!verifiedtoken) {
        return errorRes(res, 400, null, "Token invalid.");
      }
      console.log("verifiedtoken - ", verifiedtoken);

      req.query["user_data"] = verifiedtoken;
      next();
    } else {

      next();
    }
  }
}

function verifyToken(token: string) {
  try {
    console.log("verifyToken_SecretKey - ", token, Constants.SECRET_KEY);
    return jwt.verify(token, Constants.SECRET_KEY);
  } catch (error: any) {
    console.log("verify token error - ", error);
    if (error && error.name == "TokenExpiredError") {
      return "TokenExpiredError";
    } else {
      return "";
    }
  }
}

function errorRes(res: Response, code = 400, error: any, message = "Error!") {
  return res.status(code).json({
    code,
    status: "error",
    message: error && error.message ? error.message : message,
  });
}

export default new Utility();
