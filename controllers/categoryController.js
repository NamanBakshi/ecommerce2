import Category from "../models/categoryModel.js"

export const createCategoryController=async(req,res)=>{
    try{
        const {name}=req.body
        if(!name) return res.status(401).json("invalid category")
        const existingCategory=await Category.findOne({name})
        if(existingCategory) return res.status(401).json("category already exists")

        const cat= new Category({name})
        cat.save()
            .then(()=>res.status(201).json("new category added"))
            .catch(()=>res.status(404).json("category NOT added"))

    }catch(err){
        //console.log(err)
        res.status(500).json("error in category")
    }
}    

export const categoryController=async(req,res)=>{
    try{
    //get All CATEGORIES
    const categories=await Category.find()
    res.status(200).json({mess:"categories found",categories})

    }catch(err){
        res.status(500).json(err)
    }
}

export const singleCategory=async(req,res)=>{
    try{
        const {id}=req.params
        const cat=await Category.findOne({name:id})
        if(!cat) return res.status(404).json("category not found")
        res.status(200).json({mess:"category found",cat})
        
    }catch(err){
        res.status(500).json(err)
    }
}