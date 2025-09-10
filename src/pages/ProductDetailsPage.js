// src/pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import productsService from '../api/product'; 
import cartService from '../api/cart';

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity selector

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsService.getPublicProductById(id);
        console.log(data)
        setProduct(data);
        // Ensure quantity doesn't exceed available stock
        if (data.stock === 0) {
          setQuantity(0); // If out of stock, quantity should be 0
        } else {
          setQuantity(1); // Default to 1 if in stock
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Product not found.');
        } else {
          setError('Failed to load product details.');
        }
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    // Ensure quantity is at least 1 and does not exceed stock
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
      setQuantity(value);
    } else if (value < 1) {
      setQuantity(1); // Don't allow less than 1
    } else if (value > product.stock) {
      setQuantity(product.stock); // Don't allow more than stock
    }
  };

  const handleAddToCart = async() => {
    if (product && quantity > 0 && quantity <= product.stock) {
      console.log(`Adding ${quantity} of "${product.title}" (ID: ${product.id}) to cart.`);
      alert(`Added ${quantity} of "${product.title}" to cart! (This is a placeholder)`);
      const response = await cartService.addCartItem({product_id: id, quantity: quantity})
      console.log(response)
      // Optionally, navigate to cart page or show a success message
    } else if (product && product.stock === 0) {
      alert("This product is currently out of stock.");
    } else {
      alert("Please select a valid quantity.");
    }
  };

  const handleDirectCheckout = async () => {
    try {
      const response = await cartService.directCheckout({product_id: id, quantity: quantity})
      console.log(response);
      alert(`Direct checkout initiated for ${quantity} of "${product.title}"!`,response);
      
    } catch (error) {
      console.error('Direct checkout failed:', error);
      alert('Failed to initiate direct checkout. Please try again later.');
    }
  }

  // --- Loading, Error, Not Found States ---
  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center mt-10">
        <h2 className="text-2xl text-gray-700">Loading product details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center mt-10">
        <h2 className="text-2xl text-red-600">Error: {error}</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Go back to products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-6 text-center mt-10">
        <h2 className="text-2xl text-gray-700">Product not found.</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Go back to products
        </Link>
      </div>
    );
  }

  // --- Product Details Display ---
  return (
    <div className="container mx-auto p-6 pt-10">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-lg shadow-xl">
        {/* Product Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          {/* Placeholder image. Replace with actual product.image_url */}
          <img
            src={product.image_url}
            alt={product.title}
            className="rounded-lg shadow-md w-full max-w-[500px] max-h-[500px] object-contain mx-auto"
          />

        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.title}</h1>
            <p className="text-xl font-semibold text-blue-600 mb-4">${product.price}</p>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description || 'No description available.'}
            </p>

            <div className="mb-6 text-lg">
              <p className="text-gray-800 font-medium">
                Availability:{' '}
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} left)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
              <p className="text-gray-600">Category: {product.category ? product.category.name : 'N/A'}</p>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="flex items-center space-x-4 mt-6">
            <label htmlFor="quantity" className="font-semibold text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
              disabled={product.stock === 0}
              className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || quantity === 0}
              className="
                flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
             <button
              onClick={handleDirectCheckout}
              className="
                flex-grow bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;