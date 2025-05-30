'use client';

import Image from 'next/image';

const teamMembers = [
  {
    name: 'Umer Naveed',
    role: 'Founder & CEO',
    image: '/images/founder.jpeg',
    bio: 'Fitness enthusiast with over 2 years of experience in the industry.',
  }
];

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-teal-800 mb-4">About GymStore</h1>
        <p className="text-lg text-teal-600 max-w-3xl mx-auto">
          Your trusted destination for premium fitness equipment and accessories. We&apos;re committed to helping you achieve your fitness goals with top-quality products and exceptional service.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-teal-800 mb-6">Our Mission</h2>
        <p className="text-teal-600 mb-6">
          At GymStore, we believe that everyone deserves access to high-quality fitness equipment and expert guidance. Our mission is to provide premium fitness solutions that help our customers achieve their health and fitness goals.
        </p>
        <div className="inline-block text-left">
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-teal-600">Curated selection of premium equipment</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-teal-600">Expert guidance and support</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-teal-600">Commitment to customer satisfaction</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-teal-800 text-center mb-12">Meet Our Founder</h2>
        <div className="max-w-md mx-auto">
          <div className="relative rounded-lg shadow-md overflow-hidden border border-teal-100">
            <div className="relative h-96">
              <Image
                src={teamMembers[0].image}
                alt={teamMembers[0].name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-1">{teamMembers[0].name}</h3>
                <p className="text-orange-400 font-medium mb-3">{teamMembers[0].role}</p>
                <p className="text-gray-200">{teamMembers[0].bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 