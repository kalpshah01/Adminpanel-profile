// const passport = require("passport");
const User = require("../model/userModel");
const bcrypt=require("bcrypt");
const passport=require('../middleware/passport');
const testController = (req, res) => {
  res.redirect("/auth/signup");
};


const signupController = (req, res) => {
    const { user } = req.cookies;

    if (user) {
        return res.redirect("/dashboard");
    }

    return res.render("signup");
};

const signinController = (req, res) => {
    const { user } = req.cookies;

    if (user) {
        return res.redirect("/dashboard");
    }

    return res.render("signin");
};


  const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashpass = await bcrypt.hash(password, 12);
// console.log(hashpass);
    const newUser = new User({
      name,
      email,
      password: hashpass,
    });

    await newUser.save();

    res.redirect("/auth/signin");
  } catch (err) {
    console.log(err);
    res.redirect("/auth/signup");
  }
};

const loginController = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) {
      return next(err);
    }

    if (!user) {
      if (info?.message === "User not found") {
        return res.redirect("/auth/signup");
      }

      if (info?.message === "Incorrect password") {
        return res.redirect("/auth/signin");
      }

      return res.redirect("/auth/signin");
    }

    req.login(user, (err) => {
      if (err) {
        console.log("Error in login", err);
        return res.redirect("/auth/signin");
      }

      console.log("Login Success");
      req.user=user;
      console.log("Session:", req.session);

      return res.redirect("/dashboard");
    });

  })(req, res, next);
};
const logoutController = (req,res)=>{
    
    req.logout((err)=>{
      if(err){
        console.log("Error in logout",err);
      }
    });
  //  res.clearCookie("user");

    return res.redirect("/auth/signin");
}
module.exports = {
  testController,
  signinController,
  signupController,
  registerController,
  loginController,
  logoutController
};
