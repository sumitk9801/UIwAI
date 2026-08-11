import User from "../models/user.model.js";
import { generateToken } from "../config/token.js";

export const googleAuth = async(req,res)=>{
    try{
        const {name,email} = req.body;
        const adminEmail = process.env.ADMIN_EMAIL; // Get the admin email from environment variables
        let user = await User.findOne({email});
        
        if(!user){
            const newUser = new User({
                name,
                email,
                role: email === adminEmail ? "admin" : "user"
            });
            await newUser.save();
            const token = await generateToken(newUser._id);
            res.cookie("token",token,{
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:7*24*60*60*1000
            });
            return res.status(201).json({message:"User created and logged in successfully", user:newUser});
        }
        
        if (email === adminEmail && user.role !== "admin") {
            user.role = "admin";
            await user.save();
        }
        
        // User already exists
        const token = await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });
        return res.status(200).json({message:"User logged in successfully", user:user});
        
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