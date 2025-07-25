import React, { useEffect, useState } from 'react'
import productsService from '../api/product';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await productsService.getPublicProducts();
            console.log(response.products)
            setProducts(response.products);
        }
        fetchProducts();
    },[])
  return (
    <div className="container mx-auto p-6"> {/* Center content, add padding */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Products
      </h1>

      <div className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
        justify-items-center
      ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id} // Important for React list rendering
            title={product.title}
            description={product.description}
            price={product.price}
            stock={product.stock}
            category={product.category}
          />
        ))}
      </div>
    </div>
  )
}
