import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { branches } from '../../constants';
import { Product } from '../../types/product.types';
import axios from 'axios';
interface FormProps {
    productToEdit?: Product;
    onFormSubmit: (product: Product) => void;
}

export const Form: React.FC<FormProps> = ({ productToEdit, onFormSubmit }) => {
    const [branch, setBranch] = useState('Specials');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [formData, setFormData] = useState<Product>({
        image: '',
        name: '',
        amount: 0,
        price: 0,
        branch
    });

    useEffect(() => {
        if (productToEdit) {
            setFormData(productToEdit);
            setBranch(productToEdit.branch);
            setAmount(String(productToEdit.amount));
            setPrice(String(productToEdit.price));
            setImageUrl(productToEdit.image);
        }
    }, [productToEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleBranchChange = (value: string) => {
        setBranch(value);
        setFormData(prev => ({ ...prev, branch: value }));
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = Number(value);
        if (numericValue >= 1) {
            setAmount(value);
            setFormData(prev => ({ ...prev, amount: numericValue }));
        } else {
            setAmount('');
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPrice(value);
        setFormData(prev => ({ ...prev, price: Number(value) }));
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setImageUrl(value);
        setFormData(prev => ({ ...prev, image: value }));
    };

    const handleAddOrEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            ...formData,
            branch,
            amount: Number(amount),
            price: Number(price),
            image: imageUrl
        };

        try {
            if (productToEdit) {
                await axios.put(`http://localhost:8000/products/${productToEdit.id}`, productData);
            } else {
                await axios.post('http://localhost:8000/products', productData);
            }

            onFormSubmit(productData);

            setFormData({ image: '', name: '', amount: 0, price: 0, branch: 'Specials' });
            setBranch('Specials');
            setAmount('');
            setPrice('');
            setImageUrl('');
        } catch (error) {
            console.error('Error adding or updating product:', error);
        }
    };

    return (
            <form
                className="flex flex-col gap-3 bg-bg w-full h-auto p-9 rounded-3xl border-2 border-secondary"
                onSubmit={handleAddOrEdit}
            >
                <div className="flex gap-4">
                    <div className="flex-1 mt-5">
                        <InputField
                            type="text"
                            placeholder="Paste image URL here"
                            value={imageUrl}
                            onChange={handleUrlChange}
                            id='image'
                            label='Image URL'
                            classNamePrefix='mb-5'
                        />
                        <InputField
                            type="text"
                            placeholder="Enter your Name"
                            id="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            classNamePrefix='mb-5'
                        />
                        <SelectField
                            id="branch"
                            label="Branch"
                            placeholder="Select Branch"
                            value={branch}
                            onChanges={handleBranchChange}
                            options={branches}
                        />
                    </div>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-1/2 h-auto rounded-lg"
                        />
                    )}
                </div>

                <InputField
                    type="number"
                    placeholder="Enter amount"
                    id="amount"
                    label="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <InputField
                    type="number"
                    placeholder="Enter price"
                    id="price"
                    label="Price"
                    value={price}
                    onChange={handlePriceChange}
                    isPriceField={true}
                />

                <button type="submit" className="mt-2 bg-secondary text-white py-2 rounded-xl">
                    {productToEdit ? 'Update' : 'Create'}
                </button>
            </form>
    );
};
