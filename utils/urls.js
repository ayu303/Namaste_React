const PROXY_HOST = typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.hostname}:4000`
  : 'http://localhost:4000';

// Use Vercel API routes in production, local proxy in development
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

export const RESTAURANT_LIST_URL = isProduction
  ? '/api/listRestaurants'
  : `${PROXY_HOST}/api/v1/listRestaurants`;

export const RESTAURANT_MENU_URL = isProduction
  ? '/api/listRestaurantMenu/'
  : `${PROXY_HOST}/api/v1/listRestaurantMenu/`;

export const CARD_IMAGE_URL="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const LOGO_URL="https://png.pngtree.com/png-vector/20221218/ourmid/pngtree-simple-and-modern-food-logo-vector-design-png-image_6527848.png";
export const SEARCH_ICON_URL="https://cdn-icons-png.flaticon.com/128/54/54481.png";
