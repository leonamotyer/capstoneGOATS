'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditEmployeePage() {
  const { edit } = useParams(); // Use "edit" to match the dynamic route
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    role: '',
    email: '',
    phone: '',
    wage: '',
    isAvailable: false,
    availability: [],
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Fetch employee details
  useEffect(() => {
    if (!edit) return;

    fetch('/employee.json') // Adjust the path if necessary
      .then((response) => response.json())
      .then((data) => {
        const employeeData = data.find((emp) => emp.id === parseInt(edit));
        if (employeeData) {
          setFormData({
            name: employeeData.name || '',
            address: employeeData.address || '',
            role: employeeData.role || '',
            email: employeeData.email || '',
            phone: employeeData.phone || '',
            wage: employeeData.wage || '',
            isAvailable: employeeData.isAvailable || false,
            availability: employeeData.availability || [],
          });
        } else {
          console.error('Employee not found');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employee:', error);
        setIsLoading(false);
      });
  }, [edit]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDaySelection = (day) => {
    if (formData.availability.includes(day)) {
      // Remove day if already selected
      setFormData({
        ...formData,
        availability: formData.availability.filter((d) => d !== day),
      });
    } else {
      // Add day if not already selected
      setFormData({
        ...formData,
        availability: [...formData.availability, day],
      });
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all days
      setFormData({
        ...formData,
        availability: [...daysOfWeek],
      });
    } else {
      // Deselect all days
      setFormData({
        ...formData,
        availability: [],
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/employees/${edit}.json`, {
      method: 'PUT', // Use PUT or PATCH based on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Employee updated successfully!');
          router.push('/employees'); // Redirect to the employees list page
        } else {
          alert('Failed to update employee.');
        }
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        alert('An error occurred while updating the employee.');
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading employee details...</p>
      </div>
    );
  }

  return (
    <div className="edit-employee-page">
      <button
        className="button"
        onClick={() => router.back()}
      >
        &larr; Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Role</option>
            <option value="Driver">Driver</option>
            <option value="Server">Server</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Wage */}
        <div>
          <label htmlFor="wage" className="block font-medium">
            Wage
          </label>
          <input
            type="number"
            id="wage"
            name="wage"
            value={formData.wage}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Is Available */}
        <div>
          <label htmlFor="isAvailable" className="block font-medium">
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

        {/* Availability */}
        <div>
          <label className="block font-medium">Availability (Days of the Week)</label>
          <div className="availability-options">
            <label className="availability-label">
              <input
                type="checkbox"
                checked={formData.availability.length === daysOfWeek.length}
                onChange={handleSelectAll}
              />
              Select All
            </label>
            {daysOfWeek.map((day) => (
              <label key={day} className="availability-label">
                <input
                  type="checkbox"
                  checked={formData.availability.includes(day)}
                  onChange={() => handleDaySelection(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="button bg-primary-medium text-white py-2 px-4 rounded-lg hover:bg-primary-dark">
          Save Changes
        </button>
      </form>
    </div>
  );
}