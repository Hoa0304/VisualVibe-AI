import axios from 'axios';
import { User } from '../types/auth.types';
import { handleError } from '../helpers/apiHelpers';

const API_URL = 'http://localhost:8000/users';

export const signUpUser = async (formData: User) => {
    try {
        const response = await axios.post(API_URL, formData);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const signInUser = async (email: string) => {
    try {
        const response = await axios.get(`${API_URL}?email=${email}`);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};
