'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getProducts } from '@/lib/api'
import { getImageUrl } from '@/lib/imageHelper'
import { TIMING } from '@/lib/constants'

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
    }, TIMING.HERO_SLIDESHOW_INTERVAL);

    // Clean up interval on component unmount or when dependencies change
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

// Main Home component
export default function Home() {
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-teal-600 text-xl">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold text-teal-900 leading-tight"
            >
              Transform Your
              <span className="text-orange-400"> Fitness Journey</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-teal-700"
            >
              Premium gym equipment and supplements to help you reach your goals
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4">
              <Link
                href="/products"
                className="bg-orange-400 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition-colors duration-300"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="border-2 border-teal-800 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-teal-900 hover:text-white transition-colors duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Hero Slideshow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-96 lg:h-[500px]"
          >
            <HeroSlideshow products={products} />
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-teal-900 mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-teal-100"
            >
              <div className="relative h-48">
                <Image
                  src={getImageUrl(product.image, '/images/placeholder.jpg')}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <span className="text-sm text-orange-500 font-medium">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold text-teal-800 mt-1">
                  {product.name}
                </h3>
                <p className="text-teal-900 font-semibold mt-2">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-4 bg-orange-400 text-teal-900 py-2 rounded-md hover:bg-orange-500 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-teal-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </section>
    </main>
  );
}