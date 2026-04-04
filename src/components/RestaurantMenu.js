import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShimmerUi from "./ShimmeerUi";
import { RESTAURANT_MENU_URL } from "../../utils/urls";

import RestaurantCategories from "./RestaurantCategories";
const RestaurantMenu = ()=>{
     const {resId} =useParams();
  const [resmenu , setResmenu] = useState(null);
  const [showindex, setShowindex]=useState(null);
  const [error, setError]=useState(null);
 
    useEffect(()=>{
       getRestaurantMenu();
    },[resId])
    
    async function getRestaurantMenu(){
      try {
        const data = await fetch(RESTAURANT_MENU_URL+resId);
        if (!data.ok) {
          throw new Error(`Menu API failed: ${data.status} ${data.statusText}`);
        }
        const json = await data.json();
        console.log(json);
        if (!json?.data) {
          throw new Error("Menu API returned unexpected data shape.");
        }
        setResmenu(json.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load restaurant menu.");
      }
    }
   
    if (error) {
      return (
        <div className="p-4 text-center text-red-600">
          <p>Unable to load restaurant menu.</p>
          <p>{error}</p>
        </div>
      );
    }

    if(resmenu === null){
        return(<ShimmerUi/>)
    }
    const{
        name,
        avgRating,
        costForTwo,
        cuisines,
        locality
        

    }=resmenu?.cards[2]?.card?.card?.info;


    const Category = resmenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>
                c?.card?.card?.["@type"]=== "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    console.log(Category);
   
    return(
        <>
        <div className="text-center ">
            <div className=" w-full md:w-6/12 md:ml-66 text-left ">
            <h1 className="font-extrabold text-2xl" >
                    {name}
            </h1>
            <div className="mt-4 mb-8 border-l border-r border-b p-4 rounded-bl-xl rounded-r-xl h-40 w-auto bg-amber-400/40">
                <div className="border-1 border-yellow-400 shadow-xl rounded-xl text-left h-30 p-2 bg-white">
                  <h3 className="font-bold">⭐ {avgRating}<span >• </span>{costForTwo}
                  </h3>
                   <p  className="font-bold text-yellow-600">
                    {cuisines.join(",")}
                    </p>
                    <p   >
                    <b>Outlet</b>  {locality}
                    </p>
                </div>
   
            </div>
            </div>

            {
           Category.map((c,index)=>(
            <div className=" w-full md:w-6/12 md:ml-66 text-left not-last:border-b-1 mb-4" key={c?.card?.card?.title}>
                
                 <RestaurantCategories listItems={c} 
                 showitems={index===showindex?true:false}
                 setShowindex={()=>setShowindex(index)}/>
             </div>
           )
           )}
            
        </div>
        </>
    )
}
export default RestaurantMenu;