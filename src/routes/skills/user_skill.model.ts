/* eslint-disable indent */
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Sequelize,
  } from "sequelize";
  import sequelize from "../../config/database";
  
  class User_Skill extends Model<InferAttributes<User_Skill>, InferCreationAttributes<User_Skill>> {
    declare id: CreationOptional<number>;
    declare skills: Array<number[]>;
    declare skill_id:number;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
  }
  
  User_Skill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, 
      skills: {
        type: new DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: []
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    },
    { 
      timestamps: false,
      tableName: "users_skill",
      sequelize, // passing the `sequelize` instance is required
    }
  );
  
  export default User_Skill;
  