'use client';

import '../globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineClipboardList } from 'react-icons/hi';

export default function EmployeeDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const router = useRouter();

  const cards = [
    {
      title: 'Schedule',
      icon: <HiOutlineCalendar size={28} />, 
      description: 'View your assigned work schedule.',
      link: '/employeeschedule',
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      badge: 'schedule'
    },
    {
      title: 'Calendar',
      icon: <HiOutlineClipboardList size={28} />, 
      description: 'Check events and upcoming tasks.',
      link: '/calendar',
      bg: 'bg-green-100',
      text: 'text-green-800',
      badge: 'calendar'
    },
    {
      title: 'Time-Off',
      icon: <HiOutlineClock size={28} />, 
      description: 'Submit and track your time-off requests.',
      link: '/requests',
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      badge: 'time-off'
    }
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');

    if (!isLoggedIn || role !== 'Employee') {
      router.push('/');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-700">Employee Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">Welcome to your workspace</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 border border-red-200 px-4 py-2 rounded hover:bg-red-50"
          >
            <FiLogOut size={18} /> Logout
          </button>
        </div>

        {/* Vertical Cards */}
        <div className="flex flex-col gap-6">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, link, bg, text, badge, icon }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(link)}
      className={`text-left w-full p-6 rounded-2xl border shadow-md hover:shadow-xl transition transform hover:scale-[1.02] ${bg}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-xl font-bold ${text}`}>{title}</h3>
        <div>{icon}</div>
      </div>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-600 shadow-inner">
        {badge}
      </span>
    </button>
  );
}