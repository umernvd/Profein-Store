'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';

// Animated text component that reveals character by character
const AnimatedText = ({ text, className = '', delay = 0 }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      y: 20
    }
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Stats counter hook
const useCounter = (end, duration = 2000, isInView) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isInView]);

  return count;
};

// Stats card component with animated counter
const StatsCard = ({ icon, end, label, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useCounter(end, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-teal-100 relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        {/* Pulsing badge */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-2 -right-2 w-16 h-16 bg-orange-400/20 rounded-full blur-xl"
        />

        <div className="relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-5xl mb-4"
          >
            {icon}
          </motion.div>
          <div className="text-4xl font-bold text-teal-900 mb-2">
            {count}{suffix}
          </div>
          <div className="text-teal-600">{label}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Morphing blob SVG component
const MorphingBlob = ({ delay = 0 }) => {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute w-64 h-64 opacity-20"
      animate={{
        scale: [1, 1.1, 0.9, 1],
        rotate: [0, 90, 180, 270, 360]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      <motion.path
        fill="url(#gradient)"
        animate={{
          d: [
            'M 50 100 Q 75 75, 100 50 T 150 100 T 100 150 T 50 100',
            'M 50 100 Q 25 75, 50 50 T 150 50 T 150 150 T 50 100',
            'M 100 50 Q 125 75, 150 100 T 100 150 T 50 100 T 100 50',
            'M 50 100 Q 75 75, 100 50 T 150 100 T 100 150 T 50 100'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// Magnetic card component
const MagneticCard = ({ children }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 5);
    y.set((e.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const milestones = [
    { year: '2023', title: 'Company Founded', description: 'Started with a vision to revolutionize fitness retail' },
    { year: '2024', title: '10,000+ Customers', description: 'Reached our first major milestone' },
    { year: '2024', title: 'Premium Line Launch', description: 'Introduced exclusive premium equipment' },
    { year: '2025', title: 'Global Expansion', description: 'Opening stores worldwide' }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of our products and services',
      icon: '⭐',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Customer Focus',
      description: 'Your satisfaction and fitness goals drive everything we do',
      icon: '💪',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Innovation',
      description: 'Constantly seeking new ways to enhance your fitness journey',
      icon: '🚀',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and sustainable growth',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 relative overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-orange-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10">
          <MorphingBlob delay={0} />
        </div>
        <div className="absolute bottom-20 right-10">
          <MorphingBlob delay={5} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MorphingBlob delay={10} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with animated text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <AnimatedText
            text="About Profein"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-teal-900 mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl text-teal-600 max-w-3xl mx-auto"
          >
            Your trusted destination for premium fitness equipment and accessories.
            We&apos;re committed to helping you achieve your fitness goals with top-quality products and exceptional service.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 mb-20">
          <StatsCard icon="👥" end={10000} label="Happy Customers" suffix="+" />
          <StatsCard icon="📦" end={500} label="Products" suffix="+" />
          <StatsCard icon="⭐" end={98} label="Satisfaction Rate" suffix="%" />
          <StatsCard icon="🌍" end={50} label="Countries" suffix="+" />
        </div>

        {/* Mission Section with 3D flip cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-teal-900 text-center mb-12">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Premium Quality', description: 'Curated selection of top-tier fitness equipment', icon: '🏆' },
              { title: 'Expert Support', description: 'Professional guidance every step of the way', icon: '🎯' },
              { title: 'Customer First', description: 'Your satisfaction is our priority', icon: '❤️' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                whileHover={{ rotateY: 180 }}
                onClick={() => toggleCard(index)}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative h-64 cursor-pointer"
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 flex flex-col items-center justify-center text-white shadow-2xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
                
                {/* Back of card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-8 flex items-center justify-center text-white shadow-2xl"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-center text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-teal-900 text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Animated path */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-orange-500" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-start md:items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-teal-100"
                  >
                    <div className="text-orange-500 font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-teal-900 font-bold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-teal-600">{milestone.description}</p>
                  </motion.div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.5, rotate: 360 }}
                  className="absolute left-0 md:static md:w-2/12 md:flex md:justify-center"
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full z-10" />
                </motion.div>
                
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section with glassmorphism */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-teal-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ height: 'auto' }}
                className="group relative overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${value.color} p-[2px] rounded-2xl`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 h-full">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl md:text-5xl mb-4"
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-teal-900 mb-3">{value.title}</h3>
                    <motion.p
                      initial={{ height: 0 }}
                      whileInView={{ height: 'auto' }}
                      className="text-teal-600 overflow-hidden"
                    >
                      {value.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founder Section with magnetic effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-teal-900 text-center mb-12">Meet Our Founder</h2>
          <div className="max-w-2xl mx-auto">
            <MagneticCard>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="relative h-96">
                  <Image
                    src="/images/founder.jpeg"
                    alt="Umer Naveed"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-8 text-white"
                  >
                    <h3 className="text-3xl font-bold mb-2">Umer Naveed</h3>
                    <p className="text-orange-400 font-semibold text-lg mb-3">Founder & CEO</p>
                    <p className="text-gray-200">
                      Fitness enthusiast with over 2 years of experience in the industry.
                      Passionate about helping people achieve their fitness goals through quality equipment and expert guidance.
                    </p>
                  </motion.div>
                </div>
                
                {/* Glowing border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: 'linear-gradient(45deg, #0d9488, #fb923c, #0d9488)',
                    backgroundSize: '300% 300%',
                    animation: 'gradient 3s ease infinite',
                    padding: '3px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />
              </motion.div>
            </MagneticCard>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-teal-500 to-orange-500 rounded-3xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers and transform your fitness today</p>
          <motion.a
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-teal-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Shop Now
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AboutPage; 