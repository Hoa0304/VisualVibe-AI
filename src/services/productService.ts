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
