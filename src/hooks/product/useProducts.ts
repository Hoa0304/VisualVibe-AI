import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, RootStateProduct } from '../../types/product.types';
import {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    deleteProductSuccess,
    updateProductSuccess
} from '../../states/productSlice';
import { fetchProducts, deleteProduct as deleteProductService } from '../../services/productService';
import { handleError } from '../../helpers/apiHelpers';

export const useProducts = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state: RootStateProduct) => state.product);

    useEffect(() => {
        const loadProducts = async () => {
            dispatch(fetchProductsStart());
            try {
                const fetchedProducts = await fetchProducts();
                dispatch(fetchProductsSuccess(fetchedProducts));
            } catch (error) {
                dispatch(fetchProductsFailure(handleError(error).message));
            }
        };

        loadProducts();
    }, [dispatch]);

    const updateProduct = (updatedProduct: Product) => {
        dispatch(updateProductSuccess(updatedProduct));
    };

    const deleteProduct = async (productId: string) => {
        try {
            await deleteProductService(productId);
            dispatch(deleteProductSuccess(productId));
        } catch (error) {
            dispatch(fetchProductsFailure(handleError(error).message));
        }
    };

    return { products, loading, error, updateProduct, deleteProduct };
};
