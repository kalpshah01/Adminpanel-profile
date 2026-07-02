const mongoose=require('mongoose');

const db=async()=>{
    await  mongoose.connect('mongodb://127.0.0.1:27017/adminpanel').then(()=>{
console.log("Database Connected");
    }).catch((err)=>{
        console.log("Database Connection Failed");
    })
}

module.exports=db;