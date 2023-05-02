/* eslint-disable indent */
import User from "./user.model";
import { Op } from "sequelize";


export const signIn = async (email: string) => {
  try {
    const userData = await User.findOne({
      where: { email: email },
    });
    return userData;
  } catch (error) {
    throw error;
  }
};


export const signUp = async (userData: User) => {
  try {
    const createdData = await User.create(userData);
    return createdData;
  } catch (error) {
    throw error;
  }
};

export const getUserList = async (
  page: number,
  limit: number,
  search: string
) => {
  try {
    const offset = (page - 1) * limit;
    const userList = await User.findAll({
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.substring]: search,
            },
          },
          {
            email: {
              [Op.substring]: search,
            },
          },
        ],
      },
      attributes: [["id", "user_id"], "first_name","email","profile"],
      offset: offset,
      limit: limit,
    });
    return userList;
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

