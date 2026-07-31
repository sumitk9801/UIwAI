import express from "express";
import isAuth from "../middleware/isAuth.js";
import {generateComponent} from "../controllers/aicomponent.controller.js"
import { getAllComponents, publishComponent, saveComponent } from "../controllers/component.controller.js";


const componentRouter = express.Router();

// AI generate component
componentRouter.post("/generate", isAuth, generateComponent);

// save component
componentRouter.post("/save", isAuth, saveComponent);

componentRouter.post("/publish", isAuth, publishComponent);

componentRouter.get("/all-components" , isAuth , getAllComponents)

export default componentRouter;