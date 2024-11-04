import { useState } from 'react';
import { Product } from '../../types/product.types';

export const useProductForm = (onAddProduct: (product: Product) => void) => {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleFormSubmit = (product: Product) => {
        onAddProduct(product);
        setIsFormVisible(false);
    };

    return {
        isFormVisible,
        handleToggleForm,
        handleFormSubmit,
    };
};
