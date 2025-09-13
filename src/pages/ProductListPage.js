import React, { useEffect, useState } from 'react'
import productsService from '../api/product';
import ProductCard from '../components/ProductCard';
import ProductSearch from '../components/ProductSearch';

export default function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Centralized fetchProducts function
    const fetchProducts = async (params = {}) => {
      try {
        setLoading(true);
        const response = await productsService.getPublicProducts(params);
        // If searching and no products found, set empty array
        if (params.search && (!response.products || response.products.length === 0)) {
          setProducts([]);
          setResults([]);
          setShowDropdown(true);
        } else {
          setProducts(response.products);
          setResults(response.products);
          setShowDropdown(params.search ? true : false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts(); // initial fetch with no params
    }, []);

    useEffect(() => {
      if (query.trim() === '') {
        setShowDropdown(false);
        fetchProducts();
        return;
      }
      const delayDebounce = setTimeout(() => {
        fetchProducts({ search: query });
      }, 400);
      return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
      <div className="container mx-auto p-6"> {/* Center content, add padding */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Our Products
        </h1>
        <div className="flex justify-center mb-8">
          <ProductSearch
            query={query}
            setQuery={setQuery}
            loading={loading}
            results={results}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 justify-items-center">
          {products.length === 0 && !loading ? (
            <div className="col-span-full text-center text-gray-500 text-lg py-10">
              Product not found.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                stock={product.stock}
                category={product.category}
              />
            ))
          )}
        </div>
      </div>
    )
}
