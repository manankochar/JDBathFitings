import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
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