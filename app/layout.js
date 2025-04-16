import './globals.css';
import { AuthProvider } from '../Auth/auth-context';
import { FiCalendar, FiUsers, FiTruck, FiLogOut } from 'react-icons/fi';

export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className="header bg-blue-500 text-white py-3 shadow-md">
            <div className="nav-container flex items-center justify-between px-4">
              <div className="logo flex items-center gap-3">
                <img
                  src="/yyctrucks.jpg"
                  alt="YYC Food Trucks Logo"
                  className="rounded-full shadow-sm"
                  style={{ width: '64px', height: '64px' }} 
                />
                <h1 className="text-lg font-semibold">YYC Food Trucks</h1>              </div>
              <nav className="nav-links flex gap-4">
                <a href="/schedule" className="nav-link flex items-center gap-1 hover:text-yellow-300">
                  <FiCalendar /> Schedule
                </a>
                <a href="/employees" className="nav-link flex items-center gap-1 hover:text-yellow-300">
                  <FiUsers /> Staff
                </a>
                <a href="/events" className="nav-link flex items-center gap-1 hover:text-yellow-300">
                  <FiTruck /> Events
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
                <a href="/logout" className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                  <FiLogOut /> Logout
                </a>
              </div>
            </aside>

            <div className="main-content p-4">{children}</div>
            <footer className="mt-auto">
                <p>© 2025 YYC FoodTrucks All rights reserved.</p>
            </footer>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}