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
    <div className="header flex items-center justify-between">
        <div className="app-logo w-30">
          <img className="logo" src={LOGO_URL} alt="logo"/>
        </div>
        <div className=" ">
          <ul className="flex ">
         
                
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