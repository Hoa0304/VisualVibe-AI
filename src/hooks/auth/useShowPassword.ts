import { useState, useCallback } from 'react';

export const useShowPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const toggleShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);
    
    return { showPassword, toggleShowPassword };
};
