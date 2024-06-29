import { NavLink,Link } from "react-router-dom"
import { useAuth } from "../../context/auth"
import  toast  from "react-hot-toast"
import { useCart } from "../../context/Cart"

const Header=()=>{
    const [auth,setAuth]=useAuth()
    const [cart]=useCart() //sirf cart ki val needed isliye sirf wohi destructure kia

    const logoutHandle=()=>{
      setAuth({...auth,user:null,token:""})
      toast.success("Logout successful")
      // location("/login",{
      //   state:location.pathname
      // })
      localStorage.removeItem('auth')
      
    }
    
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand">
        Ecommerce
      </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/category" className="nav-link">
            Categories
          </NavLink>
        </li> */}
        {
          !auth.user ?(<>
            <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
          </>) : (
            <>
              <li className="nav-item">
          <Link onClick={logoutHandle} to="/login" className="nav-link">
            {auth.user.name}
          </Link>
        </li>
            </>
          )
        }
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">
            Cart({cart?.length})
          </NavLink>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

        </>
    )
}
export default Header