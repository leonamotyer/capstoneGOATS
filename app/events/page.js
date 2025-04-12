'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Events() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  // Fetch events from events.json
  useEffect(() => {
    fetch('/events.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="events-page">
      <h2 className="text-2xl text-primary-dark mb-4">Event Management</h2>
      <div className="event-list grid gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Required Servers:</strong> {event.requiredServers}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={event.status === 'Scheduled' ? 'text-green-500' : 'text-red-500'}>
                  {event.status}
                </span>
              </p>
              <button
                className="button mt-2"
                onClick={() => router.push(`/events/${event.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>

      {/* Create Event Button */}
      <div className="mt-6">
        <button
          className="button bg-primary-medium text-white w-full py-2 rounded-lg hover:bg-primary-dark"
          onClick={() => router.push('/events/newEvent')}
        >
          + Create Event
        </button>
      </div>
    </div>
  );
}