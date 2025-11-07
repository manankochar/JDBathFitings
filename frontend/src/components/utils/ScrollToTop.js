import { useEffect, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Use useLayoutEffect for synchronous scroll before paint
  useLayoutEffect(() => {
    // Disable scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately - multiple methods for cross-browser support
    window.scrollTo(0, 0);
    window.scroll(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // For mobile browsers - force scroll on root element
    const root = document.getElementById('root');
    if (root) {
      root.scrollTop = 0;
    }
  }, [pathname]);

  // Additional useEffect for mobile browsers with more aggressive timing
  useEffect(() => {
    // Aggressive scroll reset function
    const forceScrollToTop = () => {
      // Method 1: window.scrollTo with options
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.scrollTo(0, 0);
      window.scroll(0, 0);
      
      // Method 2: Direct DOM manipulation
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
      }
      
      if (document.body) {
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
      }

      // Method 3: Root element (important for React apps)
      const root = document.getElementById('root');
      if (root) {
        root.scrollTop = 0;
        root.scrollLeft = 0;
      }

      // Method 4: All scrollable elements
      const scrollableElements = document.querySelectorAll('[style*="overflow"]');
      scrollableElements.forEach(el => {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      });
      
      // Method 5: Chakra UI containers (if present)
      const chakraContainers = document.querySelectorAll('.chakra-container, .chakra-stack, .chakra-box');
      chakraContainers.forEach(el => {
        el.scrollTop = 0;
      });
    };

    // Execute immediately
    forceScrollToTop();

    // Use requestAnimationFrame for next frame
    const rafId = requestAnimationFrame(() => {
      forceScrollToTop();
    });
    
    // Second RAF for iOS Safari
    const rafId2 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        forceScrollToTop();
      });
    });

    // Multiple timeouts for mobile browsers - extended for slower devices
    const timeouts = [
      setTimeout(forceScrollToTop, 0),
      setTimeout(forceScrollToTop, 1),
      setTimeout(forceScrollToTop, 10),
      setTimeout(forceScrollToTop, 50),
      setTimeout(forceScrollToTop, 100),
      setTimeout(forceScrollToTop, 200),
      setTimeout(forceScrollToTop, 300)
    ];

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafId2);
      timeouts.forEach(clearTimeout);
    };
  }, [pathname]);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setShowScrollTop(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const buttonStyles = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    color: '#475569',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    zIndex: 1000,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0)',
    opacity: showScrollTop ? 1 : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        style={buttonStyles}
        onClick={scrollToTop}
        onMouseEnter={(e) => {
          e.target.style.transform = showScrollTop ? 'translateY(-5px) scale(1.1)' : 'translateY(100px) scale(0)';
          e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
          e.target.style.background = 'rgba(255, 255, 255, 1)';
          e.target.style.color = '#1e293b';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = showScrollTop ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0)';
          e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
          e.target.style.color = '#475569';
        }}
        aria-label="Scroll to top"
        title="Back to top"
      >
        ↑
      </button>
    </>
  );
}

export default ScrollToTop;