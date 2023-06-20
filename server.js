import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoutes.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import path from "path"
import {fileURLToPath} from "url"

dotenv.config()

connectDB()

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const app=express();

app.use(cors())
app.use(express.json()) // instead of body-parser NOW this is used i.e. request and response happens in JSON FORMAT
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,"./client/build")));

app.use("/api/auth",authRoute)
app.use("/api/category",categoryRoutes)
app.use("/api/products",productRoutes)

// app.get("/",(req,res)=>{
//     res.send("welcome to my ecommerce app")
// })

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT=process.env.PORT || 8080

app.listen(PORT,()=>{
   // console.log(`listening to port ${process.env.PORT}`)
})