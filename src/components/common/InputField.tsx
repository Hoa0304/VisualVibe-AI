import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputFieldProps } from '../../types/formInput.types';
import '../../App.css'

const InputField: React.FC<InputFieldProps> = React.memo(({
    type,
    placeholder,
    id,
    icon,
    label,
    showPassword,
    toggleShowPassword,
    onChange,
    classNamePrefix,
    value,
    isPriceField
}) => {
    return (
        <div className={`relative ${classNamePrefix}`}>
            {icon && (
                <span className="absolute left-2 top-3 text-white">
                    {icon}
                </span>
            )}
            <label className="absolute -top-4 font-poppins text-primary text-tiny font-light text-sm">{label}</label>
            {isPriceField && <span className="absolute right-2 top-1 text-white">$</span>}
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                placeholder={placeholder}
                id={id}
                onChange={onChange}
                autoComplete="off"
                value={value}
                style={{ color: '#C10C99', fontFamily: 'poppins', fontSize: '15px' }}
                className={`bg-transparent border-b-2 border-primary p-2 ${icon ? 'pl-10' : 'pl-2'} w-full focus:outline-none focus:border-[#C10C99] mb-4 placeholder-primary font-light ${isPriceField ? 'no-spin' : ''}`}
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
