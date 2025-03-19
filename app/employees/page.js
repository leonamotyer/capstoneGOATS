'use client'
import { useState } from 'react'
import { useAuth } from '../../Auth/auth-context'

export default function Employees() {
  const { user } = useAuth()
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    wage: '',
    availability: [],
    location: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmployees([...employees, { ...formData, id: Date.now() }])
    setFormData({ name: '', wage: '', availability: [], location: '' })
  }

  return (
    <div className="card">
      <h2 className="text-2xl mb-4">Employee Management</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        {/* Add other form fields */}
        <button type="submit" className="button">Add Employee</button>
      </form>

      <div className="mt-6 grid">
        {employees.map(employee => (
          <div key={employee.id} className="card">
            <h3>{employee.name}</h3>
            <p>Wage: ${employee.wage}/hr</p>
            {/* Add other employee details */}
          </div>
        ))}
      </div>
    </div>
  )
}