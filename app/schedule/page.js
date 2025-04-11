'use client';
import '../globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import EventCard from '../events/eventInfo/eventCard';

export default function Schedule() {
  const [viewMode, setViewMode] = useState('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

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
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  // Navigation functions
  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  // Render weekly schedule
  const renderWeeklySchedule = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const eventsThisWeek = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });

    if (eventsThisWeek.length === 0) {
      return <p style={{ textAlign: 'center', color: '#6B7280', marginTop: '2rem' }}>No events scheduled for this week.</p>;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', marginTop: '2.25rem' }}>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
          const hasEvents = eventsThisWeek.some(
            (event) => new Date(event.date).getDay() === index
          );
          
          return (
            <div
              key={day}
              style={{
                border: '2px solid #E5E7EB',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                backgroundColor: hasEvents ? '#FEF3C7' : 'white',
              }}
            >
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'darkgreen', 
                textDecoration: 'underline', 
                marginBottom: '1rem' 
              }}>
                {day}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {eventsThisWeek
                  .filter((event) => new Date(event.date).getDay() === index)
                  .map((event) => (
                    <EventCard key={event.id} event={event} trucks={trucks} employees={employees} />
                  ))}
              </div>
            </div>
          );
        })}
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
      <div style={{ marginTop: '1.5rem' }}>
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
              <div style="padding: 8px; border-radius: 4px;">
                <h3 style="font-weight: bold; font-size: 16px; color: #1E40AF;">${event.name}</h3>
                <p style="font-size: 14px;">${event.time}</p>
                <p style="font-size: 12px; color: #6B7280;">${event.location}</p>
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
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Schedule</h2>
          <p style={{ color: '#4B5563' }}>
            {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: viewMode === 'weekly' ? '#3B82F6' : '#E5E7EB',
              color: viewMode === 'weekly' ? 'white' : '#1F2937',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setViewMode('weekly')}
          >
            Weekly View
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: viewMode === 'monthly' ? '#3B82F6' : '#E5E7EB',
              color: viewMode === 'monthly' ? 'white' : '#1F2937',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setViewMode('monthly')}
          >
            Monthly View
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem' }}>
        <button
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#E5E7EB',
            color: '#1F2937',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handlePrevious}
        >
          &larr; Previous
        </button>
        <button
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#E5E7EB',
            color: '#1F2937',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleNext}
        >
          Next &rarr;
        </button>
      </div>

      {viewMode === 'weekly' ? renderWeeklySchedule() : renderMonthlySchedule()}
    </div>
  );
}