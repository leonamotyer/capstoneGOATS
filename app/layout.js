import './globals.css';
import { AuthProvider } from '../Auth/auth-context';
import { FiCalendar, FiUsers, FiTruck, FiLogOut } from 'react-icons/fi';
import { GiFoodTruck } from "react-icons/gi";


export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className="header">
            <div className="nav-container">
              {/* Logo and Title */}
              <a href="/" className="logo hover:opacity-90 transition-opacity">
                <img
                  src="/yyctrucks.jpg"
                  alt="YYC Food Trucks Logo"
                  className="logo-img"
                />
                <h1 className="logo-text">
                  <span className="text-secondary-dark">YYC</span> Food Trucks
                </h1>
              </a>
          
              {/* Navigation Links */}
              <nav className="nav-links">
                <a href="/schedule" className="nav-link">
                  <FiCalendar className="nav-icon" /> Schedule
                </a>
                <a href="/employees" className="nav-link">
                  <FiUsers className="nav-icon" /> Staff
                </a>
                <a href="/events" className="nav-link">
                  <GiFoodTruck className="nav-icon" /> Events
                </a>
                <a href="/login" className="nav-link">
                  <FiLogOut className="nav-icon" /> Login
                </a>
              </nav>
            </div>
          </header>

          <main className="container dashboard-grid">
            <aside className="sidebar bg-gray-100 p-3 shadow-md">
              <h3 className="text-md font-semibold mb-3">Quick Actions</h3>
              <nav className="space-y-2">
                <a href="/schedule/new" className="button w-full text-center bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600">
                  + New Shift
                </a>
                <a href="/employees/newEmployee" className="button w-full text-center bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600">
                  + Add Staff
                </a>
                <a href="/events/newEvent" className="button w-full text-center bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600">
                  + Create Event
                </a>
              </nav>

              <div className="mt-4 pt-3 border-t border-gray-300">
                <a href="/" className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                  <FiLogOut /> Logout
                </a>
              </div>
            </aside>

            <div className="main-content p-4">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}