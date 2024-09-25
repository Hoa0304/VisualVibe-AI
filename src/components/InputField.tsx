import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputFieldProps } from '../types/formInput.types';

const InputField: React.FC<InputFieldProps> = React.memo(({
    type,
    placeholder,
    id,
    icon,
    label,
    showPassword,
    toggleShowPassword
}) => {
    return (
        <div className="relative">
            <span className="absolute left-2 top-3 text-white">{icon}</span>
            <label className="absolute -top-4 font-poppins text-primary text-tiny font-light text-sm">{label}</label>
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                placeholder={placeholder}
                id={id}
                style={{ color: '#C10C99', fontFamily: 'poppins', fontSize: '15px' }}
                className="bg-transparent border-b-2 border-primary p-2 pl-10 w-full focus:outline-none focus:border-[#C10C99] mb-4 placeholder-primary font-light"
            />
            {type === 'password' && (
                <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={toggleShowPassword}
                >
                    {showPassword ? <AiFillEyeInvisible color="white" /> : <AiFillEye color="white" />}
                </span>
            )}
        </div>
    );
});

export default InputField;
