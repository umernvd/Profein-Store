'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getProducts } from '@/lib/api'
import { getImageUrl } from '@/lib/imageHelper'

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

// Hero Slideshow Component
const HeroSlideshow = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowProducts = products.slice(0, 4); // Use up to 4 products for slideshow

  useEffect(() => {
    if (slideshowProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideshowProducts.length]);

  if (slideshowProducts.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-xl bg-teal-900/20 border border-teal-800/30 overflow-hidden">
        <p className="text-teal-400">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-teal-800/30 shadow-2xl">
      {slideshowProducts.map((product, index) => (
        <motion.div
          key={product.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Product image */}
          <div className="relative w-full h-full">
            <Image
              src={getImageUrl(product.image, '/images/placeholder.jpg')}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

            {/* Product info overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <p className="text-orange-400 font-medium mb-1">{product.category}</p>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Slideshow indicators */}
      <div className="absolute bottom-3 right-3 flex space-x-2">
        {slideshowProducts.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-400 w-6' : 'bg-white/50'
              }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default async function Home() {
  const productsData = await getProducts();
  const products = productsData?.data || [];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.attributes.name}</h2>
            <p className="text-gray-600">${product.attributes.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}