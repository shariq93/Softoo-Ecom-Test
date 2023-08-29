import { Menu } from '../types/MenuType';
import { Product } from '../types/ProductType';
import { api } from './apiConfig';

// Fetch list of products
export const fetchProducts = async () => {
  try {

    const response = await api.get('products');

    if (response.status !== 200) {
      throw new Error('Failed to fetch products');
    }

    const products: Product[] = response.data;
    return products;
  } catch (error) {
    throw new Error('An error occurred while fetching products');
  }
};

// Fetch a single product by ID
export const fetchProduct = async (id: string) => {
  try {
    const response = await api.get(`products/${id}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch product');
    }

    const product: Product = response.data;
    return product;
  } catch (error) {
    throw new Error('An error occurred while fetching product');
  }
};

// Fetch menu data
export const fetchMenu = async () => {
  try {
    const response = await api.get(`menu`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch menu');
    }

    const menu: Menu = response.data;
    return menu;
  } catch (error) {
    throw new Error('An error occurred while fetching menu');
  }
};
