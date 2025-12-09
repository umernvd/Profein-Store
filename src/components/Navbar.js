'use client'; // This directive is needed for client-side components in Next.js

// Import React hooks and Next.js components
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Import our custom cart hook
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  // State to track if mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to track if menu is closing (for exit animation)
  const [isClosing, setIsClosing] = useState(false);
  // State to track scroll position for sticky behavior
  const [isScrolled, setIsScrolled] = useState(false);
  // Get the cart count from our CartContext
  const { cartCount } = useCart();
  // Get current pathname for active route highlighting
  const pathname = usePathname();

  // Define our navigation menu items (now includes Admin)
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Admin', path: '/admin' },
  ];

  // Handle menu close with animation
  const handleMenuClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 200); // Match animation duration
  };

  // Handle scroll behavior for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Main navigation bar with modern glassmorphism effect and gradient accent
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-teal-950/98 to-teal-950/95 backdrop-blur-lg shadow-2xl border-b border-teal-850/50 transition-all duration-300 ${
      isScrolled ? 'h-16' : 'h-20'
    }`}>
      {/* Decorative gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo/Brand section - Left aligned */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/store-logo.png"
                alt="Profein Logo"
                width={150}
                height={75}
                quality={95} 
                className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'w-28 sm:w-32' : 'w-32 sm:w-36 md:w-40'
                }`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu - Center aligned */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Map through menu items to create links */}
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                const isAdmin = item.name === 'Admin';
                
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`relative px-4 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-300 group ${
                      isAdmin 
                        ? 'text-orange-400 hover:text-orange-300' 
                        : 'text-teal-100 hover:text-white'
                    } ${isActive ? 'text-white' : ''}`}
                  >
                    {/* Background hover effect */}
                    <span className={`absolute inset-0 rounded-lg transition-transform duration-300 ease-out ${
                      isActive 
                        ? 'bg-teal-900/70 scale-100' 
                        : 'bg-teal-900/50 scale-0 group-hover:scale-100'
                    }`} />
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Underline indicator */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${
                      isAdmin ? 'bg-orange-400' : 'bg-teal-300'
                    } ${isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Cart Icon - Right aligned */}
          <div className="hidden md:flex items-center">
            <Link
              href="/cart"
              className="relative group p-3 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110"
              aria-label="Shopping Cart"
            >
              {/* Cart SVG Icon */}
              <svg 
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              
              {/* Cart count badge with bounce animation */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-teal-950 text-orange-400 text-xs font-bold rounded-full border-2 border-white shadow-lg animate-bounce">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
              
              {/* Glow effect on hover */}
              <span className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile menu button and cart - only visible on small screens */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className="relative group p-2.5 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg transition-all duration-300 active:scale-95"
              aria-label="Shopping Cart"
            >
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-teal-950 text-orange-400 text-[10px] font-bold rounded-full border-2 border-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => {
                if (isMenuOpen) {
                  handleMenuClose();
                } else {
                  setIsMenuOpen(true);
                }
              }}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-teal-100 hover:text-white bg-teal-900/50 hover:bg-teal-900 transition-all duration-300 active:scale-95"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Toggle between hamburger and X icon based on menu state */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - only displayed when isMenuOpen is true */}
      {isMenuOpen && (
        <div className={`md:hidden bg-gradient-to-b from-teal-925/98 to-teal-950/98 backdrop-blur-lg border-t border-teal-850/50 shadow-2xl ${isClosing ? 'animate-slideUp' : 'animate-slideDown'}`}>
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Map through menu items to create mobile menu links */}
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const isAdmin = item.name === 'Admin';
              
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 active:scale-95 ${
                    isAdmin
                      ? 'text-orange-400 hover:text-orange-300 hover:bg-teal-900/50'
                      : 'text-teal-100 hover:text-white hover:bg-teal-900/50'
                  } ${isActive ? 'bg-teal-900/70 text-white' : ''}`}
                  onClick={handleMenuClose}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    {isActive && (
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
} 