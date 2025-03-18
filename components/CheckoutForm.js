import { useState } from 'react';
import { useRouter } from 'next/router';
import { processPayment } from '../lib/square'; // Import the payment processing function

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate input fields
    if (!name || !email || !cardNumber || !expiryDate || !cvv) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Call the Square API to process the payment
      await processPayment({ name, email, cardNumber, expiryDate, cvv });
      // Redirect to order confirmation page after successful payment
      router.push('/order');
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-blue-100 rounded shadow-md">
      <h2 className="text-2xl mb-4 text-pink-600">Checkout</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="expiryDate">Expiry Date (MM/YY)</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <button type="submit" className="bg-pink-600 text-white rounded p-2">Pay Now</button>
    </form>
  );
};

export default CheckoutForm;