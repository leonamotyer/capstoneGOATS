'use client'
import { useState } from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'

export default function TimeOff() {
  const [showModal, setShowModal] = useState(false)
  const [requests, setRequests] = useState([
    { date: '2024-11-13', type: 'Sick Leave', duration: 'Full Day', status: 'Approved', reason: 'Flu' },
    { date: '2024-11-15', type: 'Personal', duration: 'Half Day (AM)', status: 'Pending', reason: 'Errand' },
  ])

  const [formData, setFormData] = useState({
    date: '',
    type: 'Vacation',
    duration: 'Full Day',
    reason: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRequest = { ...formData, status: 'Pending' }
    setRequests([...requests, newRequest])
    setFormData({ date: '', type: 'Vacation', duration: 'Full Day', reason: '' })
    setShowModal(false)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Time-Off Requests</h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          onClick={() => setShowModal(true)}
        >
          + Request Time-Off
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reason</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="p-3 flex items-center gap-2">
                  <FiCalendar className="text-primary-medium" />
                  {item.date}
                </td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.duration}</td>
                <td className="p-3">
                  <span className={`badge ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-600' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Request Time-Off</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Date</label>
                <input
                  type="date"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Type of Leave</label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option>Vacation</option>
                  <option>Sick Leave</option>
                  <option>Personal</option>
                  <option>Emergency</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Duration</label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                >
                  <option>Full Day</option>
                  <option>Half Day (AM)</option>
                  <option>Half Day (PM)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Reason</label>
                <textarea
                  rows={3}
                  className="w-full border p-2 rounded"
                  placeholder="Optional"
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
