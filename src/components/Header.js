import { useContext, useState } from "react";
import { LOGO_URL } from "../../utils/urls";
import { Link } from "react-router-dom";
import useStatus from "../../utils/useStatus";
import UserContext from "../../utils/UserContext.js";
import { useSelector } from "react-redux";
const Header= ()=>{
    const[toggle,setToggle]=useState("login");
    
  const status = useStatus();
  const {username} = useContext(UserContext)
  const cartItem = useSelector((store)=> store.cart.items)  
  console.log("cartItem",cartItem);     
  return(
    <div className="header flex flex-wrap items-center justify-between px-4 py-2 md:px-8 bg-white shadow-sm">
        <div className="app-logo flex-shrink-0">
          <img className="logo h-10 w-auto" src={LOGO_URL} alt="logo"/>
        </div>
        <div className="w-full md:w-auto">
          <ul className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-5 mt-2 md:mt-0">
         
                
              <li className="px-5">
                Status : {status ? "online":"offline"}
              </li>
                <li className="px-5">
                Username : {username}
              </li>
        
              <li className="px-5"> <Link className="link" to="/">Home</Link></li>
              <li className="px-5">
                <Link  className="link" to="/about">About US</Link>
                
              </li>
              <li className="px-5">
               <Link className="link"  to="/contact">Contact US</Link>
              </li>
              <li className="px-5">
                <Link className="link" to="/cart">Cart {cartItem.length}</Link>
              </li>
              <li className="px-5">
                <img className="profile w-10" src="https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg" alt="profile"/>
              </li>
              <li  className="px-5">  <button  onClick={()=>{
                return(
                    toggle=="login"?setToggle("logout"):setToggle("login")
                )
              }}>
                {toggle}
              </button>

              </li>
             
          </ul>

        </div>
    </div>
  )
}
export default Header;