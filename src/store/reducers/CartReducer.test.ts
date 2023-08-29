import cartReducer from './CartReducer';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../actions/CartActions';
import {Product} from '../../types/ProductType';
/**
 * This cart reducer test make sure the cart reducer working as expected
 */
describe('Cart reducer test', () => {
  const initialState = {
    cartData: [],
  };

  it('Should vaidate add to cart Action', () => {
    const product: Product = {
      name: 'Sooftoo T Shirt',
      colour: '',
      price: 0,
      img: '',
      qty: 1,
      id: 0,
    };

    const action = addToCart(product);
    const newState = cartReducer(initialState, action);

    expect(newState.cartData).toEqual([product]);
  });

  it('Should vaidate delete cart Action', () => {
    const testProduct: Product = {
      name: 'Sooftoo T Shirt',
      colour: '',
      price: 0,
      img: '',
      qty: 1,
      id: 0,
    };
    const initialStateWithItem = {
      cartData: [testProduct],
    };

    const action = removeFromCart(testProduct);
    const newState = cartReducer(initialStateWithItem, action);

    expect(newState.cartData).toEqual([]);
  });

  it('Should vaidate increase qty Action', () => {
    const testProduct: Product = {
      name: 'Sooftoo T Shirt',
      colour: '',
      price: 0,
      img: '',
      qty: 5,
      id: 0,
    };

    const initialStateWithItem = {
      cartData: [testProduct],
    };

    const action = increaseQuantity(testProduct);
    const newState = cartReducer(initialStateWithItem, action);

    expect(newState.cartData[0].qty).toEqual(6);
  });

  it('Should vaidate  decrese qty Action', () => {
    const testProduct: Product = {
      name: 'Sooftoo T Shirt',
      colour: '',
      price: 0,
      img: '',
      qty: 4,
      id: 0,
    };

    const initialStateWithItem = {
      cartData: [testProduct],
    };

    const action = decreaseQuantity(testProduct);
    const newState = cartReducer(initialStateWithItem, action);

    expect(newState.cartData[0].qty).toEqual(3);
  });
});
