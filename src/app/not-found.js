'use client';

import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-orange-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-teal-400 mb-6">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-400 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 