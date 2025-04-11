'use client'

import React from 'react';

// TruckCard component with two display modes: compact and detailed
export default function TruckCard({ truck, viewMode }) {
  return (
    <div
      className={`truck-card ${
        viewMode === 'compact' ? 'p-2 text-sm' : 'p-4 text-base'
      } border rounded-lg shadow-md`}
    >
      <h3 className={`font-bold ${viewMode === 'compact' ? 'text-sm' : 'text-xl'} mb-2`}>
        {truck.name}
      </h3>
      {viewMode === 'detailed' && (
        <>
          <p className="text-primary-medium mb-2">Type: {truck.type}</p>
          <p className="text-primary-medium mb-2">Capacity: {truck.capacity} items</p>
          <p className="text-primary-medium mb-2">Location: {truck.location}</p>
        </>
      )}
      <div className="mt-2">
        <span
          className={`badge ${
            truck.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {truck.status}
        </span>
      </div>
    </div>
  );
}

// Example usage of TruckCard
export function TruckList({ trucks, viewMode }) {
  return (
    <div
      className={`truck-list ${
        viewMode === 'compact'
          ? 'grid grid-cols-7 gap-2'
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      }`}
    >
      {trucks.map((truck) => (
        <TruckCard key={truck.id} truck={truck} viewMode={viewMode} />
      ))}
    </div>
  );
}

// Example data for testing
const exampleTrucks = [
  { id: 1, name: 'Neon', type: 'Food Truck', capacity: 500, location: 'Downtown Core', status: 'Available' },
  { id: 2, name: 'Lemonade', type: 'Beverage Truck', capacity: 300, location: 'City Park', status: 'In Use' },
  { id: 3, name: 'Cookie Dough', type: 'Dessert Truck', capacity: 400, location: 'Mall Area', status: 'Available' },
];

