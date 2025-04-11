'use client';

import { useState, useEffect } from 'react';
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import EventCard from '../events/eventInfo/eventCard';

export default function Schedule() {
  const [viewMode, setViewMode] = useState('weekly'); // State to toggle between weekly and monthly views
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track the selected date
  const [events, setEvents] = useState([]); // State to store event data
  const [trucks, setTrucks] = useState([]); // State to store truck data

  // Fetch events data
  useEffect(() => {
    fetch('/events.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Fetch trucks data
  useEffect(() => {
    fetch('/trucks.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => setTrucks(data))
      .catch((error) => console.error('Error fetching trucks:', error));
  }, []);

  // Render weekly schedule
   const renderWeeklySchedule = () => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Start of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
  
    const eventsThisWeek = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  
    if (eventsThisWeek.length === 0) {
      return <p className="text-center text-gray-500">No events scheduled for this week.</p>;
    }
  
    return (
      <div className="space-y-6 mt-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div
            key={day}
            className={`day-column border rounded-lg p-3 ${
              eventsThisWeek.some((event) => new Date(event.date).getDay() === index)
                ? 'bg-yellow-100' // Add yellow background if the day has events
                : ''
            }`}
          >
            <h3 className="font-bold mb-2">{day}</h3>
            <div className="space-y-2">
              {eventsThisWeek
                .filter((event) => new Date(event.date).getDay() === index)
                .map((event) => (
                  <EventCard key={event.id} event={event} trucks={trucks} />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render monthly schedule
  const renderMonthlySchedule = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const eventsThisMonth = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    const dayPilotEvents = eventsThisMonth.map((event) => ({
      id: event.id,
      text: event.name,
      start: event.date,
      end: event.date,
      data: event,
    }));

    return (
      <div className="mt-6">
        <DayPilotMonth
          startDate={`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`}
          events={dayPilotEvents}
          onEventClick={(args) => {
            const clickedEvent = events.find((event) => event.id === args.e.data.id);
            alert(`Event: ${clickedEvent.name}\nLocation: ${clickedEvent.location}`);
          }}
          onBeforeEventRender={(args) => {
            const event = args.data.data;
            args.html = `
              <div class="custom-event-card">
                <h3 class="font-bold">${event.name}</h3>
                <p class="text-sm">${event.time}</p>
                <p class="text-xs text-gray-500">${event.location}</p>
              </div>
            `;
            args.cssClass = "custom-event";
          }}
          eventHeight={70}
          cellHeight={150}
          headerHeight={30}
          showWeekend={true}
        />
      </div>
    );
  };

  return (
    <div className="data-card">
      <div className="form-header flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Schedule</h2>
          <p className="text-primary-medium">
            {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
          </p>
        </div>
        <div className="view-toggle flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setViewMode('weekly')}
          >
            Weekly View
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setViewMode('monthly')}
          >
            Monthly View
          </button>
        </div>
      </div>

      {viewMode === 'weekly' ? renderWeeklySchedule() : renderMonthlySchedule()}
    </div>
  );
}