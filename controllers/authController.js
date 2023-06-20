import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body
        if(!name) return res.send("name is required")
        if(!email) return res.send("email is required")
        if(!password) return res.send("password is required")
        if(!phone) return res.send("phone is required")

        const existingUser=await userModel.findOne({email}) //{email:email} is same as {email}
        if(existingUser) return res.send("user already exists so please login")

        const hashedPwd=await hashPassword(password)

        const user=new userModel({
            name,
            email,
            password:hashedPwd,
            phone,
            address
        })
        
        const newuser=await user.save()
        if(newuser){
        res.status(201).send({
            mess:"registered successfully",
            newuser
        })
        }else{
            res.status(400).send({
                mess:"registration UNsuccessful",
                newuser
            })
        }
    }catch(error){
        //console.log(error)
        res.status(500).send({
            mess:"registration failed"
        })
    }
}


export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).send({
                mess:"invalid email or password"
            })
        }
        const user=await userModel.findOne({email})
        if(!user) return res.status(200).json("user not found")

        const comparing=await comparePassword(password,user.password)
        if(!comparing) return res.status(401).json("password incorrect")

        //JWT creation
        const token= JWT.sign({_id:user._id},process.env.JWT_SECRET)
        res.status(200).json({mess:`${user.name} Logged IN `,user,token})

    }catch(error){
        //console.log(error)
        res.status(400).send({
            mess:"login failed",
            reason:error
        })
    }
}

export const testController =(req,res)=>{
    res.send("protected route")
}

