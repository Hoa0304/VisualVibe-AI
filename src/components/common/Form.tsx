import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { branches, stars } from '../../constants';
import { FormProps } from '../../types/product.types';
import useProductSate from '../../hooks/product/useProductState';
import { addProduct, editProduct } from '../../services/productService';

export const Form: React.FC<FormProps> = ({ productToEdit, onFormSubmit }) => {
    const {
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
    } = useProductSate(productToEdit || null);

    const handleAddOrEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            ...formData,
            branch,
            amount: Number(amount),
            price: Number(price),
            image: imageUrl,
            star: Number(star)
        };

        try {
            if (productToEdit && productToEdit.id !== undefined) {
                await editProduct(productToEdit.id, productData);
            } else {
                await addProduct(productData);
            }
            onFormSubmit(productData);
            resetForm();
        } catch (error) {
            console.error('Error adding or updating product:', error);
        }
    };

    return (
        <form
            className="flex flex-col gap-3 bg-bg w-full h-auto p-9 rounded-3xl border-2 border-secondary"
            onSubmit={handleAddOrEdit}
        >
            <div className="flex gap-2">
                <div className="flex-1 mt-4">
                    <InputField
                        type="text"
                        placeholder="Paste image URL here"
                        value={imageUrl}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        id='image'
                        label='Image URL'
                        classNamePrefix='mb-2'
                    />
                    <InputField
                        type="text"
                        placeholder="Enter your Name"
                        id="name"
                        label="Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        classNamePrefix='mb-2'
                    />
                    <SelectField
                        id="branch"
                        label="Branch"
                        placeholder="Select Branch"
                        value={branch}
                        onChanges={handleBranchChange}
                        options={branches}
                        classNamePrefix='mb-7'
                    />
                    <SelectField
                        id="star"
                        label="Star Rating"
                        placeholder="Select Star Rating"
                        value={String(star)}
                        onChanges={(value) => handleStarChange(Number(value))}
                        options={stars.map(starValue => String(starValue))}
                    />
                </div>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-1/2 h-[100%] rounded-lg"
                    />
                )}
            </div>

            <InputField
                type="number"
                placeholder="Enter amount"
                id="amount"
                label="Amount"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
            />
            <InputField
                type="number"
                placeholder="Enter price"
                id="price"
                label="Price"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                isPriceField={true}
            />

            <button type="submit" className="mt-2 bg-secondary text-white py-2 rounded-xl">
                {productToEdit ? 'Update' : 'Create'}
            </button>
        </form>
    );
};
