import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   role:{
    type:String,
    enum:["user","admin"],
    default:"user"
   },
   aiCredits:{
    type:Number,
    default:500
   }
},{timestamps:true})

const User = mongoose.model("User", UserSchema);
export default User;