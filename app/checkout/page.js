"use client";
import { useState } from 'react';
import CheckoutForm from '../../components/CheckoutForm';
import { useRouter } from 'next/navigation';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa', // Light background for checkout
    color: '#343a40', // Dark text color
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#ff69b4', // Pink color for heading
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#007bff', // Blue color for message
  },
};

export default function CheckoutPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter();

  const handleCheckout = async (formData) => {
    // Call your API to process the payment with Square
    const response = await fetch('/api/square/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setOrderDetails(data);
      // Redirect or show confirmation
      router.push(`/order/${data.orderId}`);
    } else {
      // Handle error
      console.error('Checkout failed:', response.statusText);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Checkout</h1>
      <p style={styles.message}>Please fill in your payment details below:</p>
      <CheckoutForm onCheckout={handleCheckout} />
      {orderDetails && <p>Order ID: {orderDetails.orderId}</p>}
    </div>
  );
}