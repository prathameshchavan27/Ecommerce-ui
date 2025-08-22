import React, { useState } from 'react';
import {  useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import cartService from '../api/cart';
import { useNavigate } from 'react-router-dom';

// IMPORTANT: Replace with your actual Stripe publishable key
// This key can be found in your Stripe Dashboard.


const CheckoutPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
    const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        // Show Stripe API error to the user
        setError(error.message);
      } else {
        // Send the payment method ID to your backend using the cartService
        const response = await cartService.cartCheckout(paymentMethod.id);
        
        // Axios successfully returned a 2xx status code. The data is in `response.data`.
        console.log('Payment successful!', response.data);
        alert('Payment successful!');
        navigate('/products');
        // Redirect to a confirmation page
        // window.location.href = `/order-confirmation/${response.data.order.id}`;
      }
    } catch (e) {
      // Axios will throw an error for any non-2xx status code
      // and for network errors.
      const errorMessage = e.response?.data?.error || e.message || 'An unexpected error occurred.';
      setError(errorMessage);
      console.error('Checkout failed:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Complete Your Payment</h2>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
          Credit or debit card
        </label>
        <div style={{ border: '1px solid #ccc', padding: '10px 12px', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
          <CardElement />
        </div>
      </div>
      {error && <div style={{ color: '#a00', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || loading}
        style={{ padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutPage;

