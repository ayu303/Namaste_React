import {lazy,Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header"
import Body from "./components/Body"
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import ShimmerUi from "./components/ShimmeerUi";
import UserContext from "../utils/UserContext.js";
import { Provider } from "react-redux";

import Appstore from "../utils/Appstore.js";

const Applayout = ()=>{

  const[name , setName]= useState();
  useEffect(()=>{
    setName("Piyush")
  },[])
  return(
  <Provider store={Appstore}>
      <UserContext.Provider value={{username : name ,setName}}>
        <div className="">
          <Header/>
          <Outlet/>
        </div>
      </UserContext.Provider>
  </Provider>
  )
}
const Cart=lazy(()=>import("./components/Cart"));
const Approuter = createBrowserRouter(
  [
    {
      path : "/",
      element:<Applayout/>,
      errorElement:<Error/>,
      children:[
        {
          path:"/",
          element:<Body/>
        },
        {
          path:"/about",
          element:<About/>
        },
            {
          path:"/contact",
          element:<Contact/>
        },
             {
          path:"/cart",
          element:<Suspense fallback={<ShimmerUi/>}><Cart/></Suspense>
        },
        {
          path:"/restaurants/:resId",
          element:<RestaurantMenu/>
        }
      ]

    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Approuter} />);
