import { useSelector } from "react-redux";


const Cart = ()=>{
    const cartItem = useSelector((store)=> store.cart.items);
    console.log("items in cart",cartItem);
    
    const total = cartItem.reduce((sum, item) => sum + (item?.card?.info?.price || 0) / 100, 0).toFixed(2);
    
    return(
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-2xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">🛒 Your Cart</h1>
                    <p className="text-gray-600">{cartItem.length} item{cartItem.length !== 1 ? 's' : ''} in cart</p>
                </div>
        
                {cartItem.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-6xl mb-4">🛒</p>
                        <p className="text-gray-500 text-xl font-semibold">Your cart is empty</p>
                        <p className="text-gray-400 mt-2">Add some delicious items to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="space-y-2">
                                {cartItem.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 last:border-b-0">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 text-base">{item?.card?.info?.name}</h3>
                                            <p className="text-gray-600 text-sm mt-1">Qty: 1</p>
                                        </div>
                                        <p className="text-orange-600 font-bold text-lg ml-4">₹{(item?.card?.info?.price/100).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-gray-200">
                                <span className="text-lg font-bold text-gray-800">Subtotal:</span>
                                <span className="text-2xl font-bold text-orange-600">₹{total}</span>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                                    Continue Ordering
                                </button>
                                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Cart;