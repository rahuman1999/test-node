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

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare first_name: string;
  declare password: string;
  declare email: string;
  declare profile:string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
   
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    profile: {
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
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default User;
