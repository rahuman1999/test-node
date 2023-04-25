import express from "express";
const router = express.Router();
import * as user from "./user.controller";
import UserSchema from "./user.schema";


router.post("/profile",user.profileUpload);


export = router;
