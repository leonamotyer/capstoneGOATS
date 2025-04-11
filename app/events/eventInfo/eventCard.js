'use client';

import React, { useState } from 'react';

export default function EventCard({ event, trucks, employees }) {
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmployeeSelection = (employee) => {
    if (assignedEmployees.some((assigned) => assigned.id === employee.id)) {
      setAssignedEmployees(assignedEmployees.filter((assigned) => assigned.id !== employee.id));
    } else if (assignedEmployees.length < event.requiredServers) {
      setAssignedEmployees([...assignedEmployees, employee]);
    }
  };

  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '0.5rem', 
      padding: '1rem', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
      backgroundColor: 'white',
      marginBottom: '1rem'
    }}>
      <a href={`/events/${event.id}`} style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem', 
        display: 'block',
        color: '#006400', /* Dark green from globals.css */
        textDecoration: 'none'
      }}>
        {event.name}
      </a>
      <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>Date: {event.date}</p>
      <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>Location: {event.location}</p>
      <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>Time: {event.time}</p>

      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#228b22' }}>Required Servers: {event.requiredServers}</h4>
        <button
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: '#228b22', /* Medium green from globals.css */
            color: 'white',
            cursor: 'pointer'
          }}
          onClick={() => setModalOpen(true)}
        >
          Select Employees
        </button>

        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              width: '24rem'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: '#006400' /* Dark green */
              }}>
                Select Employees
              </h3>
              <div style={{
                maxHeight: '15rem',
                overflowY: 'auto',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.75rem'
              }}>
                {employees && employees.length > 0 ? (
                  employees.map((employee) => (
                    <label
                      key={employee.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: assignedEmployees.some((assigned) => assigned.id === employee.id) ? '#f5f5dc' : 'transparent'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={assignedEmployees.some((assigned) => assigned.id === employee.id)}
                        onChange={() => handleEmployeeSelection(employee)}
                        disabled={
                          !assignedEmployees.some((assigned) => assigned.id === employee.id) &&
                          assignedEmployees.length >= event.requiredServers
                        }
                        style={{ accentColor: '#228b22' }}
                      />
                      <span style={{ fontSize: '0.875rem' }}>
                        {employee.name} ({employee.role})
                      </span>
                    </label>
                  ))
                ) : (
                  <p style={{ color: '#6b7280' }}>No employees available.</p>
                )}
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#228b22', /* Medium green */
                    color: 'white',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setModalOpen(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {assignedEmployees.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            color: '#228b22' /* Medium green */
          }}>
            Assigned Employees:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {assignedEmployees.map((employee) => (
              <div
                key={employee.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#f5f5dc' /* Secondary light from globals.css */
                }}
              >
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 'bold',
                  color: '#006400' /* Dark green */
                }}>
                  {employee.name}
                </h3>
                <p style={{ color: '#2e8b57' /* Primary light green */ }}>Role: {employee.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}