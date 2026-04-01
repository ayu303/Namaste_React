import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";

const Appstore=configureStore(
    {
        reducer:{
            cart:CartReducer,
        }
    }
)
export default Appstore;