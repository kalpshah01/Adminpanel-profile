const express=require('express');
const User=require('../model/userModel');
const fs=require('fs');
//const BlogModel = require('../model/blogmodel');
// Correct
const BlogModel = require('../model/blogModel/blogModel');


const viewblogController = async (req,res) => {
    try {

        const blogs = await BlogModel.find();

        res.render("viewblog", { blogs });

    } catch(err) {
        console.log(err);
    }
}
const addblogController=async(req,res)=>{
    try{

        console.log("blog data is",req.body);
        if(!req.file){
    return res.send("Please upload image");
}
        const blog=BlogModel({
            title:req.body.blogtitle,
            description:req.body.description,
            date:req.body.date,
            blogpicture:req.file.filename
        })
      await blog.save();
      console.log(blog);
      console.log("blog added succesfully");
      res.redirect("/dashboard/views-blogs");

    }
    catch(err){
        console.log("err",err);
    }

}
const showaddblogController=(req,res)=>{
res.render("addblog");
}

const editblogController=async(req,res)=>{
    try{

        const {id}=req.params;
        console.log("id",id);
        
        const blog=await BlogModel.findById(id);
        if(!blog){
            res.redirect("/dashboard/views-blogs");
        }
        else{
            res.render("editblog",{blog});
        }
    }
    catch(err){
        console.log("err in edit",err);
        res.render('');
    }
}

const updateblogController=async(req,res)=>{
    try{

            let blog = await BlogModel.findById(req.params.id);

         if (req.file && blog.blogpicture) {
    fs.unlink('./uploads/' + blog.blogpicture,(err)=>{
        if(!err)
        console.log("delete successfully");
    });


                await BlogModel.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    blogpicture: req.file.filename
                });

            } else {

                await BlogModel.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    blogpicture: blog.blogpicture
                });

            }

            res.redirect('/dashboard/views-blogs');
    } catch(err){
console.log("errr in update",err);
    }
}

const deleteblogController=async(req,res)=>{
    try {

        let blog = await BlogModel.findById(req.params.id);

        if (blog.blogpicture) {
            fs.unlink('./uploads/' + blog.blogpicture,(err)=>{
                if(!err){
                    console.log("File Deleted");
                }
            });
        }

        await BlogModel.findByIdAndDelete(req.params.id);

        console.log("Deleted Successfully");
        res.redirect('/dashboard/views-blogs');

    } catch (err) {
        console.log(err);
    }
}

const dashboardController = async (req,res)=>{
    try{

        // const { user } = req.cookies;

        // if(!user){
        //     return res.redirect("/auth/signin");
        // }

        const blogs = await BlogModel.find();

        return res.render("dashboard",{ blogs });

    }catch(err){
        console.log(err);
    }
}
const profileController =async (req, res) => {
//    try {
//         const user = await User.findById(req.user._id);

//         res.render("viewprofile", {
//             title: "Profile",
//             user
//         });
//     } catch (err) {
//         console.log(err);
//         res.redirect("/dashboard");
//     }
res.render("viewprofile",{user:req.user, profileImage:req.user.profileImage});
}

const updateprofileController = async (req, res) => {
    try {

        const userId = req.params.id;
console.log("file is ---->",req.file);
        const {
            name,
            email,
            phone,
            department,
            desgination,
            language,
            bio
        } = req.body;

        const updateData = {
            name,
            email,
            phone,
            department,
            desgination,
            language,
            bio
        };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }
        console.log("file name is ", req.file.filename);
        await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        return res.redirect("/dashboard/profile");

    } catch (err) {
        console.log(err);
        return res.redirect("/dashboard/profile");
    }
};
module.exports={addblogController,viewblogController,editblogController,updateblogController,deleteblogController,dashboardController,showaddblogController,profileController,updateprofileController};