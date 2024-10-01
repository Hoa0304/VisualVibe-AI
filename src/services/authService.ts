import { User } from '../types/auth.types';

const API_URL = 'http://localhost:8000/users';

export const signUpUser = async (formData: User) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
    }

    return response.json();
};

export const signInUser = async (email: string) => {
    const response = await fetch(`${API_URL}?email=${email}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
    }

    return response.json();
};
