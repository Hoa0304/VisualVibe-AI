import React, { useState } from 'react';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import { Product } from '../types/product.types';
import ProductList from '../components/product/ProductList';
import SearchSection from '../components/dashboard/SearchSection';
import { useProducts } from '../hooks/product/useProducts';
import FormOverlay from '../components/header/FormOverlay';

const Dashboard: React.FC = () => {
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const { products, loading, error, updateProduct } = useProducts();
  const [selectedView, setSelectedView] = useState<string>('Home');

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setIsFormVisible(true);
  };

  return (
    <div className="flex flex-col h-screen ml-20 mr-20">
      <Header />
      <div className="flex flex-1 mt-3">
        <Sidebar setSelectedView={handleViewChange} />
        <main className="flex-1 p-4 relative w-[80%]">
          {selectedView === 'Home' && (
            <>
              <SearchSection />
              {loading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="flex overflow-x-auto space-x-5">
                  {products.map((product) => (
                    <div key={product.id} className="border-none p-6 bg-component rounded-3xl shadow w-[170px] h-[200px] flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-[125px] object-cover rounded-lg" />
                      <h3 className="mt-3 font-poppins text-primary bg-transparent truncate w-full text-base">{product.name}</h3>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {selectedView === 'Product' && (
            <>
              <ProductList products={products} onEdit={handleEditClick} />
            </>
          )}

          {isFormVisible && productToEdit && (
            <FormOverlay
              onClose={() => setIsFormVisible(false)}
              onFormSubmit={(updatedProduct) => {
                updateProduct(updatedProduct);
                setProductToEdit(undefined);
                setIsFormVisible(false);
              }}
              productToEdit={productToEdit}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
