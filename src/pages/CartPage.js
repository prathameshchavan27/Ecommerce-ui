// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cartService from '../api/cart';

const CartPage = () => {
  // --- Dummy Cart Data ---
  // In a real application, you would fetch this from your backend using cartService.getCart()
  // and manage it with a global state (Context API, Redux) or local state that's updated
  // when items are added/removed/quantity changed.
  const [cart, setCart] = useState();

  const [loading, setLoading] = useState(false); // For future API calls
  const [error, setError] = useState(null); // For future API errors
  const [total, setTotal] = useState(0);

  // Calculate subtotal whenever cartItems change
  const navigate = useNavigate();

  // --- Handlers for Quantity Change and Removal ---
  useEffect(()=>{
      const getCart = async () => {
        try {
          const response = await cartService.getCart();
          setCart(response);
          setTotal(parseFloat(response.total_price))
          setLoading(false);
        } catch (error) {
          console.error('Error fetching cart:', error);
          setError('Failed to load cart. Please try again later.');
          setLoading(false);
        }
      }
      getCart();
  },[loading]); 

  const handleClearCart = async () => {
    try{
      const response = await cartService.clearCart();
      alert(response.message)
      setCart();
      setTotal(0);
      setLoading(true);
    } catch (error) {
      setError('Failed to clear cart. Please try again later.');
    }
  }

  const handleProceedToCheckout = () => {
    // --- IMPORTANT: Implement actual Checkout logic here ---
    // In a real app, you'd navigate to a checkout page,
    // or trigger an order creation process.
    if (cart?.items.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }
    const order = cartService.cartCheckout()
    console.log("Proceeding to checkout with items:", cart?.items);
    alert(`Proceeding to checkout! ${order}`);
    navigate('/checkout'); // Example navigation
  };

  // --- Display Loading/Error states (for future API integration) ---
  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center mt-10">
        <h2 className="text-2xl text-gray-700">Loading cart?...</h2>
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

  return (
    <div className="container mx-auto p-6 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Your Shopping Cart</h1>

      {cart?.items.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-8 p-6 bg-white rounded-lg shadow-md">
          <p className="mb-4">Your cart is empty.</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Items in Cart</h2>
            <div className="divide-y divide-gray-200">
              {cart?.items.map((item) => (
                <div key={item.id} className="flex items-center py-4">
                  <Link to={`/products/${item.productId}`} className="flex-shrink-0">
                    <img
                      src={item.image || "https://via.placeholder.com/80x80.png?text=Product"}
                      alt={item.product_title}
                      className="w-20 h-20 object-cover rounded-md mr-4 border border-gray-200"
                    />
                  </Link>
                  <div className="flex-grow">
                    <Link to={`/products/${item.productId}`}>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-150">
                        {item.product_title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm">Price: ${parseFloat(item.price).toFixed(2)}</p>
                    <p className="text-gray-800 font-medium">
                      total: ${total.toFixed(2)}
                    </p>
                    {item.stock === 0 && (
                      <p className="text-red-500 text-sm mt-1">Out of Stock</p>
                    )}
                     {item.stock > 0 && item.quantity > item.stock && (
                      <p className="text-red-500 text-sm mt-1">Quantity exceeds stock! Max: {item.stock}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 ml-auto">
                    <input
                      type="number"
                      min="1"
                      max={item.stock > 0 ? item.stock : 1} // Max 1 if stock is 0 to prevent issues, though disabled
                      value={item.quantity}
                      // onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                      className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      disabled={item.stock === 0} // Disable if out of stock
                    />
                    <button
                    //   onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={handleClearCart}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            <div className="flex justify-between text-lg text-gray-700 mb-3">
              <span>total:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg text-gray-700 mb-6">
              <span>Shipping:</span>
              <span className="font-semibold">Calculated at Checkout</span>
            </div>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              disabled={cart?.items.length === 0}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;