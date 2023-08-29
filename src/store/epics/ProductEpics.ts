import {ofType} from 'redux-observable';

import {mergeMap, map, from, catchError, of} from 'rxjs';
import {
  GET_PRODUCTS,
  GET_SINGLE_PRODUCTS,
  setProductsResponse,
  setSingleProductResponse,
} from '../actions/ProductActions';
import {fetchProduct, fetchProducts} from '../../service/apis';

// Epic for fetching multiple products
export const FetchProductsEpic = action$ =>
  action$.pipe(
    ofType(GET_PRODUCTS), // Listen for GET_PRODUCTS action
    mergeMap(action =>
      from(fetchProducts()).pipe(
        map(response => setProductsResponse(response)), // Dispatch setProductsResponse action with fetched products
        catchError(error => {
          return of(setProductsResponse([])); // Dispatch setProductsResponse action with empty array in case of error
        }),
      ),
    ),
  );

// Epic for fetching a single product
export const FetchSingleProductsEpic = action$ =>
  action$.pipe(
    ofType(GET_SINGLE_PRODUCTS), // Listen for GET_SINGLE_PRODUCTS action
    mergeMap(action =>
      from(fetchProduct(action?.payload)).pipe(
        map(response => setSingleProductResponse(response)), // Dispatch setSingleProductResponse action with fetched single product
        catchError(error => {
          return of(setSingleProductResponse(undefined)); // Dispatch setSingleProductResponse action with undefined in case of error
        }),
      ),
    ),
  );