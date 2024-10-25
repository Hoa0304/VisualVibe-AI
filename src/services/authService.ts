import axios from 'axios';
import { User } from '../types/auth.types';
import { handleError } from '../helpers/apiHelpers';
import { API_URL } from '../constants';


export const signUpUser = async (formData: User) => {
    try {
        const response = await axios.post(`${API_URL}users`, formData);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const signInUser = async (email: string) => {
    try {
        const response = await axios.get(`${API_URL}users?email=${email}`);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};
