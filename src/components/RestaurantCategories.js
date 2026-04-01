import { useState } from "react";
import RestaurantCategoryItems from "./RestaurantCategoryItems";

const RestaurantCategories = ({listItems,showitems,setShowindex})=>{
   
    //const[arrow,setArrow]=useState("👆")
    const handleClick=()=>{
        setShowindex(); 
     //   arrow=="👇"?setArrow("👆"):setArrow("👇");
        
        
    }
    return(
        <>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4" onClick={handleClick}>
                <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <h1 className="text-lg font-bold text-gray-800">{ listItems?.card?.card?.title}</h1>
                    <span className={`text-2xl transition-transform duration-300 ${showitems ? 'rotate-180' : ''}`}>▼</span>
                </div>
             
                <div className={`overflow-hidden transition-all duration-300 ${showitems ? 'max-h-96' : 'max-h-0'}`}>
                    {showitems && (
                        <div className="border-t border-gray-200 bg-gray-50 p-4">
                            <RestaurantCategoryItems listItem={listItems} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default RestaurantCategories;