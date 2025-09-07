import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestWelcome = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log('TestWelcome: Component mounted');
    
    // Auto-hide after 8 seconds
    const timer = setTimeout(() => {
      console.log('TestWelcome: Auto-hiding after 8 seconds');
      setShow(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  console.log('TestWelcome: Rendering, show =', show);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <motion.div
            className="text-center text-white"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="mb-4"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.0, duration: 1.5, type: "spring", bounce: 0.4 }}
            >
              <img 
                src="/jankidas-logo.png" 
                alt="Logo" 
                className="w-24 h-24 mx-auto object-contain"
              />
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 1.0, ease: "easeOut" }}
            >
              JD Bath Fittings
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 1.0, ease: "easeOut" }}
            >
              Premium Quality • Innovative Design
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestWelcome;
