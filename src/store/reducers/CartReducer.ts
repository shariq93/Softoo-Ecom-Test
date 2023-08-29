import {Product} from '../../types/ProductType';
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actions/CartActions';

// Define the cart reducer initial state
export interface CartState {
  cartData: Product[];
}

const initialCartState: CartState = {
  cartData: [],
};

// Define the cart reducer
const cartReducer = (state = initialCartState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        // Call helper function to add to cart
        cartData: addToCart(state.cartData, action.payload),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        // Call helper function to remove from cart
        cartData: removeFromCart(state.cartData, action.payload),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        // Call helper function to increase quantity
        cartData: increaseQuantity(state.cartData, action.payload),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        // Call helper function to decrease quantity
        cartData: decreaseQuantity(state.cartData, action.payload),
      };
    default:
      return state;
  }
};

// Helper functions to modify cartData
const addToCart = (cartData: Product[], product: Product) => {
  const existingProductIndex = cartData.findIndex(
    item => item.id === product.id,
  );

  if (existingProductIndex !== -1) {
    cartData[existingProductIndex].qty += 1;
    return cartData;
  } else {
    return [...cartData, {...product, qty: 1}];
  }
};

const removeFromCart = (cartData: Product[], product: Product) => {
  return cartData.filter(item => item.id !== product.id);
};

const increaseQuantity = (cartData: Product[], product: Product) => {
  const productToUpdateIndex = cartData.findIndex(
    item => item.id === product.id,
  );
  cartData[productToUpdateIndex].qty += 1;
  return cartData;
};

const decreaseQuantity = (cartData: Product[], product: Product) => {
  const productToUpdateIndex = cartData.findIndex(
    item => item.id === product.id,
  );
  cartData[productToUpdateIndex].qty -= 1;

  if (cartData[productToUpdateIndex].qty <= 0) {
    return cartData.filter(item => item.id !== product.id);
  }

  return cartData;
};

export default cartReducer;
