import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types/product.types';

const initialProductState: ProductState = {
    products: [],
    loading: false,
    error: null,
    currentProduct: null,
    errors: {},
};

const productSlice = createSlice({
    name: 'products',
    initialState: initialProductState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
        },
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchProductsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
            state.currentProduct = action.payload;
        },
        setProductErrors: (state, action: PayloadAction<{ [key: string]: string }>) => {
            state.errors = action.payload;
        },
        resetProductState: (state) => {
            state.currentProduct = null;
            state.errors = {};
        },
        deleteProductSuccess: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProductSuccess: (state, action: PayloadAction<Product>) => {
            state.products = state.products.map(product =>
                product.id === action.payload.id ? action.payload : product
            );
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    deleteProductSuccess,
    updateProductSuccess,
    setCurrentProduct,
    setProductErrors,
    resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
