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
 
    const[searchtext,setSearchtext]=useState("");
    
    const PromoteRestaurantCard=usePromoteRestaurantCard(Restaurantcard);
    
    console.log("body");
    const{username,setName}= useContext(UserContext);
    useEffect( ()=>{
        console.log("useeffect")
        
       fetchdata();
    },[])
    async function fetchdata(){
          const api = await fetch(RESTAURANT_LIST_URL);
          console.log(api);
          const Json = await api.json();
          console.log(Json);
          setListofRestaurant(Json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
          setFilterlist(Json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
          
        } 
   
   if(listofRestaurant.length===0){
       return(
        
        <ShimmerUi/>
      
       )
   }
  return(
    <div className="p-8 ">
      <div className="search flex items-center justify-center gap-x-1 ">
       
          <input className="h-7 border-2" type="text" value={searchtext} onChange={(e)=>{
                  
                setSearchtext(e.target.value);
            
          }}></input>
     
          <div>
            <input className="h-7 border-2" type="text" value={username} onChange={(e)=>{
                  
                setName(e.target.value);
            
          }}></input>
          </div>
        <div className="search-icon-container w-6 ">
          <button className="image-btn cursor-pointer " onClick={
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
      
     
     
      
      <div className="card-container flex flex-wrap gap-y-3" >
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
