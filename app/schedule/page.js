'use client'

import { FiClock, FiMapPin } from 'react-icons/fi';
import EventCard from '../events/eventInfo/eventCard';

export default function Schedule() {
  const events = [
    {
      id: 1,
      name: 'Food Festival',
      date: 'November 15, 2024',
      location: 'Downtown Core',
      time: '10:00 AM - 6:00 PM',
      trucks: [
        { id: 1, name: 'Neon', type: 'Food Truck', capacity: 500, location: 'Downtown Core', status: 'Available' },
        { id: 2, name: 'Lemonade', type: 'Beverage Truck', capacity: 300, location: 'City Park', status: 'In Use' },
      ],
    },
    {
      id: 2,
      name: 'Music Concert',
      date: 'November 16, 2024',
      location: 'City Park',
      time: '5:00 PM - 11:00 PM',
      trucks: [
        { id: 3, name: 'Cookie Dough', type: 'Dessert Truck', capacity: 400, location: 'Mall Area', status: 'Available' },
        { id: 4, name: 'Grill Master', type: 'BBQ Truck', capacity: 600, location: 'City Park', status: 'In Use' },
      ],
    },
  ];

  return (
    <div className="data-card">
      <div className="form-header">
        <h2 className="text-2xl font-bold">Weekly Schedule</h2>
        <p className="text-primary-medium">November 12-18, 2024</p>
      </div>

      <div className="grid grid-cols-7 gap-4 mt-6">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <div key={day} className="day-column border rounded-lg p-3">
            <h3 className="font-bold mb-2">{day}</h3>
            <div className="space-y-2">
              {events[index] && (
                <div className="shift-card">
                  <div className="flex items-center gap-2 text-sm">
                    <FiClock className="text-primary-medium" />
                    <span>{events[index].time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FiMapPin className="text-primary-medium" />
                    <span>{events[index].location}</span>
                  </div>
                  <div className="mt-2">
                    <EventCard event={events[index]} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}