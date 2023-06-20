import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const requireSignIn=async(req,res,next)=>{
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode
        next()
    }catch(error){
        console.log(error)
    }
}

export const isAdmin=async(req,res,next)=>{
    try{
        const user=await userModel.findById(req.user._id)
        if(user.role !== 1) res.status(401).send("unauthorized access")
        else next()
    }catch(e){
        //console.log(e)
        res.send({e,mess:"error in admin middleware"})
    }
}