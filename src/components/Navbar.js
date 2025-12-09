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
  // State to track if menu is closing (for exit animation)
  const [isClosing, setIsClosing] = useState(false);
  // Get the cart count from our CartContext
  const { cartCount } = useCart();

  // Define our navigation menu items
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
  ];

  // Handle menu close with animation
  const handleMenuClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 200); // Match animation duration
  };

  

  return (
    // Main navigation bar with glassmorphism effect
    <nav className="fixed top-0 left-0 right-0 z-50 bg-teal-950/95 backdrop-blur-md shadow-lg border-b border-teal-850/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand section */}
         <div className="flex items-center">
  <Link href="/" className="flex-shrink-0 flex items-center">
    <Image
      src="/images/store-logo.png"
      alt="Profein Logo"
      width={140}
      height={70}
      quality={90} 
     className="object-contain w-28 sm:w-32 md:w-36"
      priority
    />
  </Link>
</div>

          {/* Desktop Menu - only visible on medium screens and above */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Map through menu items to create links */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-teal-100 hover:text-white hover:bg-teal-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* Admin link - always visible */}
            <Link
              href="/admin"
              className="text-orange-400 hover:text-orange-300 hover:bg-teal-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Admin
            </Link>

            {/* Cart button with item count */}
            <Link
              href="/cart"
              className="relative text-teal-800 bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 group hover:shadow-lg hover:scale-105"
            >
              <span className="flex items-center">
                Cart
                {/* Show cart count badge if there are items in cart */}
                {cartCount > 0 && (
                  <span className="ml-2 bg-teal-800 text-orange-400 px-2 py-1 rounded-full text-xs group-hover:bg-teal-900 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
          </div>

          {/* Mobile menu button - only visible on small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                if (isMenuOpen) {
                  handleMenuClose();
                } else {
                  setIsMenuOpen(true);
                }
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-100 hover:text-white hover:bg-teal-900 transition-all duration-200"
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
        <div className={`md:hidden bg-teal-925/95 backdrop-blur-md border-t border-teal-850/50 ${isClosing ? 'animate-slideUp' : 'animate-slideDown'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Map through menu items to create mobile menu links */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block text-teal-100 hover:text-white hover:bg-teal-900 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                onClick={handleMenuClose} // Close menu with animation when link is clicked
              >
                {item.name}
              </Link>
            ))}

            {/* Admin link - always visible */}
            <Link
              href="/admin"
              className="block text-orange-400 hover:text-orange-300 hover:bg-teal-900 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
              onClick={handleMenuClose}
            >
              Admin
            </Link>

            {/* Mobile cart button */}
            <Link
              href="/cart"
              className="flex text-teal-800 bg-orange-400 hover:bg-orange-500 px-3 py-2 rounded-md text-base font-medium items-center justify-between transition-all duration-200"
              onClick={handleMenuClose} // Close menu with animation when cart is clicked
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