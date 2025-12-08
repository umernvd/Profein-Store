'use client';

// Import the Inter font from Google Fonts
import { Inter } from 'next/font/google';
// Import the Big Shoulders font from Google Fonts

import './globals.css';
// Import the Navbar component from the components folder
import Navbar from '@/components/Navbar';
// Import the Footer component from the components folder
import Footer from '@/components/Footer';
// Import the CartProvider to manage cart state throughout the app
import { CartProvider } from '@/context/CartContext';
// Import the ToastProvider to manage toast notifications throughout the app
import { ToastProvider } from '@/context/ToastContext';
// Import ErrorBoundary to catch and handle React errors
import ErrorBoundary from '@/components/ErrorBoundary';
// Import PageTransition for smooth page transitions
import PageTransition from '@/components/PageTransition';

// Initialize the Inter font with Latin character subset
const inter = Inter({ subsets: ['latin'] });

// The main layout component that wraps around all pages
const RootLayout = ({ children }) => {
  return (
    // Begin HTML document with language set to English
    <html lang="en">
      <head>
        {/* Science Gothic font from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Science+Gothic:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Wrap the entire app with ErrorBoundary to catch React errors */}
        <ErrorBoundary>
          {/* Wrap with ToastProvider for global toast notifications */}
          <ToastProvider>
            {/* Wrap the entire app with CartProvider to share cart data across all pages */}
            <CartProvider>
              {/* Create a flex column layout that takes minimum full height of screen */}
              <div className="flex flex-col min-h-screen">
                {/* Add the navigation bar at the top */}
                <Navbar />
                {/* Main content area that grows to fill available space */}
                <main className="flex-grow">
                  <PageTransition>{children}</PageTransition>
                </main>
                {/* Add the footer at the bottom */}
                <Footer />
              </div>
            </CartProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
