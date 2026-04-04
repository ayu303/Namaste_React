import { CARD_IMAGE_URL } from "../../utils/urls";
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
    <div className="card mt-5 mr-0 sm:mr-8 w-full sm:w-64 md:w-56 lg:w-72" >
      
     <img className="card-image rounded-lg h-40 object-cover w-full" src={CARD_IMAGE_URL+cloudinaryImageId} alt="card image"/>

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