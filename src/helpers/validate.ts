import { User } from "../types/auth.types";

export type ValidationType = 'signIn' | 'signUp';

export const validateAuth = (formData: User, type: ValidationType, confirmPassword?: string): string[] => {
    const errors: string[] = [];

    if (type === 'signUp' && !formData.userName) {
        errors.push('Username is required');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        errors.push('Email is invalid');
    }
    if (!formData.password || formData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (type === 'signUp' && formData.password !== confirmPassword) {
        errors.push("Passwords do not match");
    }

    return errors;
};
