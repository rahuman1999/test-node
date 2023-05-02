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
  
  class Skill extends Model<InferAttributes<Skill>, InferCreationAttributes<Skill>> {
    declare id: CreationOptional<number>;
    declare skills: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
  }
  
  Skill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, 
      skills: {
        type: new DataTypes.STRING(128),
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
      tableName: "skill",
      sequelize, // passing the `sequelize` instance is required
    }
  );
  
  export default Skill;
  