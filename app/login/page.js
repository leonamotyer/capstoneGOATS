'use client';
 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
 
export default function LoginPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Admin');
  const [error, setError] = useState('');

 
  const handleLogin = (e) => {
    e.preventDefault();
 
    const validUserName = 'admin';
    const validPassword = '1234';
 
    if (userName === validUserName && password === validPassword) {
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
    <div className="w-full min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 space-y-6 border border-gray-100">
        <div className="flex justify-center">
          <Image
            src="/images/dfe0cb48-d05f-4f02-88be-7302537507d9.jpg"
            alt="YYC Food Trucks"
            width={100}
            height={100}
            className="rounded-lg object-contain shadow-md"
          />
        </div>
 
        <h2 className="text-3xl font-bold text-center text-green-800">Log in</h2>
 
        <form onSubmit={handleLogin} className="space-y-5">
          <div className=''>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#f1f9ff]"
              placeholder="Enter your username"
              required
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#f1f9ff]"
                placeholder="Enter your password"
                required
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="text-end text-sm text-gray-500">
              <a href="/forgotpassword" className="hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
 
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
 
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}


 
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>

          <div className='flex items-center'>
            <hr className='w-full border-t-1 border-gray-400 opacity-50'/>
              <p className='text-sm opacity-50 text-gray-400 mx-1'>or</p>
            <hr className='w-full border-t-1 border-gray-400 opacity-50'/>
          </div>


        </form>
 

      </div>
    </div>
  );
}
