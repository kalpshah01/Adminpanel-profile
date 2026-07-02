const mongoose=require('mongoose');

const schema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    blogpicture:{
        type:String,
        required:true
    },
})

const BlogModel=mongoose.model("blogs",schema);

module.exports=BlogModel;