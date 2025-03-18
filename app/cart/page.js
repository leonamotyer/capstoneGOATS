// filepath: rollin-in-dough/rollin-in-dough/app/cart/page.js
"use client";
import { useState } from 'react';
import CartItem from '../../components/CartItem';
import { useRouter } from 'next/navigation';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa', // Light background
    color: '#343a40', // Dark text
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#ff69b4', // Pink color
  },
  cartList: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    listStyle: 'none',
  },
  total: {
    marginTop: '2rem',
    fontSize: '1.5rem',
    color: '#007bff', // Blue color
  },
  checkoutButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff', // Blue background
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([]); // Replace with actual cart data
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout'); // Navigate to checkout page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Cart</h1>
      <ul style={styles.cartList}>
        {cartItems.length === 0 ? (
          <li>Your cart is empty.</li>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </ul>
      <div style={styles.total}>
        Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </div>
      <button style={styles.checkoutButton} onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}