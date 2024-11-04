export interface Product {
    id?: string;
    image: string;
    name: string;
    amount: number;
    price: number;
    branch: string;
    star: number;
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    currentProduct: Product | null;
    errors: { [key: string]: string };
}

export interface RootStateProduct {
    product: ProductState;
}

export interface FormProps {
    productToEdit?: Product | null;
    onFormSubmit: (product: Product) => void;
}
