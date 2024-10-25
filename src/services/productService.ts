import axios from 'axios';
import { handleError } from '../helpers/apiHelpers';
import { API_URL } from '../constants';
import { Product } from '../types/product.types';


export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}products`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const addProduct = async (productData: Product): Promise<Product> => {
  try {
    const response = await axios.post(`${API_URL}products`, productData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const editProduct = async (id: string, productData: Product): Promise<Product> => {
  try {
    const response = await axios.put(`${API_URL}products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}products/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};
