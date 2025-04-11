'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import EventCard from '../events/eventInfo/eventCard';

export default function Schedule() {
  const [viewMode, setViewMode] = useState('weekly'); // State to toggle between weekly and monthly views
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track the selected date
  const [events, setEvents] = useState([]); // State to store event data
  const [trucks, setTrucks] = useState([]); // State to store truck data
  const [employees, setEmployees] = useState([]); // State to store employee data
  const router = useRouter(); // Initialize useRouter

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

  // Fetch employees data
  useEffect(() => {
    fetch('/employee.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => setEmployees(data)) // Correctly update the employees state
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  // Navigate to the previous week or month
  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() - 7); // Go back 7 days
    } else {
      newDate.setMonth(newDate.getMonth() - 1); // Go back 1 month
    }
    setSelectedDate(newDate);
  };

  // Navigate to the next week or month
  const handleNext = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() + 7); // Go forward 7 days
    } else {
      newDate.setMonth(newDate.getMonth() + 1); // Go forward 1 month
    }
    setSelectedDate(newDate);
  };

  // Render weekly schedule
  const renderWeeklySchedule = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the week (Sunday)
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
                  <EventCard key={event.id} event={event} trucks={trucks} employees={employees} />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render monthly schedule
  const renderMonthlySchedule = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

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
            if (clickedEvent) {
              console.log(`Navigating to: /events/${clickedEvent.id}`);
              router.push(`/events/${clickedEvent.id}`);
             }  
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

      <div className="navigation-buttons flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={handlePrevious}
        >
          &larr; Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={handleNext}
        >
          Next &rarr;
        </button>
      </div>

      {viewMode === 'weekly' ? renderWeeklySchedule() : renderMonthlySchedule()}
    </div>
  );
}