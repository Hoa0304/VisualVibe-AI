import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct as deleteProductService } from '../../services/productService'; // Thêm import cho deleteProduct
import { Product } from '../../types/product.types';
import { handleError } from '../../helpers/apiHelpers';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                setError(handleError(error).message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    const deleteProduct = async (productId: string) => {
        try {
            await deleteProductService(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId)); // Cập nhật trạng thái
        } catch (error) {
            setError(handleError(error).message);
        }
    };

    return { products, loading, error, updateProduct, deleteProduct };
};
