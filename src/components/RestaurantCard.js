import { Link } from "react-router-dom";
import { CARD_IMAGE_URL } from "../../utils/urls";
import { Link } from "react-router-dom";
const Restaurantcard=(props)=>{
  const {restaurantdata}=props;
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRatingString,
    sla
  }=restaurantdata?.info
  return(
    <div className="card mt-5 mr-8 w-52 " >
      
     <img className="card-image rounded-lg" src={CARD_IMAGE_URL+cloudinaryImageId} alt="card image"/>

      <div className="card-content">
        <h3><b>{name}</b></h3>
        <h5 >{avgRatingString}⭐</h5>
        <h5 >{sla.deliveryTime} minutes</h5>
        <h5>{cuisines.join(",")}</h5>

      </div>
    </div>
  )
}
export const usePromoteRestaurantCard = (RestaurantCard) =>{
  return (props) => {
    return(
      <div>
      <label className="absolute rounded-lg p-2  text-white bg-green-600">
          Veg
      </label>
      <RestaurantCard {...props}/>
      </div>
    )
  }
}
export default Restaurantcard;