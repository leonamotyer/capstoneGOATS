'use client';
import '../globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import EventCard from '../../events/eventInfo/eventCard';

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

  const getDateRangeText = () => {
    if (viewMode === 'weekly') {
      // Calculate start and end of week
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
        // Format dates
        const startFormat = startOfWeek.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric' 
        });
        
        const endFormat = endOfWeek.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });
        
        return `${startFormat} - ${endFormat}`;
      } else {
        // Monthly view
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        
        // First day of month
        const firstDay = new Date(year, month, 1).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        });
        
        // Last day of month
        const lastDay = new Date(year, month + 1, 0).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        
        return `${firstDay} - ${lastDay}`;
      }
    };
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
  

  const handleToday = () => {
    setSelectedDate(new Date());
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
      return <p className="empty-week-message">No events scheduled for this week.</p>;
    }

    return (
      <div className="weekly-schedule">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
          const hasEvents = eventsThisWeek.some(
            (event) => new Date(event.date).getDay() === index
          );
          
          return (
            <div
              key={day}
              className={`day-card ${hasEvents ? 'day-card-has-events' : ''}`}
            >
              <h3 className="day-title">
                {day}
              </h3>
              
              <div className="day-events-container">
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
  
    const dayPilotEvents = eventsThisMonth.map((event) => {
      // Determine if the event is pending or scheduled
      const hasTrucks = event.trucks && event.trucks.length > 0;
      const hasEnoughStaff = event.assignedStaff && event.assignedStaff.length >= event.requiredServers;
      
      // An event is pending if it doesn't have trucks assigned or enough staff
      const statusClass = hasTrucks && hasEnoughStaff ? 'event_scheduled' : 'event_pending';
      
      return {
        id: event.id,
        text: event.name,
        start: event.date,
        end: event.date,
        data: {
          ...event,
          status: statusClass // Add status to data for display
        },
        cssClass: statusClass // Use this class for styling
      };
    });
  
    return (
      <div className="monthly-schedule">
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
            const statusText = args.data.cssClass === 'event_pending' ? 'Pending' : 'Scheduled';
            
            args.html = `
              <div class="custom-event">
                <h3 class="custom-event-title">${event.name}</h3>
                <p class="custom-event-time">${event.time}</p>
                <p class="custom-event-location">${event.location}</p>
                <p class="custom-event-status">${statusText}</p>
              </div>
            `;
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
    <div className="schedule-container">
      <div className="schedule-header">
        <div>
          <h2 className="schedule-title">Schedule</h2>
          <p className="schedule-subtitle">
            {getDateRangeText()}
          </p>
        </div>
        <div className="view-toggle-container">
          <button
            className={`view-toggle-button ${viewMode === 'weekly' ? 'view-toggle-button-active' : 'view-toggle-button-inactive'}`}
            onClick={() => setViewMode('weekly')}
          >
            Weekly View
          </button>
          <button
            className={`view-toggle-button ${viewMode === 'monthly' ? 'view-toggle-button-active' : 'view-toggle-button-inactive'}`}
            onClick={() => setViewMode('monthly')}
          >
            Monthly View
          </button>
        </div>
      </div>

      <div className="navigation-container">
        <button
          className="navigation-button"
          onClick={handlePrevious}
        >
          &larr; Previous
        </button>
        <button
          className="navigation-button today-button"
          onClick={handleToday}
        >
          Today
        </button>
        <button
          className="navigation-button"
          onClick={handleNext}
        >
          Next &rarr;
        </button>
      </div>

      {viewMode === 'weekly' ? renderWeeklySchedule() : renderMonthlySchedule()}
    </div>
  );
}
