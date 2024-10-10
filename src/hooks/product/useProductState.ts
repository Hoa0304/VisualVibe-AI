import { useEffect, useState } from 'react';
import { Product } from '../../types/product.types';

const useProductSate = (productToEdit: Product | null) => {
    const [formData, setFormData] = useState<Product>({
        image: '',
        name: '',
        amount: 0,
        price: 0,
        branch: 'Computer',
        star: 5
    });

    const [branch, setBranch] = useState('Computer');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [star, setStar] = useState(1);

    useEffect(() => {
        if (productToEdit) {
            setFormData(productToEdit);
            setBranch(productToEdit.branch);
            setAmount(String(productToEdit.amount));
            setPrice(String(productToEdit.price));
            setImageUrl(productToEdit.image);
            setStar(productToEdit.star);
        }
    }, [productToEdit]);

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleBranchChange = (value: string) => {
        setBranch(value);
        setFormData(prev => ({ ...prev, branch: value }));
    };

    const handleAmountChange = (value: string) => {
        const numericValue = Number(value);
        if (numericValue >= 1) {
            setAmount(value);
            setFormData(prev => ({ ...prev, amount: numericValue }));
        } else {
            setAmount('');
        }
    };

    const handlePriceChange = (value: string) => {
        setPrice(value);
        setFormData(prev => ({ ...prev, price: Number(value) }));
    };

    const handleUrlChange = (value: string) => {
        setImageUrl(value);
        setFormData(prev => ({ ...prev, image: value }));
    };

    const handleStarChange = (value: number) => {
        setStar(value);
        setFormData(prev => ({ ...prev, star: value }));
    };

    const resetForm = () => {
        setFormData({ image: '', name: '', amount: 0, price: 0, branch: 'Computer', star: 1 }); // Reset star
        setBranch('Computer');
        setAmount('');
        setPrice('');
        setImageUrl('');
        setStar(5);
    };

    return {
        formData,
        branch,
        amount,
        price,
        imageUrl,
        star,
        handleInputChange,
        handleBranchChange,
        handleAmountChange,
        handlePriceChange,
        handleUrlChange,
        handleStarChange,
        resetForm
    };
};

export default useProductSate;
