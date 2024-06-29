import Layout from "../components/Layout/Layout"
import { useCart } from "../context/Cart"
import { useEffect, useState } from "react"
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"
//import { redirect } from "react-router-dom";

export const CartPage = ()=>{
    const [cart,setCart]=useCart()
    const [auth]=useAuth()
    const [cost,setCost]=useState(0)
    const navigate=useNavigate()

    const deleteItem=(id)=>{
        let newcart=cart.filter(it => it._id !== id)
        setCart(newcart)
    }

    useEffect(()=>{
        let newcost=0;
        cart.forEach(it => {
            newcost=newcost + it.price
        })
        setCost(newcost)
    },[cart])
    
    return(
        <Layout>
            <div className="row">
                <h1>Total Cost : ${cost}</h1>
                {auth?.token ?
                (<button className="btn btn-secondary" onClick={()=>navigate("/")}>
                    continue shopping
                </button>) :
                 (<button className="btn btn-danger" onClick={()=>navigate("/login",{state:"/cart"})}>
                 login to checkout
             </button>)
                }
                <div className="row">
                <div className="d-flex flex-wrap">
                        {cart?.map((p)=>(
                             <div className="card m-2" style={{width:"18rem"}} key={p._id}>
                                <img src={`/api/products/productphoto/${p._id}`}
                                className="card=img-top"
                                alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text">${p.price}</p>
                                    
                                    <button className="btn btn-danger ms-6" 
                                    onClick={()=> 
                                        //setCart([...cart,p])
                                        deleteItem(p._id)
                                        }>Remove</button>
                                </div>
                                </div>   
                            
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )

}