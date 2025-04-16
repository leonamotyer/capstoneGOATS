"use client";
import './globals.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [events, setEvents] = useState([]);
  const [timeOffRequests, setTimeOffRequests] = useState([]);

  // Fetch upcoming events
  useEffect(() => {
    fetch('/events.json')
      .then((response) => response.json())
      .then((data) => {
        const upcomingEvents = data.filter((event) => new Date(event.date) >= new Date());
        setEvents(upcomingEvents.slice(0, 5)); // Show only the next 3 events
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Fetch time-off requests
  useEffect(() => {
    fetch('/timeOffRequests.json') // Replace with the actual path to your time-off requests data
      .then((response) => response.json())
      .then((data) => {
        const upcomingRequests = data.filter((request) => new Date(request.startDate) >= new Date());
        setTimeOffRequests(upcomingRequests.slice(0, 3)); // Show only the next 3 requests
      })
      .catch((error) => console.error('Error fetching time-off requests:', error));
  }, []);

  const links = [
    { name: "Schedule", href: "/schedule", icon: "📅" },
    { name: "Calendar", href: "/calendar", icon: "🗓️" },
    { name: "Employees", href: "/employees", icon: "👥" },
    { name: "Events", href: "/events", icon: "🎉" },
    { name: "Time-Off", href: "/requests", icon: "🌴" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <main className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-dark">
          YYC Food Trucks
        </h1>
        <p className="text-xl mb-8 text-primary-light">
          Employee scheduling and management system
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="bg-secondary-dark text-primary-dark p-4 rounded-lg border-2 border-primary-medium
                        transition-all duration-300 hover:bg-primary-medium hover:text-white 
                        hover:shadow-lg flex flex-col items-center"
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="text-3xl mb-2">{link.icon}</span>
              <span className="text-xl font-semibold">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Upcoming Events Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Upcoming Events</h2>
          <div className="grid gap-4">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming events.</p>
            )}
          </div>
        </section>

        {/* Time-Off Requests Section */}
        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Time-Off Requests</h2>
          <div className="grid gap-4">
            {timeOffRequests.length > 0 ? (
              timeOffRequests.map((request, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{request.employeeName}</h3>
                  <p><strong>Start Date:</strong> {request.startDate}</p>
                  <p><strong>End Date:</strong> {request.endDate}</p>
                  <p><strong>Reason:</strong> {request.reason}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming time-off requests.</p>
            )}
          </div>
        </section>
      </main>

      
    </div>
  );
}