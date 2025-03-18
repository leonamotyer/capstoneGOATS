import React from 'react';

const CookieCard = ({ cookie, onAddToCart }) => {
  return (
    <div className="bg-pink-200 border border-blue-500 rounded-lg p-4 m-2 shadow-lg">
      <img src={cookie.image} alt={cookie.name} className="w-full h-32 object-cover rounded-md" />
      <h2 className="text-xl font-bold text-blue-800">{cookie.name}</h2>
      <p className="text-blue-600">{cookie.description}</p>
      <p className="text-lg font-semibold text-blue-800">${cookie.price.toFixed(2)}</p>
      <button 
        onClick={() => onAddToCart(cookie)} 
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CookieCard;