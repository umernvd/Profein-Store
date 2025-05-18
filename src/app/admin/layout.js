'use client'; // This allows us to use client-side features

// Import necessary components
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// Admin layout wraps all admin pages
export default function AdminLayout({ children }) {
  // For navigation
  const router = useRouter();
  const pathname = usePathname();

  // State for admin authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if admin is logged in on component mount
  useEffect(() => {
    // In a real app, you would check a token in localStorage or cookies
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      // If not logged in and not on login page, redirect to login
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }

    setIsLoading(false);
  }, [pathname, router]);

  // If still loading, show a loading message
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-teal-800">Loading admin panel...</p>
      </div>
    );
  }

  // If on login page or not authenticated, just show the content (login form)
  if (pathname === '/admin/login' || !isAuthenticated) {
    return <>{children}</>;
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  // Admin navigation items
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  // Authenticated admin layout with sidebar
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for admin navigation */}
      <div className="w-64 bg-teal-800 text-white">
        <div className="p-4 border-b border-teal-700">
          <h1 className="text-2xl font-bold">Profein Admin</h1>
        </div>

        {/* Navigation items */}
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 hover:bg-teal-700 ${pathname === item.path ? 'bg-teal-700 font-bold' : ''
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to store & logout buttons */}
        <div className="absolute bottom-0 w-64 border-t border-teal-700">
          <Link
            href="/"
            className="block px-4 py-2 text-teal-100 hover:bg-teal-700"
          >
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-orange-400 hover:bg-teal-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 