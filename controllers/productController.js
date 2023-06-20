import Products from "../models/productModel.js"
import fs from "fs" //fs=file system

export const addProductController=async(req,res)=>{
    try{
        const {name,description,price,category,quantity,shipping}=req.fields
        const {photo}=req.files

        //validation
        switch(true){
            case !name:
                return res.status(404).json("name required")
            case !description:
                return res.status(404).json("description required")
            case !price:
                return res.status(404).json("price required")
            case !category:
                return res.status(404).json("category required")
            case !quantity:
                return res.status(404).json("quantity required")
            case photo && photo.size > 1000000 :
                return res.status(404).json("valid photo size required")                          
        }

        const product=new Products({
            ...req.fields
        })
        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type
            }
        await product.save()
        res.status(201).json("product successfully added to database")
        
    }catch(err){
        //console.log(err)
        res.status(500).json({mess:"product not added to database",error:err})
    }
}

export const getProductController=async(req,res)=>{
    try{
        const productlist=await Products.find().populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).json({mess:"products found",AllProducts:productlist})
    }catch(err){
        //console.log(err)
        res.status(500).json({mess:"prdoucts not fetched",reason:err})
    }
}

export const getSingleProductController=async(req,res)=>{
    try{
        const product=await Products.findOne({name:req.params.id}).select("-photo").populate("category")
        res.status(200).json({mess:"single product found",data:product})
    }catch(err){
        //console.log(err)
        res.status(500).json({mess:"couldnt get the product"})
    }
}

export const photoController=async(req,res)=>{
    try{
        const pic=await Products.findById(req.params.pid).select("photo")
        if(pic.photo.data){
            res.set('Content-Type',pic.photo.contentType)
            res.status(200).send(pic.photo.data)
        }

    }catch(err){
        //console.log(err)
        res.status(500).json({mess:"error while getting photo",error:err})
    }
}

export const deleteProductController=async(req,res)=>{
    try{
        const product=await Products.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).json("product deleted successfully")

    }catch(err){
        //console.log(err)
        res.status.json({mess:"product deletion failed",reason:err})
    }
}

export const updateProductController=async(req,res)=>{
    try{
        const {name,description,price,category,quantity,shipping}=req.fields
        const {photo}=req.files

        //validation
        switch(true){
            case !name:
                return res.status(404).json("name required")
            case !description:
                return res.status(404).json("description required")
            case !price:
                return res.status(404).json("price required")
            case !category:
                return res.status(404).json("category required")
            case !quantity:
                return res.status(404).json("quantity required")
            case photo && photo.size > 1000000 :
                return res.status(404).json("valid photo size required")                          
        }

        const product=await Products.findByIdAndUpdate(req.params.pid,{...req.fields},{new:true})
        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type
            }
        await product.save()
        res.status(201).json("product successfully updated in database")
        
    }catch(err){
        //console.log(err)
        res.status(500).json({mess:"product not updated in database",error:err})
    }
}

export const productfiltercontroller=async(req,res)=>{
    try{
        //get checkboxx and radio values
        const {checked,radio}=req.body
        let args={}
        if(checked.length >0) args.category=checked
        if(radio.length) args.price={$gte:radio[0],$lte:radio[1]}
        const AllProducts=await Products.find(args)
        res.status(200).send({
            success: true,
            AllProducts,
          });
    }catch(err){
       // console.log(err)
        res.status(400).json("error while filtering products")
    }
}