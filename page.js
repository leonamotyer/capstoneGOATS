<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Admin'); // Default role
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', role);

      if (role === 'Admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/mainpage');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-green-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-6 border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/dfe0cb48-d05f-4f02-88be-7302537507d9.jpg"
            alt="YYC Food Trucks"
            width={100}
            height={100}
            className="rounded-lg object-contain shadow-md"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-800">Login</h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#f1f9ff]"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#f1f9ff]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Role Selector */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setRole('Employee')}
              className={`w-1/2 py-2 rounded-lg font-medium border ${
                role === 'Employee'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              Employee
            </button>
            <button
              type="button"
              onClick={() => setRole('Admin')}
              className={`w-1/2 py-2 rounded-lg font-medium border ${
                role === 'Admin'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <a href="/forgotpassword" className="hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
=======
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

      
>>>>>>> 2dbbfb0ec4791d4ac5b4b82084546ff281026267
    </div>
  );
}
