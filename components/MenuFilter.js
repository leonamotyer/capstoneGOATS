import React from 'react';

const MenuFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="menu-filter">
      <h2 className="text-2xl font-bold mb-4">Filter Cookies</h2>
      <ul className="flex flex-col space-y-2">
        {categories.map((category) => (
          <li key={category} className="cursor-pointer">
            <button
              className={`p-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-pink-200 text-black'
              }`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuFilter;