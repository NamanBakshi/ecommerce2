import  Layout  from "../components/Layout/Layout"
import {useState,useEffect} from "react"
import axios from "axios"
import {Checkbox,Radio} from "antd" //ant design library
import 'antd/dist/reset.css';
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";

const HomePage=()=>{
    const [products,setProducts]=useState([])
    const [categories,setCategories]=useState([])
    const [checked,setChecked]=useState([])
    const [radio,setRadio]=useState([])
    const [cart,setCart]=useCart()

    const getAllCategory=async()=>{
        try{
            const {data}=await axios.get(`/api/category/getcategory`)
            if(data) setCategories(data?.categories)
        }catch(err){
            //console.log(err)
        }
    }

    useEffect(()=>{
        getAllCategory()}
    ,[])

    const getAllProducts=async(req,res)=>{
        try{
            const {data}=await axios.get(`/api/products/getproducts`)
            setProducts(data.AllProducts)
        }catch(err){
            res.status(500).json(err)
            //console.log(err)
        }
    }

    const handleFilter=(value,id)=>{
        let all=[...checked]
        if(value){
            all.push(id)
        }else{
            all=all.filter(f => f !== id)
        }
        setChecked(all)
    }

    useEffect(()=>{
        if(!checked.length || !radio.length) getAllProducts()}
    ,[checked.length,radio.length])

    useEffect(()=>{
        if(checked.length || radio.length) filterProducts()}
    ,[checked,radio])

    const filterProducts=async(req,res)=>{
        try{
            const {data}=await axios.post(`/api/products/productsfilter`,{checked,radio})
            setProducts(data?.AllProducts)
        }catch(err){
            //console.log(err)
        }
    }

    return(
        <Layout>
            {/* {JSON.stringify(radio,null,4)} */}
            <div className="row mt-3">
                <div className="col-md-2">
                    <h4 className="text-center">filter by category</h4>
                    <div className="d-flex flex-column mx-3 mb-4"> 
                    {categories?.map(c=>(
                        <Checkbox key={c._id} onChange={e => handleFilter(e.target.checked,c._id)}> {c.name} </Checkbox>
                        //e.target.checked is used only with checkbox input type. and it returns "chekcbox"
                        //if box is ticked
                    ))}
                    </div>
                    <h4 className="text-center ">filter by price</h4>
                    <div className="d-flex flex-column mx-3"> 
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                           {Prices.map(p=>(
                            <div key={p._id}>
                             <Radio value={p.array}>{p.name}</Radio>
                             </div>
                           ))} 
                        </Radio.Group>
                    </div>
                
                <div className="d-flex flex-column mx-3 my-3"> 
                        <button className="btn btn-secondary" onClick={()=>window.location.reload()}>Reset filters</button>
                    </div>
                 </div>   
                <div className="col-md-10">
                    <h1 className="text-center">ALL Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p)=>(
                             <div className="card m-2" style={{width:"18rem"}} key={p._id}>
                                <img src={`/api/products/productphoto/${p._id}`}
                                className="card=img-top"
                                alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text">${p.price}</p>
                                    
                                    <button className="btn btn-secondary ms-6" 
                                    onClick={()=> {
                                        setCart([...cart,p])
                                        toast.success("Item Added to cart successfully")
                                        }}>Add to Cart</button>
                                </div>
                                </div>   
                            
                        ))}
                    </div>
                </div>
            </div>
            
        </Layout>
    )
}

export default HomePage