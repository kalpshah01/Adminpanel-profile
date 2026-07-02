const express=require('express');
const route=express.Router();
const { testController} = require("../controllers/authController");
const authRoute=require("./authroute/authroute");
const db = require('../config/database');
const dashboardRoute= require("./dashboard/dashboardroute");
db();
route.get("/",testController);
route.use("/auth",authRoute);
route.use("/dashboard",dashboardRoute);



module.exports=route;