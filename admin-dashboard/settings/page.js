'use client'

import { useState } from 'react'
import { FaUpload, FaFileExport, FaEdit, FaTrash } from 'react-icons/fa'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-green-800">⚙️ SETTINGS (admin only)</h1>

        {/* 1. Role Management */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Manage Roles</h2>
          <p className="text-sm text-gray-600 mb-4">Promote/demote employees</p>

          {/* Example users table */}
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Current Role</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">John Doe</td>
                <td className="p-2">Employee</td>
                <td className="p-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded">Promote</button>
                </td>
              </tr>
              {/* Add more rows */}
            </tbody>
          </table>
        </section>

        {/* 2. Business Hours */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Business Hours</h2>
          <p className="text-sm text-gray-600 mb-4">Edit weekly open/close times</p>
          {/* Placeholder — we can use a table or time pickers here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-gray-50 rounded shadow">Monday: 9:00 AM - 5:00 PM</div>
            <div className="p-4 bg-gray-50 rounded shadow">Tuesday: 9:00 AM - 5:00 PM</div>
            <div className="p-4 bg-gray-50 rounded shadow">Wednesday: 9:00 AM - 5:00 PM</div>
            {/* Add edit functionality as needed */}
          </div>
        </section>

        {/* 3. Specialty Menu */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Specialty Menu List</h2>
          <p className="text-sm text-gray-600 mb-4">Manage unique menu items</p>
          <div className="flex justify-between items-center mb-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">+ Add Item</button>
          </div>

          <ul className="space-y-2">
            <li className="bg-gray-50 p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-medium">Spicy Chicken Taco</p>
                <p className="text-sm text-gray-500">Street Food</p>
              </div>
              <div className="flex gap-2">
                <FaEdit className="text-yellow-500 cursor-pointer" />
                <FaTrash className="text-red-500 cursor-pointer" />
              </div>
            </li>
          </ul>
        </section>

        {/* 4. Export Reports */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Export Schedule or Reports</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaFileExport /> Export CSV
          </button>
        </section>

      </div>
    </div>
  )
}
