import {Product} from '../../types/ProductType';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const addToCart = (product: Product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product: Product) => ({
  type: REMOVE_FROM_CART,
  payload: product,
});

export const increaseQuantity = (product: Product) => ({
  type: INCREASE_QUANTITY,
  payload: product,
});

export const decreaseQuantity = (product: Product) => ({
  type: DECREASE_QUANTITY,
  payload: product,
});
