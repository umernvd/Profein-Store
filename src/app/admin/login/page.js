'use client'; // Enable client-side features

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Simple login page for admin access
export default function AdminLogin() {
  // Set up state for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get router for navigation
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // In a real app, you would make an API call to verify credentials
    // For this demo, we'll use hardcoded credentials (admin/admin123)
    if (username === 'admin' && password === 'admin123') {
      // Store a simple token in localStorage
      localStorage.setItem('adminToken', 'demo-token-12345');

      // Redirect to admin dashboard
      router.push('/admin');
    } else {
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-800">Admin Login</h1>
          <p className="text-gray-600 mt-2">Sign in to access the admin dashboard</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-teal-800 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-black"
              placeholder="Enter your username"
            />
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal-800 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-black"
              placeholder="Enter your password"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-orange-400 text-teal-900 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Back to store link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-teal-600 hover:text-teal-800">
            Back to Store
          </Link>
        </div>

        {/* Demo credentials info */}
        <div className="mt-8 text-center text-sm text-gray-500 bg-gray-50 p-2 rounded">
          <p>Demo Credentials:</p>
          <p>Username: admin</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
} 