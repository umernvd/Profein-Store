// Import Next.js Link component for client-side navigation
import Link from 'next/link';

export default function Footer() {
 
  return (
    // Main footer with teal background and white text
    <footer className="bg-teal-800 text-white">
      {/* Container for footer content with padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid layout for footer sections - 1 column on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-400">Profein</h3>
            <p className="text-teal-100">
              Your ultimate destination for premium fitness equipment and accessories.
            </p>
           
           
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-teal-100 hover:text-orange-400">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-teal-100 hover:text-orange-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Us</h3>
            <ul className="space-y-2">
              {/* Physical Address */}
              <li className="text-teal-100">
                <span className="block">123 Fitness Street</span>
                <span className="block">Gym City, GC 12345</span>
              </li>
              {/* Phone Number with tel: link */}
              <li className="text-teal-100">
                <a href="tel:+1234567890" className="hover:text-orange-400">
                  (123) 456-7890
                </a>
              </li>
              {/* Email with mailto: link */}
              <li className="text-teal-100">
                <a href="mailto:info@profein.com" className="hover:text-orange-400">
                  info@profein.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section with top border */}
        <div className="mt-8 pt-8 border-t border-teal-700 text-center text-teal-100">
          {/* Dynamic Year using JavaScript Date object */}
          <p>&copy; {new Date().getFullYear()} Profein. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 