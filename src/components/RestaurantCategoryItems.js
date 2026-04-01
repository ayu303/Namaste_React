import { useDispatch } from "react-redux";
import { addItems } from "../../utils/CartSlice";


const RestaurantCategoryItems = ({listItem})=>{
    const dispatch = useDispatch();

    const addClick=(item)=>{
        console.log("item added",item);
        dispatch(addItems(item));
    }
    const itemCard = listItem?.card?.card?.itemCards ;
    return(
        <div className="space-y-3">
            {itemCard?.map((item, idx) =>(
                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200" key={item?.card?.info?.id}>
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-base mb-1">{item?.card?.info?.name}</h3>
                            <p className="text-orange-600 font-semibold text-lg">₹{item?.card?.info?.price/100}</p>
                            {item?.card?.info?.description && (
                                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item?.card?.info?.description}</p>
                            )}
                        </div>
                        <button 
                            onClick={()=>addClick(item)}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg px-4 py-2 cursor-pointer transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
                        >
                            Add+
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )

}
export default RestaurantCategoryItems;