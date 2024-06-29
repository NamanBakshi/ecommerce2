import Layout from "../../components/Layout/Layout"
import { useState } from "react"
import axios from "axios"
import {useNavigate,useLocation} from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../context/auth"

const Login=()=>{
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth()
    
    const navigate=useNavigate()
    const location=useLocation()

    const handleSubmit=async (e)=>{
        e.preventDefault() //to avoid default refresh behaviour
        try{
          const res=await axios.post(`/api/auth/login`,
          {email,password})
          //console.log(res)
          if(res.status===200){
            // toast.success("Registered Successfully")
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data)) /*auth=key,2nd value=value*/ 
            navigate(location.state || "/")
            // if(auth.user !== null)
            // navigate(-1)
            toast.success("Login Successfull")
          }else toast.error("Login UnSuccessfull")
        }catch(e){
          //console.log(e)
        }
    }
    return(
        <Layout>
          <div style={{backgroundColor:"#e6e6e6",height:"78vh",margin:"-25px 0px"}} >
            <div className="register bg-light" >
                
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
  
    
<div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">
      Email
    </label>
    <input
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="form-control"
      id="exampleInputEmail"
      required
    />
  </div> 
 </div>    

<div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword" className="form-label">
      Password
    </label>
    <input
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="form-control"
      id="exampleInputPassword"
      required
    />
  </div>
</div>

  <div>
  <button type="submit" className="btn" style={{backgroundColor:"black" ,margin:"0px 0px 0px 60px"}}>
    <span style={{color:"white"}}>Login</span>
  </button>
  </div>
</form>
</div> 
</div>  
        </Layout>
    )
}

export default Login