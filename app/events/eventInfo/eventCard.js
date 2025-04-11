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
    <div className="event-card border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
      <p className="text-primary-medium mb-2">Date: {event.date}</p>
      <p className="text-primary-medium mb-2">Location: {event.location}</p>
      <p className="text-primary-medium mb-2">Time: {event.time}</p>

      <div className="mt-6">
        <h4 className="font-bold mb-2">Available Employees:</h4>
        <button
          className="px-4 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Select Employees
        </button>

        {modalOpen && (
          <div
            className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            style={{ display: modalOpen ? 'flex' : 'none' }}
          >
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Select Employees</h3>
              <div className="employee-list max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <label
                      key={employee.id}
                      className="flex items-center gap-2 mb-2 p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={assignedEmployees.some((assigned) => assigned.id === employee.id)}
                        onChange={() => handleEmployeeSelection(employee)}
                        disabled={
                          !assignedEmployees.some((assigned) => assigned.id === employee.id) &&
                          assignedEmployees.length >= event.requiredServers
                        }
                      />
                      <span className="text-sm">
                        {employee.name} ({employee.role})
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500">No employees available.</p>
                )}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
        <div className="assigned-employees mt-6">
          <h4 className="font-bold mb-2">Assigned Employees:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedEmployees.map((employee) => (
              <div
                key={employee.id}
                className="assigned-employee border rounded-lg p-4 shadow-md bg-gray-100"
              >
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