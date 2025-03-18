"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CookieCard from '../../components/CookieCard';
import { getCookies } from '../../data/cookies';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa', // Light background
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#ff69b4', // Pink color
  },
  orderDetails: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '1rem',
    border: '1px solid #007bff', // Blue border
    borderRadius: '8px',
    backgroundColor: '#ffffff', // White background for order details
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff', // Blue button
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default function OrderPage() {
  const [cookies, setCookies] = useState(getCookies());
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout'); // Navigate to checkout page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Order</h1>
      <div style={styles.orderDetails}>
        {cookies.map((cookie) => (
          <CookieCard key={cookie.id} cookie={cookie} />
        ))}
      </div>
      <button style={styles.button} onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}