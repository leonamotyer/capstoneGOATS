'use client'

import React, { useState } from 'react';
import TruckCard from '../../employees/employeeInfo/truckCard';

export default function EventCard({ event }) {
  const [selectedTrucks, setSelectedTrucks] = useState([]);

  const handleTruckSelection = (truck) => {
    if (selectedTrucks.some((selected) => selected.id === truck.id)) {
      // If the truck is already selected, remove it
      setSelectedTrucks(selectedTrucks.filter((selected) => selected.id !== truck.id));
    } else {
      // Otherwise, add it to the selected trucks
      setSelectedTrucks([...selectedTrucks, truck]);
    }
  };

  return (
    <div className="event-card border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
      <p className="text-primary-medium mb-2">Date: {event.date}</p>
      <p className="text-primary-medium mb-2">Location: {event.location}</p>
      <p className="text-primary-medium mb-2">Time: {event.time}</p>

      <div className="mt-4">
        <h4 className="font-bold mb-2">Available Trucks:</h4>
        <div className="truck-list grid grid-cols-1 md:grid-cols-2 gap-2">
          {event.trucks.map((truck) => (
            <button
              key={truck.id}
              className={`truck-option border rounded-lg p-2 transition-transform transform hover:scale-105 ${
                selectedTrucks.some((selected) => selected.id === truck.id)
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleTruckSelection(truck)}
            >
              <span className="font-bold">{truck.name}</span>
              <p className="text-xs">{truck.type}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedTrucks.length > 0 && (
        <div className="selected-trucks mt-6">
          <h4 className="font-bold mb-2">Selected Trucks:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedTrucks.map((truck) => (
              <TruckCard key={truck.id} truck={truck} viewMode="detailed" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}