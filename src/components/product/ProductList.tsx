import React from 'react';
import { Product } from '../../types/product.types';
import Button from '../common/Button';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit }) => {
  return (
    <div className="overflow-x-auto font-poppins">
      <table className="min-w-full border border-secondary">
        <thead>
          <tr className="text-primary uppercase text-base">
            <th className="py-3 px-6 text-left font-medium">Image</th>
            <th className="py-3 px-6 text-left font-medium">Name</th>
            <th className="py-3 px-6 text-left font-medium">Branch</th>
            <th className="py-3 px-6 text-left font-medium">Price</th>
            <th className="py-3 px-6 text-left font-medium">Amount</th>
            <th className="py-3 px-6 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-primary text-sm font-light">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="border-none hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-left">{product.branch}</td>
                <td className="py-3 px-6 text-left font-medium">${product.price}</td>
                <td className="py-3 px-6 text-center font-medium">{product.amount}</td>
                <td className="py-3 px-6 text-left">
                  <Button children='Edit' onClick={() => onEdit(product)} className='bg-secondary py-1 px-2 mb-5 rounded' />
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-3 px-6 text-center">Loading products...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
