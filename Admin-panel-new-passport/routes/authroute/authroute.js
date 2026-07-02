const express=require('express');
const route=express.Router();
const passport=require('../../middleware/passport');
const {signinController ,signupController,registerController,loginController,logoutController} = require("../../controllers/authController");
const { LogoutCheck, isLogin } = require('../../middleware/auth');

route.get("/signin", isLogin, signinController);
route.get("/signup", isLogin, signupController);
route.post("/register",registerController);
// route.post("/login",passport.authenticate('local'),loginController);
route.post("/login",loginController);
route.get("/logout", LogoutCheck,logoutController);
module.exports=route;