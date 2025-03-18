// filepath: rollin-in-dough/rollin-in-dough/components/CartItem.js
import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleQuantityChange = (e) => {
    onUpdateQuantity(item.id, e.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded"
          min="1"
        />
        <button
          onClick={handleRemove}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;