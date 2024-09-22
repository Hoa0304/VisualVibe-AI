import React from 'react';
import { ButtonProps } from '../types/button.types';

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    bgColor = '#C10C99',
    textColor = 'white',
    width = 'auto',
    height = 'auto',
    borderRadius = '20px'
}) => {
    return (
        <button
            className="text-uppercase font-poppins font-medium text-base hover:opacity-95 mt-5 transition duration-200"
            style={{
                backgroundColor: bgColor,
                color: textColor,
                width: width,
                height: height,
                borderRadius: borderRadius,
                transition: 'transform 0.2s',
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(0.9)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            {children}
        </button>
    );
};

export default Button;
