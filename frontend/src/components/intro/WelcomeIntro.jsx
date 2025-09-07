import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WelcomeIntro - Professional welcome animation component
 * 
 * Features:
 * - Sophisticated glassmorphism design
 * - Cinematic entrance animations
 * - Professional typography and spacing
 * - Advanced particle effects
 * - Smooth transitions and modern easing
 * 
 * @param {string} logo - SVG logo content or image src
 * @param {string} heading - Main heading text
 * @param {string} subtext - Subtitle text
 * @param {boolean} forceShow - Force show animation regardless of localStorage
 * @param {function} onComplete - Callback when animation completes
 */
const WelcomeIntro = ({ 
  logo = null, 
  heading = "Welcome to JD Bath Fittings", 
  subtext = "Premium Quality • Innovative Design • Trusted Excellence",
  forceShow = false,
  onComplete = () => {}
}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    console.log('WelcomeIntro: Component mounted, initializing...');
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    console.log('WelcomeIntro: Reduced motion preference:', mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Clear any existing localStorage and always show the intro
    localStorage.removeItem('introSeen');
    setShouldShow(true);
    setIsVisible(true);
    console.log('WelcomeIntro: Animation should be visible now');
    
    // If reduced motion, show briefly then hide
    if (mediaQuery.matches) {
      console.log('WelcomeIntro: Reduced motion detected, showing for 2 seconds');
      setTimeout(() => {
        handleDismiss();
      }, 2000);
    } else {
      console.log('WelcomeIntro: Normal motion, showing for 6 seconds');
      // Auto-dismiss after animation sequence completes
      setTimeout(() => {
        handleDismiss();
      }, 6000); // 6 seconds total duration
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [forceShow]);

  const handleDismiss = () => {
    console.log('WelcomeIntro: Starting dismiss animation');
    // Remove localStorage setting to allow showing on every refresh
    setIsVisible(false);
    setTimeout(() => {
      console.log('WelcomeIntro: Component fully dismissed');
      setShouldShow(false);
      onComplete();
    }, 1000); // Give more time for exit animation
  };


  console.log('WelcomeIntro: Render - shouldShow:', shouldShow, 'isVisible:', isVisible);
  
  if (!shouldShow) {
    console.log('WelcomeIntro: Not showing (shouldShow is false)');
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-label="Welcome overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)'
          }}
        >
          {/* Main content container */}
          <motion.div 
            className="relative z-10 flex flex-col items-center text-center px-8 py-12 rounded-2xl max-w-lg mx-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Logo */}
            {logo && (
              <motion.div
                className="mb-6"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.0, type: "spring", bounce: 0.4, damping: 10 }}
              >
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto filter drop-shadow-lg"
                />
              </motion.div>
            )}

            {/* Heading */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.01em'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            >
              {heading}
            </motion.h1>

            {/* Divider */}
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mb-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.7, ease: "easeInOut" }}
            />

            {/* Subtext */}
            <motion.p
              className="text-lg text-gray-300 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.8, ease: "easeOut" }}
            >
              {subtext}
            </motion.p>

            {/* Loading dots */}
            <motion.div 
              className="mt-6 flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5, ease: "easeOut" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeIntro;
