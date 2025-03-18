"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4ff', // Light blue background
    color: '#ff69b4', // Pink text
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  orderDetails: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  backButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#ff69b4', // Pink background
    color: '#ffffff', // White text
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the order ID from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch order details from an API or database
      fetch(`/api/orders/${id}`)
        .then((response) => response.json())
        .then((data) => setOrder(data))
        .catch((error) => console.error('Error fetching order:', error));
    }
  }, [id]);

  const goBack = () => {
    router.back(); // Navigate back to the previous page
  };

  if (!order) {
    return <div style={style.container}>Loading...</div>;
  }

  return (
    <div style={style.container}>
      <h1 style={style.heading}>Order Details</h1>
      <div style={style.orderDetails}>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Items:</strong> {order.items.join(', ')}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
      </div>
      <button style={style.backButton} onClick={goBack}>Back to Orders</button>
    </div>
  );
}