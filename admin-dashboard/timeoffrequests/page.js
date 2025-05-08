'use client'

import { useState } from 'react'
import { FaCheck, FaTimes, FaTrash, FaFileExport } from 'react-icons/fa'

const initialRequests = [
  {
    id: 1,
    name: 'Kirsten Dalton',
    date: '2025-04-10',
    reason: 'Doctor appointment',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Jed Carroll',
    date: '2025-04-12',
    reason: 'Family trip',
    status: 'Approved',
  },
]

const statusOptions = ['All', 'Pending', 'Approved', 'Denied']

export default function TimeOffRequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = requests.filter(req =>
    req.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'All' || req.status === statusFilter)
  )

  const updateStatus = (id, newStatus) => {
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
    )
  }

  const handleDelete = (id) => {
    setRequests(prev => prev.filter(req => req.id !== id))
  }

  const exportToCSV = () => {
    if (!requests.length) return
    const headers = Object.keys(requests[0]).filter(h => h !== 'id')
    const rows = requests.map(r => headers.map(h => `"${r[h]}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'time_off_requests.csv'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-green-700">Time-Off Requests</h1>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {statusOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <button
              onClick={exportToCSV}
              className="bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-200 transition"
            >
              <FaFileExport />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100 text-left font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(req => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{req.name}</td>
                  <td className="px-4 py-2">{req.date}</td>
                  <td className="px-4 py-2">{req.reason}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                        : req.status === 'Approved' ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => updateStatus(req.id, 'Approved')}
                      className="text-green-600 hover:text-green-700"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, 'Denied')}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
