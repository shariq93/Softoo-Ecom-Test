import {Product} from '../../types/ProductType';
import {
  GET_PRODUCTS,
  GET_SINGLE_PRODUCTS,
  SET_PRODUCTS_RESPONSE,
  SET_SINGLE_PRODUCT_RESPONSE,
} from '../actions/ProductActions';

// Define the state interface
export interface ProductState {
  isLoading: boolean;
  loadingSingle: boolean;
  products: Product[];
  product: Product;
}

// Define the initial state
const initialProductState: ProductState = {
  isLoading: false,
  loadingSingle: false,
  products: [],
  product: {name: '', colour: '', price: 0, img: '', qty: 0, id: 0},
};

// Define the ProductReducer
const ProductReducer = (
  state = initialProductState,
  action: any,
): ProductState => {
  switch (action.type) {
    case GET_PRODUCTS:
      // Set isLoading to true when fetching products
      return {...state, isLoading: true};
    case GET_SINGLE_PRODUCTS:
      // Set loadingSingle to true when fetching a single product
      return {...state, loadingSingle: true};
    case SET_PRODUCTS_RESPONSE:
      // Set isLoading to false and update products when products are fetched
      return {...state, isLoading: false, products: action.payload};
    case SET_SINGLE_PRODUCT_RESPONSE:
      // Set loadingSingle to false and update the single product
      return {...state, loadingSingle: false, product: action.payload};
    default:
      return state;
  }
};

export default ProductReducer;
