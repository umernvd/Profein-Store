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
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if admin is logged in on component mount
  useEffect(() => {
    // Check if we're in the browser (not SSR)
    if (typeof window !== 'undefined') {
      try {
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
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
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
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('adminToken');
      } catch (error) {
        console.error('Error removing token from localStorage:', error);
      }
    }
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Admin navigation items
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  // Authenticated admin layout with responsive sidebar
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header Bar - visible only on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-teal-800 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <h1 className="text-lg font-bold">Profein Admin</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 animate-fadeIn"
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar for admin navigation */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-teal-800 text-white transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen 
            ? 'translate-x-0 animate-slideInLeft' 
            : '-translate-x-full lg:translate-x-0'
        }
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b border-teal-700">
            <h1 className="text-xl sm:text-2xl font-bold">Profein Admin</h1>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 mt-4 overflow-y-auto">
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-3 hover:bg-teal-700 transition-colors min-h-[44px] ${
                      pathname === item.path ? 'bg-teal-700 font-bold border-l-4 border-orange-400' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to store & logout buttons */}
          <div className="border-t border-teal-700">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center px-4 py-3 text-teal-100 hover:bg-teal-700 transition-colors min-h-[44px]"
            >
              ← Back to Store
            </Link>
            <button
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
              className="flex items-center w-full text-left px-4 py-3 text-orange-400 hover:bg-teal-700 transition-colors min-h-[44px]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 