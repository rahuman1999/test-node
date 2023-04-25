/* eslint-disable indent */
import User from "./user.model";
import { Op } from "sequelize";



export const profileUpload = async (userData: User) => {
  try {
    const createdData = await User.create(userData);
    return createdData;
  } catch (error) {
    throw error;
  }
};


export const checkEmail = async (email: string) => {
  try {
    const userData = await User.findOne({ where: { email: email } });
    return userData;
  } catch (error) {
    throw error;
  }
};

