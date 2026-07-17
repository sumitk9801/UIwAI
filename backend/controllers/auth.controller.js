import User from "../models/user.model.js";
import { generateToken } from "../config/token.js";

export const googleAuth = async(req,res)=>{
    try{
        const {name,email} = req.user;
        const user = await User.findOne({email});
        if(!user){
            const newUser = new User({
                name,
                email
            });
            await newUser.save();
            res.status(201).json({message:"User created successfully", user:newUser});
            const token = await generateToken(newUser._id);
            res.cookie("token",token,{
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:7*24*60*60*1000});
            res.status(200).json({message:"User created and logged in successfully", user:newUser});

        }
    } catch(error){
        console.log(error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
export const logout = async(req,res)=>{
    try{
        res.clearCookie("token",{httpOnly:true,secure:false,sameSite:"strict"});
        res.status(200).json({message:"Logged out successfully"});
    } catch(error){
        console.log(error.message);
        res.status(500).json({message:"Internal server error"});
    }
}