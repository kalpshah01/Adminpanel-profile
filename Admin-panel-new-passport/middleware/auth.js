const LoginCheck=(req,res,next)=>{
  console.log("login check:", req.isAuthenticated());
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/auth/signin');
  }
}

const LogoutCheck=(req,res,next)=>{
  console.log("logout check:", req.isAuthenticated());
  if(req.isAuthenticated()){
    next();

    }else{
        res.redirect('/auth/signin');
    }
}

const isLogin=(req,res,next)=>{
  console.log("is login check:", req.isAuthenticated());
  if(req.isAuthenticated()){
    res.redirect('/dashboard');
  }else{
    next();
  }
}

module.exports={LoginCheck,isLogin,LogoutCheck};