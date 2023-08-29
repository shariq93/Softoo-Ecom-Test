import {Product} from '../../types/ProductType';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_SINGLE_PRODUCTS = 'GET_SINGLE_PRODUCTS';
export const SET_PRODUCTS_RESPONSE = 'SET_PRODUCTS_RESPONSE';
export const SET_SINGLE_PRODUCT_RESPONSE = 'SET_SINGLE_PRODUCT_RESPONSE';

export const getProducts = () => ({
  type: GET_PRODUCTS,
});
export const getSingleProduct = (id: Number) => ({
  type: GET_SINGLE_PRODUCTS,
  payload: id,
});

export const setProductsResponse = (products: Product[]) => ({
  type: SET_PRODUCTS_RESPONSE,
  payload: products,
});
export const setSingleProductResponse = (product: Product | undefined) => ({
  type: SET_SINGLE_PRODUCT_RESPONSE,
  payload: product,
});
