import Layout from "../../components/Layout/Layout"
import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"

const Register=()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const navigate=useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault() //to avoid default refresh behaviour
        try{
          const res=await axios.post(`/api/auth/register`,
          {name,email,password,phone})
          //console.log(res)
          if(res.status===201){
            // toast.success("Registered Successfully")
            navigate("/login")
            toast.success("Registered Successfully")
          }else toast.error("Registeration UnSuccessful")
        }catch(e){
          //console.log(e)
        }
    }
    
    return(
        <Layout>
          <div style={{backgroundColor:"#e6e6e6",height:"78vh",margin:"-25px 0px"}} >
            <div className="register bg-light" >
                
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">
      Name
    </label>
    <input
      type="text"
      value={name} //isse state ,input box se bind hogyi hai
      onChange={(e)=>setName(e.target.value)}
      className="form-control"
      id="exampleInputName"
      required
    />
  </div>
    
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


  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">
      Phone
    </label>
    <input
      type="text"
      onChange={(e)=>setPhone(e.target.value)}
      value={phone}
      className="form-control"
      id="exampleInputPhone"
      required
    />
  </div>
 
  <div>
  <button type="submit" className="btn" style={{backgroundColor:"black" ,margin:"0px 0px 0px 60px"}}>
    <span style={{color:"white"}}>Submit</span>
  </button>
  </div>

</form>
</div> 
</div>  
        </Layout>
    )
}

export default Register