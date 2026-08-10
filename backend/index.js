import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectdb.js";
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routers/auth.route.js";
import userRouter from "./routers/user.route.js";
import componentRouter from "./routers/component.route.js";
import paymentRouter from "./routers/payment.route.js";

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5174";

if (!CLIENT_ORIGIN) {
  throw new Error("CLIENT_ORIGIN must be defined in backend/.env");
}

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

/* ✅ Body parser */
app.use(express.json());
app.use(cookieParser()); 
app.get("/", (req, res) => {
  res.json({ message: "Backend Running 🚀" });
});

app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/component" , componentRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB()
});
