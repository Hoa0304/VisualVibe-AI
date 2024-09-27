import { Link, useNavigate } from 'react-router-dom';
import girlImage from '../assets/images/girl.png';
import { AiOutlineMail } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { MdPersonOutline } from 'react-icons/md';
import { useState } from 'react';
import { User } from '../types/auth.types';
import { toast } from 'react-toastify';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<User>({
        userName: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
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
            const res = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message || "An error occurred.");
                setLoading(false);
                return;
            }

            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                toast.error("Sign up failed!");
                return;
            }
            navigate('/');
        } catch (error: unknown) {
            setLoading(false);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-between min-h-screen">
            <div className="hidden lg:block">
                <img src={girlImage} alt="Sign up" className="h-[800px] object-cover" style={{ marginLeft: '-40px', marginTop: '-20px' }} />
            </div>
            <div className="w-full md:w-1/3 p-5 mr-56">
                <h1 className="font-poppins text-left font-normal my-7 text-white" style={{ fontSize: '30px' }}>Sign up</h1>
                <p className="text-left text-primary font-poppins font-light text-base mb-4">If you already have an account register</p>
                <p className="text-left text-primary font-poppins font-light text-base mb-8">
                    You can <Link to="/" className="text-secondary font-medium">Login here!</Link>
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        placeholder="Enter your email address"
                        id="email"
                        icon={<AiOutlineMail />}
                        label="Email"
                        onChange={handleInputChange}
                    />
                    <InputField
                        type="text"
                        placeholder="Enter your User name"
                        id="userName"
                        icon={<MdPersonOutline size={20} />}
                        label="Username"
                        onChange={handleInputChange}
                    />
                    <InputField
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your Password"
                        id="password"
                        icon={<FiLock />}
                        label="Password"
                        showPassword={showPassword}
                        toggleShowPassword={() => setShowPassword(prev => !prev)}
                        onChange={handleInputChange}
                    />
                    <InputField
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your Password"
                        id="confirm"
                        icon={<FiLock />}
                        label="Confirm Password"
                        showPassword={showConfirmPassword}
                        toggleShowPassword={() => setShowConfirmPassword(prev => !prev)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button className='bg-secondary h-12 rounded-custom' disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
