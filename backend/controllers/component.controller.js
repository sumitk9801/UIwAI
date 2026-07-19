import User from "../models/user.model";
export const saveComponent=async(req,res)=>{
    try{
        const {name,code,props} = req.body;
        const user = await User.findOne({email});
        if (!user) {
           return res.json({ status: 404, message: "User not found" });
        }
        if(user.role==="admin"){
            const existing = await Component.findOne({name,visibility:"public"});
            if(existing){
                return res.status(404).json("Component already Exits");
            }
        }
        if(user.role==="user"){
            const existing = await Component.findOne({name,owner:req.userId})
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
