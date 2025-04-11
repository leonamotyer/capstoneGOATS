'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventDetailsPage() {
  const { id } = useParams(); // Use useParams to get the event ID
  const router = useRouter();
  const [event, setEvent] = useState(null);

  // Fetch event details
  useEffect(() => {
    if (!id) return;

    fetch('/events.json')
      .then((response) => response.json())
      .then((data) => {
        const eventData = data.find((event) => event.id === parseInt(id));
        setEvent(eventData);
      })
      .catch((error) => console.error('Error fetching event:', error));
  }, [id]);

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="event-details-page p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <button
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
        onClick={() => router.back()}
      >
        &larr; Back
      </button>

      <div className="event-card border rounded-lg p-8 shadow-lg bg-white max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6">{event.name}</h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <strong className="font-semibold text-gray-900">Date:</strong> {event.date}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold text-gray-900">Location:</strong> {event.location}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold text-gray-900">Time:</strong> {event.time}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold text-gray-900">Required Servers:</strong> {event.requiredServers}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold text-gray-900">Contact:</strong> {event.contact?.name} (
            <a
              href={`mailto:${event.contact?.email}`}
              className="text-blue-500 hover:underline"
            >
              {event.contact?.email}
            </a>
            , {event.contact?.phone})
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Trucks Assigned</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {event.trucks.map((truck) => (
            <div
              key={truck.id}
              className="truck-card border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-semibold text-blue-600">{truck.name}</h3>
              <p className="text-gray-700">
                <strong>Type:</strong> {truck.type}
              </p>
              <p className="text-gray-700">
                <strong>Capacity:</strong> {truck.capacity}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{' '}
                <span
                  className={`font-semibold ${
                    truck.status === 'Available' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {truck.status}
                </span>
              </p>
              {truck.driver && (
                <p className="text-gray-700">
                  <strong>Driver:</strong> {truck.driver.name} (
                  <a
                    href={`mailto:${truck.driver.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {truck.driver.email}
                  </a>
                  , {truck.driver.phone})
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}