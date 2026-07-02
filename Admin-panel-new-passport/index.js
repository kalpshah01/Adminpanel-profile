const express=require('express');
const bodyparser=require('body-parser');
const port=3000;
const Routes=require("./routes/indexroute");
const server=express();

const passport=require('passport');
const passportplan=require('./middleware/passport');
const expressSession =require('express-session');
const cookiesParser=require("cookie-parser");
// const cookieParser = require("cookie-parser");

server.use(cookiesParser());

server.set('view engine','ejs');
server.use(express.static("public"));
server.use(bodyparser.urlencoded({extended:true}));
const session = require("express-session");

server.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use("/uploads", express.static("uploads"));
server.use("/",Routes);

server.listen(port,(err)=>{
    if(!err){
        console.log("server started at port",port);
    }
    else{
        console.log("already server running",err);
    }
})