import express from "express";
const router = express.Router();
import * as userSkill from './user_skills.controller';


router.get("/skillList", userSkill.getUserSkillList);
router.post("/addUserSkill",userSkill.addUserSkill);
router.get('/userSkillList',userSkill.getUserSelectedSkill);
router.get('/getUserSkillFunction',userSkill.skillFunction);
router.get('/addUserSkillProcedure',userSkill.addUserSkillProcedure);

export = router;
