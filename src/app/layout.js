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
module.exports = {
  // ...other config
  extend: {
    animation: {
      'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'gradient': 'gradient 8s ease infinite',
    },
    keyframes: {
      gradient: {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      }
    }
  }
}
// Initialize the Inter font with Latin character subset
const inter = Inter({ subsets: ['latin'] });

// Set website metadata (title and description shown in browser tabs and search results)
export const metadata = {
  title: 'Profein - Your Ultimate Fitness Destination',
  description: 'Premium fitness equipment and accessories for your fitness journey',
};

// The main layout component that wraps around all pages
export default function RootLayout({ children }) {
  return (
    // Begin HTML document with language set to English
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire app with CartProvider to share cart data across all pages */}
        <CartProvider>
          {/* Create a flex column layout that takes minimum full height of screen */}
          <div className="flex flex-col min-h-screen">
            {/* Add the navigation bar at the top */}
            <Navbar />
            {/* Main content area that grows to fill available space */}
            <main className="flex-grow">{children}</main>
            {/* Add the footer at the bottom */}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
