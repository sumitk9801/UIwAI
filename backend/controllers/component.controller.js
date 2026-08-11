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
        const componentData = {
            name,
            code,
            props,
        };
        if (user.role === "user") {
            componentData.owner = req.userId;
        }
        const component = await Component.create(componentData)
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

    const libPath = path.join(process.cwd(), "../uiwai-lib");

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
    // Sync exported components from the local uiwai-lib into the DB as public components.
    // This allows admins to add new component folders inside uiwai-lib and have them
    // show up in the Public components section without separately publishing.
    try {
      const libIndexPath = path.join(process.cwd(), "../uiwai-lib/src/index.js");
      if (fs.existsSync(libIndexPath)) {
        const indexContent = fs.readFileSync(libIndexPath, "utf8");
        const exportRegex = /export\s*\{\s*([\w]+)\s*\}\s*from\s*["'](.+)["'];?/g;
        let match;
        while ((match = exportRegex.exec(indexContent)) !== null) {
          const name = match[1];
          const relPath = match[2]; // relative path to the component file
          const absFile = path.join(path.dirname(libIndexPath), relPath);
          try {
            if (fs.existsSync(absFile)) {
              const code = fs.readFileSync(absFile, "utf8");
              const existing = await Component.findOne({ name, visibility: "public" });
              if (!existing) {
                await Component.create({
                  name,
                  code,
                  props: [],
                  visibility: "public",
                  npmPackage: "uiwai-lib",
                });
              }
            }
          } catch (err) {
            console.error("Error syncing component file:", absFile, err);
          }
        }
      }
    } catch (syncErr) {
      console.error("Component sync error:", syncErr);
      // proceed to return DB components even if sync fails
    }

    const components = await Component.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(components);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};