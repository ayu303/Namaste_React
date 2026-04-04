import Restaurantcard,{PromoteRestaurantCard, usePromoteRestaurantCard} from "./RestaurantCard";
import restaurantList from "../../utils/mocklist";
import { useState,useEffect, use, useContext } from "react";
import { SEARCH_ICON_URL } from "../../utils/urls";
import ShimmerUi from "./ShimmeerUi";
import { Link } from "react-router-dom";
import { RESTAURANT_LIST_URL } from "../../utils/urls";
import UserContext from "../../utils/UserContext";

const Body= ()=>{
    const [listofRestaurant,setListofRestaurant]=useState([]);
    const [filterlist,setFilterlist]=useState([]);
    const [error,setError]=useState(null);
 
    const[searchtext,setSearchtext]=useState("");
    
    const PromoteRestaurantCard=usePromoteRestaurantCard(Restaurantcard);
    
    console.log("body");
    const{username,setName}= useContext(UserContext);
    useEffect( ()=>{
        console.log("useeffect")
        
       fetchdata();
    },[])
    async function fetchdata(){
      try {
          const api = await fetch(RESTAURANT_LIST_URL);
          if (!api.ok) {
            throw new Error(`Restaurant API failed: ${api.status} ${api.statusText}`);
          }
          const Json = await api.json();
          console.log(Json);
          const restaurants = Json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          if (!restaurants) {
            throw new Error("Restaurant API returned unexpected data shape.");
          }
          setListofRestaurant(restaurants);
          setFilterlist(restaurants);
      } catch (err) {
          console.error(err);
          setError(err.message || "Failed to load restaurants.");
      }
    } 
   
   if (error) {
     return (
       <div className="p-4 text-center text-red-600">
         <p>Unable to load restaurants.</p>
         <p>{error}</p>
       </div>
     );
   }

   if(listofRestaurant.length===0){
       return(
        
        <ShimmerUi/>
      
       )
   }
  return(
    <div className="p-4 md:p-8">
      <div className="search flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-4">
          <input className="h-10 border-2 rounded-md px-2 w-full md:w-64" type="text" value={searchtext} onChange={(e)=>{
                setSearchtext(e.target.value);
          }} />
          <input className="h-10 border-2 rounded-md px-2 w-full md:w-64" type="text" value={username} onChange={(e)=>{
                setName(e.target.value);
          }} />
        <div className="search-icon-container w-10">
          <button className="image-btn cursor-pointer" onClick={
            ()=>{
                const searchname = listofRestaurant.filter((res)=>
              (  res.info.name.toLowerCase().includes(searchtext.toLowerCase()))
                   
                )
                setFilterlist(searchname);
                 
            }
          }><img className="search-icon"src={SEARCH_ICON_URL} alt="search"/></button>

        </div>
          <button className="border-2 px-3 rounded-xl  cursor-pointer bg-yellow-400 font-medium text-white ml-10" onClick={()=>{
              const update=listofRestaurant.filter((res)=>
                  (res.info.avgRating>4.5)  
          )
              setFilterlist(update);
        }}>TOP RATED RESTAURANTS</button> 
      </div>
      
     
     
      
      <div className="card-container flex flex-wrap justify-center gap-4" >
        {filterlist.map((restaurant,index)=>{
        return( 
        <Link className="link" key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
          {restaurant.info.veg ? <PromoteRestaurantCard restaurantdata={restaurant}/>:
          <Restaurantcard restaurantdata={restaurant}/>} 
        </Link> )})}
       </div>
       

    </div>
  )
}
export default Body;
