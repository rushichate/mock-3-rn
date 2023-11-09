const express = require("express")
const { UserModel } = require("../moduls/user.modul")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()


userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try{
        const  hashPassword = bcrypt.hashSync(password,5) 
        const newUser = new UserModel({name,email,password:hashPassword})
        await newUser.save()
        res.status(201).json({message:"User registered"})

    }catch(error){
        res.status(400).json(error.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
    try{
        const isEmailValid = await UserModel.findOne({email})
        if(!isEmailValid){
            return res.status(201).json({message:"Invalid Email"})
        }
        
        const isPasswordValid = bcrypt.compareSync(password,isEmailValid.password)
        if(!isPasswordValid){
            return res.status(201).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({userID:isEmailValid._id},"masai")
        res.status(201).json({message:"Login Success",token:token})


    }catch(error){
        res.status(400).json(error.message)
    }
})

module.exports = {
    userRouter
}