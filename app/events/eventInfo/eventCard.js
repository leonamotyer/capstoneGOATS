'use client'

import React, { useState } from 'react';
import TruckCard from '../../employees/employeeInfo/truckCard';
import EmployeeCard from '../../employees/employeeInfo/serverCard';

const renderEventDetails = (event) => (
  <div className="event-details border rounded-lg p-4 shadow-md bg-gray-100">
    <h3 className="font-bold text-lg mb-2">{event.name}</h3>
    <p className="text-sm text-primary-medium">Date: {event.date}</p>
    <p className="text-sm text-primary-medium">Location: {event.location}</p>
    <p className="text-sm text-primary-medium">Time: {event.time}</p>
    <div className="mt-4">
      <h4 className="font-bold text-md mb-2">Event Contact:</h4>
      <p className="text-sm text-primary-medium">Name: {event.contact.name}</p>
      <p className="text-sm text-primary-medium">Phone: {event.contact.phone}</p>
      <p className="text-sm text-primary-medium">Email: {event.contact.email}</p>
    </div>
    <div className="mt-4">
      <h4 className="font-bold text-md mb-2">Trucks:</h4>
      {event.trucks.map((truck) => (
        <TruckCard key={`T-${String(truck.id).padStart(4, '0')}`} truck={truck} viewMode="compact" />
      ))}
    </div>
    <div className="mt-4">
      <h4 className="font-bold text-md mb-2">Employees:</h4>
      {event.employees && event.employees.map((employee) => {
        if (employee.role === 'Driver') {
          return <DriverCard key={`D-${String(employee.id).padStart(5, '0')}`} driver={employee} />;
        } else if (employee.role === 'Server') {
          return <ServerCard key={`S-${String(employee.id).padStart(5, '0')}`} server={employee} />;
        } else {
          return (
            <div key={`A-${String(employee.id).padStart(5, '0')}`} className="admin-card border rounded-lg p-4 shadow-md bg-gray-100">
              <h3 className="font-bold text-lg mb-2">
                A-{String(employee.id).padStart(5, '0')}: {employee.name}
              </h3>
              <p className="text-sm text-primary-medium">Role: {employee.role}</p>
              <p className="text-sm text-primary-medium">Email: {employee.email}</p>
              <p className="text-sm text-primary-medium">Phone: {employee.phone}</p>
              <p className="text-sm text-primary-medium">Wage: ${employee.wage}/hr</p>
            </div>
          );
        }
      })}
    </div>
  </div>
);


export default function EventCard({ event }) {
  const [selectedTrucks, setSelectedTrucks] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  const handleTruckSelection = (truck) => {
    if (selectedTrucks.some((selected) => selected.id === truck.id)) {
      setSelectedTrucks(selectedTrucks.filter((selected) => selected.id !== truck.id));
    } else {
      setSelectedTrucks([...selectedTrucks, truck]);
    }
  };

  const handleEmployeeAssignment = (employee) => {
    setAssignedEmployees([...assignedEmployees, employee]);
    employee.isAvailable = false; // Mark the employee as unavailable
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

      <div className="mt-6">
        <h4 className="font-bold mb-2">Available Employees:</h4>
        <div className="employee-list grid grid-cols-1 md:grid-cols-2 gap-2">
          {event.employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onAssignToEvent={handleEmployeeAssignment}
            />
          ))}
        </div>
      </div>

      {assignedEmployees.length > 0 && (
        <div className="assigned-employees mt-6">
          <h4 className="font-bold mb-2">Assigned Employees:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedEmployees.map((employee) => (
              <div key={employee.id} className="assigned-employee border rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-bold">{employee.name}</h3>
                <p className="text-primary-medium">Role: {employee.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}