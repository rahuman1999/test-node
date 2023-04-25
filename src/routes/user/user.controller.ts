/* eslint-disable indent */
import { Request, Response } from "express";
import Utility from "../../utility/utility";
import * as service from "./user.service";
import Constants from "../../constant/constants";
import { createClient } from "redis";
import fs from 'fs';
const AWS= require("aws-sdk")
import nodemailer from "nodemailer";
const client = createClient();



export const profileUpload = async (req: Request, res: Response) => {
  try {
    const email= await service.checkEmail(req.body.email);
    if(email){ 
      return Utility.errorRes(res, 400, null, "Already email Address Used");
    }
    const password = await Utility.hashData(req.body.password);
    const bodyData: any = {
      first_name: req.body.first_name,
      email: req.body.email,
      profile:req.file?.filename,
      password: password,
    };
    const s3 = new AWS.S3({
      accessKeyId: process.env.KEY_ID,
      secretAccessKey: process.env.SECRET_KEY,
    });
    const fileContent=fs.readFileSync("src/Images/"+req.file?.filename)
    const params :any= {
      Bucket: process.env.BUCKET_NAME,
      Body: fileContent,
      Key: `userProfile/${req.file?.filename}`
    };

  s3.upload(params, async(err:any, data:any) => {
  if (err) {
    console.log('Error occured while trying to upload to S3 bucket', err);
  }
  if(data){
    const createdData = await service.profileUpload(bodyData);
    if (!createdData) {
      return Utility.errorRes(res, 400, null, "User Added Failed.");
    }

    return Utility.successRes(
      res,
      200,
      createdData,
      "User added successfully!"
    );
  }
})
  } catch (error) {
    return Utility.errorRes(res, 400, error);
  }
};







