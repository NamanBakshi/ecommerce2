import express from "express";
import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js"
import { createCategoryController,categoryController,singleCategory } from "../controllers/categoryController.js";

const router=express.Router()

router.post("/createcategory",requireSignIn,isAdmin,createCategoryController)
router.get("/getcategory",categoryController)
router.get("/singlecategory/:id",singleCategory)

export default router