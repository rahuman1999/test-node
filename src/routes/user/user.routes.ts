import express from "express";
const router = express.Router();
import * as user from "./user.controller";
import UserSchema from "./user.schema";


router.post("/signup",user.signUp);
router.post("/signin",user.signIn);
router.get("/user-list", user.getUserList);

export = router;
