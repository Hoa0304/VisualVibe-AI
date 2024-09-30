import { useState } from 'react';
import { RootState, User } from '../types/auth.types';
import { signInUser, signUpUser } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess, signOut } from '../redux/userSlice';

export const useSignUpController = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<User>({ userName: '', email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const data = await signUpUser(formData);
            if (data.success === false) {
                toast.error("Sign up failed!");
                return;
            }
            navigate('/');
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        confirmPassword,
        loading,
        handleInputChange,
        setConfirmPassword,
        handleSubmit,
    };
};

export const useSignInController = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signInStart());

        try {
            const data = await signInUser(formData.email);
            if (data.length === 0) {
                dispatch(signInFailure('User not found'));
                return;
            }
            dispatch(signInSuccess(data[0]));
            toast.success("Login successful!");
            navigate('/home');
        } catch (error) {
            dispatch(signInFailure((error as Error).message));
            toast.error("An error occurred. Please try again.");
        } finally {
            dispatch(signInFailure(''));
        }
    };

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
    };
};

export const useSidebarController = () => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signOut());
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    return { handleSignOut };
};
