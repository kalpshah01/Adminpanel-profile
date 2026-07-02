const passport=require('passport');
const passportStrategy =require('passport-local');
const User = require('../model/userModel');
const bcrypt=require('bcrypt');

passport.use(new passportStrategy(
 async (email, password, done) => {
  console.log("email password --->>>",email,password);
      try {
        const user = await User.findOne({ email });
        console.log("User->>>>",user);
        if (!user) {  
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
console.log("IsMatch--->",isMatch);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ))

passport.serializeUser((user,done)=>{
  console.log("SerializeUser");
  done(null,user.id);
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("DeserializeUser");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports=passport;