import express from "express";
const router = express.Router();

import {getCurrentUser,getAllUsers} from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";

router.get("/current-user",isAuth,getCurrentUser);
router.get("/all-users",getAllUsers)

export default router;