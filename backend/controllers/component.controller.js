import User from "../models/user.model.js";
import Component from "../models/component.model.js";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

export const saveComponent=async(req,res)=>{
    try{
        const {name,code,props} = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
           return res.json({ status: 404, message: "User not found" });
        }
        let existing = null;
        if(user.role==="admin"){
            existing = await Component.findOne({name,visibility:"public"});
            if(existing){
                return res.status(404).json("Admin cannot create Component with same name that already Exits");
            }
        }
        if(user.role==="user"){
            existing = await Component.findOne({name,owner:req.userId})
        }
        if(existing){
            return res.status(400).json("Component already Exits with this name");
        }
        const component = await Component.create({
            name,
            code,
            props,
            owner:req.userId
        })
        return res.status(200).json(component);
    }
    catch(error){
        return res.status(500).json(`failed to save component ${error}`);
    }
}
export const publishComponent = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can publish"
      });
    }

    const { componentId } = req.body;

    const component = await Component.findById(componentId);

    if (!component) {
      return res.status(404).json({
        message: "Component not found"
      });
    }

    if (component.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You can only publish your own components"
      });
    }

    const libPath = path.join(process.cwd(), "../virtual-ui-lib");

    const componentDir = path.join(
      libPath,
      "src/components",
      component.name
    );

    const componentFile = path.join(
      componentDir,
      `${component.name}.jsx`
    );

    const indexFile = path.join(libPath, "src/index.js");

    // create component folder
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // write component code
    fs.writeFileSync(componentFile, component.code);

    // read index file
    let indexContent = fs.readFileSync(indexFile, "utf8");

    const exportLine =
      `export { ${component.name} } from "./components/${component.name}/${component.name}.jsx";`;

    // prevent duplicate export
    if (!indexContent.includes(exportLine)) {
      fs.appendFileSync(indexFile, `\n${exportLine}\n`);
    }

    // -----------------------------
    // CLEAN OLD BUILD
    // -----------------------------
    console.log("Cleaning old build...");

    const distPath = path.join(libPath, "dist");

    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true, force: true });
    }

    // -----------------------------
    // BUILD LIBRARY
    // -----------------------------
    console.log("Building library...");

    execSync("npm run build", {
      cwd: libPath,
      stdio: "inherit"
    });

    // -----------------------------
    // UPDATE VERSION
    // -----------------------------
    console.log("Updating version...");

    execSync("npm version patch --no-git-tag-version", {
      cwd: libPath,
      stdio: "inherit"
    });

    // -----------------------------
    // PUBLISH TO NPM
    // -----------------------------
    console.log("Publishing to npm...");

    execSync("npm publish --access public", {
      cwd: libPath,
      stdio: "inherit"
    });

    // update component visibility
    component.visibility = "public";
    component.npmPackage = "virtual-ui-lib";

    await component.save();

    res.json({
      message: "Component published successfully"
    });

  } catch (error) {

    console.error("Publish Error:", error);

    res.status(500).json({
      message: "Publish failed",
      error: error.message
    });
  }
};


export const getAllComponents = async (req, res) => {
  try {
    const components = await Component.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(components);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};