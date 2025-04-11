'use client';
import { useState, useEffect } from 'react';

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  // Fetch employees from employee.json
  useEffect(() => {
    fetch('/employee.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div className="employees-page">
      <h2 className="text-2xl mb-4">Employee Management</h2>
      <div className="employee-list grid gap-4">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div key={employee.id} className="employee-card bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p><strong>Role:</strong> {employee.role}</p>
              <p><strong>Address:</strong> {employee.address}</p>
              <p><strong>Email:</strong> <a href={`mailto:${employee.email}`} className="text-blue-500">{employee.email}</a></p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>Wage:</strong> ${employee.wage}/hr</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={employee.isAvailable ? 'text-green-500' : 'text-red-500'}>
                  {employee.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </p>
              <p>
                <strong>Availability:</strong>{' '}
                {employee.availability && employee.availability.length > 0 ? (
                  <span className="text-primary-medium">
                    {employee.availability.join(', ')}
                  </span>
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No employees found.</p>
        )}
      </div>
    </div>
  );
}