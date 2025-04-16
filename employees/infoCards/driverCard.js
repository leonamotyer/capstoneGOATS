'use client';

import React from 'react';

export default function DriverCard({ driver }) {
  return (
    <div className="driver-card border rounded-lg p-4 shadow-md bg-gray-100">
      <h3 className="font-bold text-lg mb-2">
        D-{String(driver.id).padStart(5, '0')}: {driver.name}
      </h3>
      <p className="text-sm text-primary-medium">Role: {driver.role}</p>
      <p className="text-sm text-primary-medium">Email: {driver.email}</p>
      <p className="text-sm text-primary-medium">Phone: {driver.phone}</p>
      <p className="text-sm text-primary-medium">Wage: ${driver.wage}/hr</p>
      <p
        className={`text-sm font-bold ${
          driver.isAvailable ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {driver.isAvailable ? 'Available' : 'Not Available'}
      </p>
    </div>
  );
}