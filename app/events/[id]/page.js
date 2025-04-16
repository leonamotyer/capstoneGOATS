'use client';
import '../../globals.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventDetailsPage() {
  const { id } = useParams();
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
    <div className="event-details-page">
      <button
        className="button"
                onClick={() => router.back()}
      >
        &larr; Back
      </button>

      <div className="event-detail-card">
        <h1 className="event-detail-title">{event.name}</h1>
        <div className="event-detail-info-container">
          <p className="event-detail-info">
            <span className="info-label">Date:</span> {event.date}
          </p>
          <p className="event-detail-info">
            <span className="info-label">Location:</span> {event.location}
          </p>
          <p className="event-detail-info">
            <span className="info-label">Time:</span> {event.time}
          </p>
          <p className="event-detail-info">
            <span className="info-label">Required Servers:</span> {event.requiredServers}
          </p>
          <p className="event-detail-info">
            <span className="info-label">Contact:</span> {event.contact?.name} (
            <a
              href={`mailto:${event.contact?.email}`}
              className="info-link"
            >
              {event.contact?.email}
            </a>
            , {event.contact?.phone})
          </p>
        </div>
      </div>

      <div className="assigned-section">
        <h2 className="assigned-section-title">Trucks Assigned</h2>
        <div className="assigned-grid">
          {event.trucks.map((truck) => (
            <div
              key={truck.id}
              className="truck-card"
            >
              <h3 className="truck-title">{truck.name}</h3>
              <p className="truck-info">
                <span className="truck-info-label">Type:</span> {truck.type}
              </p>
              <p className="truck-info">
                <span className="truck-info-label">Capacity:</span> {truck.capacity}
              </p>
              <p className="truck-info">
                <span className="truck-info-label">Status:</span>{' '}
                <span
                  className={truck.status === 'Available' ? 'status-available' : 'status-unavailable'}
                >
                  {truck.status}
                </span>
              </p>
              {truck.driver && (
                <p className="truck-info">
                  <span className="truck-info-label">Driver:</span> {truck.driver.name} (
                  <a
                    href={`mailto:${truck.driver.email}`}
                    className="info-link"
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