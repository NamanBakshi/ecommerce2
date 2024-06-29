import { useState,useEffect, useContext, createContext } from "react";
//import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(()=>{
    const data=localStorage.getItem('auth')
    if(data){
      const authData = JSON.parse(data)
      setAuth({
        user: authData.user,
        token: authData.token,
        });   
    }
  },[])

  return(
    <AuthContext.Provider value={[auth,setAuth]}>
       {/* //by value prop we'll be able to use auth and setauth globally */}
        {children}
    </AuthContext.Provider>
  )
}

//custom hook
const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider}