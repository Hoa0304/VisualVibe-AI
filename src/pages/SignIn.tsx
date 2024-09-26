import { Link, useNavigate } from 'react-router-dom';
import peopleImage from '../assets/images/people.png';
import { AiOutlineMail } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { useShowPassword } from '../hooks/useShowPassword';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Social from '../components/Social';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/auth.types';
import { signInFailure, signInStart, signInSuccess } from '../redux/userSlice';

const SignIn = () => {
    const [formData, setFormData] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });
    const { loading } = useSelector((state: RootState) => state.user);
    const { showPassword, toggleShowPassword } = useShowPassword();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            dispatch(signInStart());
    
            const res = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (data.success === false) {
                dispatch(signInFailure(data));
                return;
            }
    
            dispatch(signInSuccess(data));
            toast.success("Login successful!");
            navigate('/home'); 
        } catch (error) {
            dispatch(signInFailure((error as Error).message));
            toast.error("An error occurred. Please try again.");
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen p-3">
            <div className="hidden lg:block">
                <img src={peopleImage} alt="Sign In" className="h-[600px] object-cover" />
            </div>
            <div className="w-full md:w-1/3 p-5">
                <h1 className="font-poppins text-left font-semibold my-7 text-white" style={{fontSize: '30px'}}>Sign in</h1>
                <p className="text-left text-primary font-poppins font-light text-base mb-4">If you don’t have an account, register</p>
                <p className="text-left text-primary font-poppins font-light text-base mb-8">
                    You can <Link to="/sign-up" className="text-secondary font-medium">Register here!</Link>
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        placeholder="Email"
                        id="email"
                        icon={<AiOutlineMail />}
                        label="Email"
                        onChange={handleChange}                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        id="password"
                        icon={<FiLock />}
                        label="Password"
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                        onChange={handleChange}                    />
                    <div className="flex justify-between items-center font-poppins font-light text-tiny">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-1" />
                            <span className="text-white">Remember</span>
                        </label>
                        <Link to="/forgot-password" className="text-primary">Forgot Password?</Link>
                    </div>
                    <Button
                        className='bg-secondary h-12 rounded-custom' disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
                </form>
                <div className="text-center my-4 text-tertiary font-poppins text-tiny">
                    <span>or continue with</span>
                </div>
                <Social/>
            </div>
        </div>
    );
};

export default SignIn;
