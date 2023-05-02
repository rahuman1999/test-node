import User_Skill from "./user_skill.model";
import Skill from './skill.model';
import { Op } from "sequelize";
import sequelizeConnection from "../../config/database";
import Utility from "../../utility/utility";



export const skillFunction=async()=>{
  try {
    const procedureName="SELECT * FROM node.get_all_user_skill()";
   const skillData=await sequelizeConnection.query(procedureName)
   return skillData;
  } catch (error) {
    throw error;
  }
}




export const addUserSkillProcedure=async()=>{
  try {
    const procedureName="CALL node.skill_stored_procedure('Dot NET')";
   const skillData=await sequelizeConnection.query(procedureName)
   return skillData;
  } catch (error) {
    throw error;
  }
}



export const getUserSkillList = async () => {
  try {
    const skillData = await Skill.findAll();
    return skillData;
  } catch (error) {
    throw error;
  }
};

export const getSelectedSkill = async (userid: string) => {
    try {
      const userData = await User_Skill.findOne({ where: { skill_id: userid } });
      return userData;
    } catch (error) {
      throw error;
    }
  };

  export const getUserSelectedSkill = async (userid: string) => {
    try {
      const userData:any = await User_Skill.findOne({ where: { skill_id: userid } });
      console.log("userData",userData.skills)
        const skillData=await Skill.findAll({
          where: {
              id:
              {
                [Op.in]: userData.skills
              }
          }
      })
      console.log("skillData",skillData)
      return skillData;
    } catch (error) {
      throw error;
    }
  };


export const addUserSkill = async (userData: User_Skill) => {
    try {
        console.log("userrskil",userData)
      const createdData = await User_Skill.create(userData);
      return createdData;
    } catch (error) {
      throw error;
    }
  };

  export const updateUserSkill = async (
    id: number,
    userData:any
  ) => {
    console.log("update data",userData);
    try {
      const updatedData = await User_Skill.update(userData, {
        where: { skill_id: id },
      });
      return updatedData;
    } catch (error) {
      throw error;
    }
  };