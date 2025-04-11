'use client';

import React, { useState } from 'react';

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    role: '',
    email: '',
    phone: '',
    wage: '',
    isAvailable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Created:', formData);
    // Add logic to save the employee data (e.g., POST request to an API)
  };

  return (
    <div className="create-employee-page">
      <h1 className="form-header">Create Employee</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="input-group">
          <label htmlFor="name" className="input-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="address" className="input-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="role" className="input-label">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Driver">Driver</option>
            <option value="Server">Server</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="email" className="input-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone" className="input-label">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="wage" className="input-label">Wage</label>
          <input
            type="number"
            id="wage"
            name="wage"
            value={formData.wage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="isAvailable" className="input-label">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            Is Available
          </label>
        </div>

        <button type="submit" className="button">Create Employee</button>
      </form>
    </div>
  );
}