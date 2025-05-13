"use client";

import '../globals.css';
import { AuthProvider } from '../../Auth/auth-context';
import { FiCalendar, FiUsers, FiTruck, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

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
           

            <div className="main-content">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
