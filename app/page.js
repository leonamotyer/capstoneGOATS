"use client";
import './globals.css';
import { useState } from 'react';

export default function Home() {
  const [hoveredLink, setHoveredLink] = useState(null);
  
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </main>
      
      <footer className="mt-auto pt-8 text-center text-primary-light text-sm">
        <p>© 2025 YYC FoodTrucks All rights reserved.</p>
      </footer>
    </div>
  );
}