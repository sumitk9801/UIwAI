const isAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"user do not have vaild token"});
        }
        req.userId= decoded.userId;
        next();

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"});
    }
}
export default isAuth;