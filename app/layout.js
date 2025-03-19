import './globals.css'
import { AuthProvider } from '../Auth/auth-context'
import { FiCalendar, FiUsers, FiTruck, FiLogOut } from 'react-icons/fi'

export const metadata = { /* ... */ }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className="header">
            <div className="nav-container">
              <div className="logo">
                🚚 YYC Food Trucks Schedule
              </div>
              <nav className="nav-links">
                <a href="/schedule" className="nav-link">
                  <FiCalendar /> Schedule
                </a>
                <a href="/employees" className="nav-link">
                  <FiUsers /> Staff
                </a>
                <a href="/events" className="nav-link">
                  <FiTruck /> Events
                </a>
              </nav>
            </div>
          </header>
          
          <main className="container dashboard-grid">
            <aside className="sidebar">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <nav className="space-y-2">
                <a href="/schedule/new" className="button w-full text-center">
                  + New Shift
                </a>
                <a href="/employees/new" className="button w-full text-center">
                  + Add Staff
                </a>
                <a href="/events/new" className="button w-full text-center">
                  + Create Event
                </a>
              </nav>
              
              <div className="mt-6 pt-4 border-t border-primary-light">
                <a href="/logout" className="text-primary-medium hover:text-primary-dark flex items-center gap-2">
                  <FiLogOut /> Logout
                </a>
              </div>
            </aside>
            
            <div className="main-content">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}