const mongoose=require('mongoose');

const schema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unqiue:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
    },
    department:{
        type:String,
    },
    profileImage:{
        type:String,
    },
    language:{
        type:String,
    },
    bio:{
        type:String,
    },desgination:{
        type:String,
    }
})

const User=mongoose.model("User",schema);

module.exports=User;