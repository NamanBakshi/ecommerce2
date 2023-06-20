import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { addProductController, deleteProductController, getProductController, getSingleProductController, photoController, productfiltercontroller, updateProductController } from "../controllers/productController.js"
import formidable from "express-formidable"
// formidable= Node.js module for parsing form data

const router=express.Router()

router.post("/addproduct",requireSignIn,isAdmin,formidable(),addProductController)
router.put("/updateproduct/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
router.get("/getproducts",getProductController)
router.get("/getsingleproduct/:id",getSingleProductController)
router.get("/productphoto/:pid",photoController)
router.delete("/deleteproduct/:pid",deleteProductController)

router.post("/productsfilter",productfiltercontroller)


export default router