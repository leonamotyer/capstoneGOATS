'use client';

import { useState, useEffect } from 'react';
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import EventCard from '../events/eventInfo/eventCard';

export default function EmployeeSchedule() {
  const [viewMode, setViewMode] = useState('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('employeeId');
    setEmployeeId(id);
  }, []);

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => {
        if (employeeId) {
          const filtered = data.filter(e => e.assignedEmployees?.includes(employeeId));
          setEvents(filtered);
        }
      })
      .catch(err => console.error('Error loading events', err));
  }, [employeeId]);

  useEffect(() => {
    fetch('/trucks.json')
      .then(res => res.json())
      .then(data => setTrucks(data));
  }, []);

  useEffect(() => {
    fetch('/employee.json')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    viewMode === 'weekly'
      ? newDate.setDate(newDate.getDate() - 7)
      : newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    viewMode === 'weekly'
      ? newDate.setDate(newDate.getDate() + 7)
      : newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const renderWeeklySchedule = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const eventsThisWeek = events.filter(event => {
      const date = new Date(event.date);
      return date >= startOfWeek && date <= endOfWeek;
    });

    if (eventsThisWeek.length === 0) {
      return <p className="text-center text-gray-500">No events scheduled this week.</p>;
    }

    return (
      <div className="space-y-6 mt-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div
            key={day}
            className={`day-column border rounded-lg p-3 ${
              eventsThisWeek.some((e) => new Date(e.date).getDay() === index) ? 'bg-green-100' : ''
            }`}
          >
            <h3 className="font-bold mb-2">{day}</h3>
            <div className="space-y-2">
              {eventsThisWeek
                .filter(e => new Date(e.date).getDay() === index)
                .map(e => (
                  <EventCard key={e.id} event={e} trucks={trucks} employees={employees} />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMonthlySchedule = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    const filteredEvents = events.filter(e => {
      const date = new Date(e.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const dayPilotEvents = filteredEvents.map(event => ({
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
            const event = events.find(e => e.id === args.e.data.id);
            alert(`Event: ${event.name}\nLocation: ${event.location}`);
          }}
          onBeforeEventRender={(args) => {
            const e = args.data.data;
            args.html = `
              <div class="custom-event-card">
                <h3 class="font-bold">${e.name}</h3>
                <p class="text-sm">${e.time}</p>
                <p class="text-xs text-gray-500">${e.location}</p>
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
          <h2 className="text-2xl font-bold">My Schedule</h2>
          <p className="text-primary-medium">
            {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
          </p>
        </div>
        <div className="view-toggle flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${viewMode === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('weekly')}
          >
            Weekly View
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${viewMode === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
