
import ProductReducer from './ProductReducer'
import CartReducer from './CartReducer'
import MenuReducer from './MenuReducer'
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { FetchProductsEpic, FetchSingleProductsEpic } from '../epics/ProductEpics';



// rootReducer combines different reducers to form the application's state tree.
// Each reducer manages a specific slice of the state.
const rootReducer = combineReducers({
  products: ProductReducer, // Manages the state related to products
  cart: CartReducer,       // Manages the state related to the shopping cart
  menu: MenuReducer        // Manages the state related to the application menu
});

// rootEpic combines different epics to form the root epic for managing async actions.
// Epics are used in conjunction with Redux Observable for handling side effects.
export const rootEpic = combineEpics(
  FetchProductsEpic,FetchSingleProductsEpic
  // Add your epics here for managing async actions
);

// Export the rootReducer as the default export of this module.
// This will be used in the Redux store configuration.
export default rootReducer;