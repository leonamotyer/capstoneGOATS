'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineUserGroup, HiOutlineCalendar, HiOutlineCog, HiOutlineClipboardList, HiOutlineClock } from 'react-icons/hi'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const role = localStorage.getItem('role')
    if (!isLoggedIn || role !== 'Admin') {
      router.push('/')
    }
  }, [])

  const cards = [
    {
      title: 'Employee Management',
      icon: <HiOutlineUserGroup size={28} />, 
      description: 'Manage employee data including wage, type, and status.',
      link: '/employees',
      bg: 'bg-green-100',
      text: 'text-green-800',
      badge: 'employee'
    },
    {
      title: 'Event Management',
      icon: <HiOutlineClipboardList size={28} />, 
      description: 'Create and manage events with assigned staff and menus.',
      link: '/events',
      bg: 'bg-pink-100',
      text: 'text-pink-800',
      badge: 'events'
    },
    {
      title: 'Scheduling',
      icon: <HiOutlineCalendar size={28} />, 
      description: 'View and assign weekly or monthly shifts.',
      link: 'admin-dashboard/schedule',
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      badge: 'schedule'
    },
    {
      title: 'Time-Off Requests',
      icon: <HiOutlineClock size={28} />, 
      description: 'Review and approve employee time-off submissions.',
      link: '/admin-dashboard/timeoffrequests',
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      badge: 'requests'
    },
    {
      title: 'Settings',
      icon: <HiOutlineCog size={28} />, 
      description: 'Manage app roles, preferences, and global options.',
      link: '/admin-dashboard/settings',
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      badge: 'settings'
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('role')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-green-50 to-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-700">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">Welcome back! Here’s your control panel.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 border border-red-200 px-4 py-2 rounded hover:bg-red-50"
          >
            <FiLogOut size={18} /> Logout
          </button>
        </div>

        {/* Vertical Layout */}
        <div className="flex flex-col gap-6">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, description, link, bg, text, badge, icon }) {
  const router = useRouter()
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
  )
}
