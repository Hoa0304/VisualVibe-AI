import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, RootStateProduct } from '../../types/product.types';
import {
    setCurrentProduct,
    setProductErrors,
    resetProductState
} from '../../states/productSlice';
import { validateProduct } from '../../helpers/validate';

const useProductState = (productToEdit: Product | null) => {
    const dispatch = useDispatch();
    const { currentProduct, errors } = useSelector((state: RootStateProduct) => state.product);

    useEffect(() => {
        if (productToEdit) {
            dispatch(setCurrentProduct(productToEdit));
            dispatch(setProductErrors({}));
        } else {
            dispatch(resetProductState());
        }
    }, [productToEdit, dispatch]);

    const validate = () => {
        const newErrors = validateProduct(
            currentProduct || { image: '', name: '', amount: 0, price: 0, branch: '', star: 1 },
            currentProduct?.image || '',
            String(currentProduct?.amount || ''),
            String(currentProduct?.price || '')
        );

        dispatch(setProductErrors(newErrors));
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (id: keyof Product, value: string) => {
        if (currentProduct) {
            const updatedProduct = { ...currentProduct, [id]: value };
            dispatch(setCurrentProduct(updatedProduct));
            dispatch(setProductErrors({ ...errors, [id]: '' }));
        }
    };

    const handleBranchChange = (value: string) => {
        handleInputChange('branch', value);
    };

    const handleAmountChange = (value: string) => {
        const numericValue = Number(value);
        if (numericValue >= 1) {
            handleInputChange('amount', numericValue.toString());
        }
    };

    const handlePriceChange = (value: string) => {
        const numericValue = Number(value);
        if (numericValue > 0) {
            handleInputChange('price', numericValue.toString());
        }
    };

    const handleUrlChange = (value: string) => {
        handleInputChange('image', value);
    };

    const handleStarChange = (value: number) => {
        if (currentProduct) {
            const updatedProduct = { ...currentProduct, star: value };
            dispatch(setCurrentProduct(updatedProduct));
        }
    };

    const resetForm = () => {
        dispatch(resetProductState());
    };

    return {
        currentProduct,
        errors,
        validate,
        handleInputChange,
        handleBranchChange,
        handleAmountChange,
        handlePriceChange,
        handleUrlChange,
        handleStarChange,
        resetForm
    };
};

export default useProductState;
