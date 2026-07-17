import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/connectdb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.route.js";
import userRouter from "./routers/user.route.js";
import cors from "cors";

//CONNECTIONS
const app = express();
const PORT = process.env.PORT || 3000;

//API ENDPOINTS
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
// LISTENING TO PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})