import { Request, Response } from "express";
import Utility from "../../utility/utility";
import * as service from "./user_skills.service";
import Constants from "../../constant/constants";





export const skillFunction = async (req: Request, res: Response) => {
  try {
      const skillList = await service.skillFunction();
      console.log("skill data",skillList[0])
      if (!skillList) {
        return Utility.errorRes(res, 400, null, "Failed.");
      }

      return Utility.successRes(
        res,
        200,
        skillList[0],
        "Skill list fetched successfully!"
      );
  } catch (error) {
    return Utility.errorRes(res, 400, error);
  }
};


export const addUserSkillProcedure = async (req: Request, res: Response) => {
  try {
      const addUserSkill = await service.addUserSkillProcedure();
      console.log("skill data",addUserSkill)
      if (!addUserSkill) {
        return Utility.errorRes(res, 400, null, "Failed.");
      }

      return Utility.successRes(
        res,
        200,
        addUserSkill[0],
        "Skill list fetched successfully!"
      );
  } catch (error) {
    return Utility.errorRes(res, 400, error);
  }
};



export const getUserSkillList = async (req: Request, res: Response) => {
    try {
      console.log("auth data",req.query.user_data)
        const userList = await service.getUserSkillList();
        return Utility.successRes(
          res,
          200,
          userList,
          "User list fetched successfully!"
        );
    } catch (error) {
      return Utility.errorRes(res, 400, error);
    }
  };


  export const getUserSelectedSkill = async (req: Request, res: Response) => {
    try {
        console.log("selected skill")
        const userData:any=req.query.user_data
        const userList:any = await service.getUserSelectedSkill(userData.userid);
        console.log("fetch skills",userList);
        if (!userList || userList.length < 1) {
          return Utility.errorRes(res, 400, null, "No skill found.");
        }
        console.log("userlise",userList)
        return Utility.successRes(
          res,
          200,
          userList,
          "Skill list fetched successfully!"
        );
    } catch (error) {
      return Utility.errorRes(res, 400, error);
    }
  };



  export const addUserSkill = async (req: Request, res: Response) => {
    try {
      const userData:any=req.query.user_data
      const bodyData: any = {
        skill_id:userData.userid,
        skills: req.body.skills,
      };
      console.log("adduserlist") 
      const userList:any = await service.getSelectedSkill(userData.userid);
      console.log("fetch skills",userList);
      if (userList) {
        console.log("update")
        const updatedData = await service.updateUserSkill(userData.userid,{ skills: req.body.skills});
        if (!updatedData) {
          return Utility.errorRes(res, 400, null, "Updation Failed.");
        }
        return Utility.successRes(res, 200, updatedData, "Update Successfully");
      }else{
     console.log("add")
      const createdData = await service.addUserSkill(bodyData);
      if (!createdData) {
        return Utility.errorRes(res, 400, null, "User Added Failed.");
      }
        return Utility.successRes(
          res,
          200,
          createdData,
          "User skill added successfully!"
        );
      }
    } catch (error) {
      return Utility.errorRes(res, 400, error);
    }
  };
  