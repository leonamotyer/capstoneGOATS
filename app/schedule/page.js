'use client'
import { useAuth } from '../../Auth/auth-context'
import { FiClock, FiMapPin } from 'react-icons/fi'

export default function Schedule() {
  return (
    <div className="data-card">
      <div className="form-header">
        <h2 className="text-2xl font-bold">Weekly Schedule</h2>
        <p className="text-primary-medium">November 12-18, 2024</p>
      </div>

      <div className="grid grid-cols-7 gap-4 mt-6">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="day-column border rounded-lg p-3">
            <h3 className="font-bold mb-2">{day}</h3>
            <div className="space-y-2">
              <div className="shift-card">
                <div className="flex items-center gap-2 text-sm">
                  <FiClock className="text-primary-medium" />
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <FiMapPin className="text-primary-medium" />
                  <span>Downtown Core</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <span className="badge bg-secondary-dark">Driver: John D.</span>
                  <span className="badge bg-secondary-dark">Staff: 3</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}