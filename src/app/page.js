'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

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
              src={product.image || '/images/placeholder.jpg'}
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-orange-400 w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const { addToCart } = useCart()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const productsRef = useRef(null)

  // Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (productsRef.current) {
      observer.observe(productsRef.current)
    }

    return () => {
      if (productsRef.current) {
        observer.unobserve(productsRef.current)
      }
    }
  }, [productsRef])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*`
        )

        if (!response.ok) throw new Error('Failed to fetch featured products')

        const { data } = await response.json()

        const formattedProducts = data.map((item) => {
          // Default placeholder image as fallback
          let imageUrl = '/images/placeholder.jpg';
          
          // Check if we have valid image data based on your actual API structure
          try {
            if (item.image?.formats?.thumbnail?.url) {
              imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.formats.thumbnail.url}`;
            } else if (item.image?.url) {
              imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.url}`;
            }
          } catch (e) {
            console.error('Error parsing image URL:', e);
          }

          return {
            id: item.id,
            name: item.name || 'Product Name',
            price: item.price || 0,
            image: imageUrl,
            category: item.products?.[0]?.name || 'Uncategorized',
          };
        })

        setFeaturedProducts(formattedProducts)
      } catch (error) {
        console.error('Error fetching featured products:', error)
        setError('Failed to load featured products. Showing default selection.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Function to handle adding to cart with animation
  const handleAddToCart = (product) => {
    addToCart(product)
    // You could add a visual feedback animation here in the future
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section with animations and slideshow */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-teal-700 opacity-80 animate-gradient"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side: Text content */}
            <motion.div 
              className="md:w-1/2 text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Your Ultimate Fitness{' '}
                <span className="text-orange-400 inline-block animate-pulse-slow">Destination</span>
              </h1>
              
              <motion.p 
                className="text-xl text-gray-200 mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Premium equipment and accessories for your fitness journey
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="inline-block bg-orange-400 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 hover:text-orange-400 transition duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-orange-400/50"
                >
                  Shop Now
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right side: Product slideshow */}
            <motion.div 
              className="md:w-1/2 h-80 md:h-96 relative mt-8 md:mt-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <HeroSlideshow products={featuredProducts} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products with animations */}
      <section className="py-24" ref={productsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="border-b-4 border-orange-400 pb-2">Featured Products</span>
          </motion.h2>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-teal-900/20 rounded-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-teal-800/20"></div>
                  <div className="p-4">
                    <div className="h-4 bg-teal-800/20 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-teal-800/20 rounded mb-4"></div>
                    <div className="h-4 bg-teal-800/20 rounded w-1/4 mb-4"></div>
                    <div className="h-10 bg-teal-800/20 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-800/30 hover:border-orange-400/50 transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image || '/images/placeholder.jpg'}
                      alt={product.name}
                      quality={90}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-4">
                    <span className="text-sm text-orange-400 font-medium">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-orange-300 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-teal-200 font-semibold mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      className="block w-full mt-4 bg-orange-400 text-teal-900 py-2 text-center rounded-md font-medium transform transition-all duration-300"
                      whileHover={{ backgroundColor: "#fb923c", scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {!loading && featuredProducts.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link 
                href="/products" 
                className="text-orange-400 border border-orange-400 px-6 py-2 rounded-lg hover:bg-orange-400 hover:text-black transition-all duration-300"
              >
                View All Products
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}