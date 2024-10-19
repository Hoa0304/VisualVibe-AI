import axios from 'axios';
import { Product } from '../types/product.types';
import { handleError } from '../helpers/apiHelpers';

const BASE_URL = 'http://localhost:8000/products';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const addProduct = async (productData: Product): Promise<Product> => {
  try {
    const response = await axios.post(BASE_URL, productData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const editProduct = async (id: string, productData: Product): Promise<Product> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};
