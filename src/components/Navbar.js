'use client'; // This directive is needed for client-side components in Next.js

// Import React hooks and Next.js components
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Import our custom cart hook
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  // State to track if mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Get the cart count from our CartContext
  const { cartCount } = useCart();

  // Define our navigation menu items
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
  ];

  

  return (
    // Main navigation bar with teal background and shadow
    <nav className="bg-teal-700 shadow-md sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky">
        <div className="flex justify-between h-16 sticky">
          {/* Logo/Brand section */}
         <div className="flex items-center sticky">
  <Link href="/" className="flex-shrink-0 flex items-center">
    <Image
      src="/images/store-logo.png"
      alt="Profein Logo"
      width={140} // Adjust based on your logo's dimensions
      height={70}
      quality={90} 

     className="object-contain" // Ensures proper scaling
      priority // Important for above-the-fold logos
    />
  </Link>
</div>

          {/* Desktop Menu - only visible on medium screens and above */}
          <div className="hidden md:flex items-center space-x-8 sticky">
            {/* Map through menu items to create links */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-teal-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Admin link - always visible */}
            <Link
              href="/admin"
              className="text-orange-400 hover:text-orange-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Admin
            </Link>

            {/* Cart button with item count */}
            <Link
              href="/cart"
              className="relative text-teal-800 bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-md text-sm font-medium transition-colors group"
            >
              <span className="flex items-center">
                Cart
                {/* Show cart count badge if there are items in cart */}
                {cartCount > 0 && (
                  <span className="ml-2 bg-teal-800 text-orange-400 px-2 py-1 rounded-full text-xs group-hover:bg-teal-900">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
          </div>

          {/* Mobile menu button - only visible on small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-100 hover:text-white hover:bg-teal-600"
            >
              <span className="sr-only">Open main menu</span>
              {/* Toggle between hamburger and X icon based on menu state */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - only displayed when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Map through menu items to create mobile menu links */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block text-teal-100 hover:text-white hover:bg-teal-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
              >
                {item.name}
              </Link>
            ))}

            {/* Admin link - always visible */}
            <Link
              href="/admin"
              className="block text-orange-400 hover:text-orange-300 hover:bg-teal-600 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>

            {/* Mobile cart button */}
            <Link
              href="/cart"
              className="block text-teal-800 bg-orange-400 hover:bg-orange-500 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)} // Close menu when cart is clicked
            >
              <span>Cart</span>
              {/* Show cart count badge if there are items in cart */}
              {cartCount > 0 && (
                <span className="bg-teal-800 text-orange-400 px-2 py-1 rounded-full text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 