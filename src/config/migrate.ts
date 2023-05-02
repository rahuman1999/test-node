/* eslint-disable indent */
import User from "../routes/user/user.model";
import User_Skill from '../routes/skills/user_skill.model';
import Skill from '../routes/skills/skill.model';

class migrateModels {
  async syncModels() {
    try {
      await User.sync({ alter: true });
      await User_Skill.sync({alter: true});
      await Skill.sync({alter:true});
      // Notification.hasMany(Transaction, {as: "Transaction_Detail",foreignKey:"user_id" });
      // Transaction.belongsTo(Notification,{foreignKey:"id"});
    } catch (error) {
      console.log("syncModels error - ", error);
    }
  }
}

export default new migrateModels();
