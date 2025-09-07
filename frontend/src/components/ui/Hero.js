import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Elegant product carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    { 
      name: "Luxury Basin Collection", 
      subtitle: "Handcrafted Elegance",
      description: "Premium ceramic basins with gold accents",
      price: "₹25,000+",
      gradient: "linear-gradient(135deg, #fef7cd 0%, #fde68a 100%)"
    },
    { 
      name: "Smart Toilet Suite", 
      subtitle: "Technology Meets Comfort",
      description: "IoT-enabled intelligent bathroom systems",
      price: "₹85,000+",
      gradient: "linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)"
    },
    { 
      name: "Designer Faucets", 
      subtitle: "Architectural Beauty",
      description: "Precision-engineered water systems",
      price: "₹15,000+",
      gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
    },
    { 
      name: "Spa Shower Systems", 
      subtitle: "Wellness Experience",
      description: "Multi-function rainfall showers",
      price: "₹45,000+",
      gradient: "linear-gradient(135deg, #fae8ff 0%, #f3e8ff 100%)"
    }
  ];

  const features = [
    {
      icon: "✨",
      title: "Premium Materials",
      description: "Finest ceramics and metals sourced globally",
      detail: "German engineering standards"
    },
    {
      icon: "🎯",
      title: "Precision Crafted",
      description: "Meticulous attention to every detail",
      detail: "Handcrafted excellence"
    },
    {
      icon: "🌿",
      title: "Eco Conscious",
      description: "Sustainable and water-efficient designs",
      detail: "Green technology"
    },
    {
      icon: "🏆",
      title: "Award Winning",
      description: "Recognized for innovation and quality",
      detail: "Industry leader since 1995"
    }
  ];

  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 100%)',
      overflow: 'hidden',
      paddingBottom: '80px'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.02,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%2364748b' stroke-width='0.5'%3E%3Cpath d='M60 0L0 0 0 60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    mouseGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59,130,246,0.05) 0%, transparent 50%)`,
      transition: 'background 0.3s ease'
    },
    floatingParticle: {
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
      borderRadius: '50%',
      opacity: 0.6
    },
    mainContent: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '80px 16px 64px',
      width: '100%',
      boxSizing: 'border-box',
      '@media (max-width: 768px)': {
        padding: '60px 12px 48px'
      },
      '@media (max-width: 480px)': {
        padding: '40px 8px 32px'
      }
    },
    header: {
      textAlign: 'center',
      marginBottom: '80px',
      '@media (max-width: 768px)': {
        marginBottom: '60px'
      },
      '@media (max-width: 480px)': {
        marginBottom: '40px'
      }
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      borderRadius: '50px',
      padding: '16px 32px',
      marginTop: '40px',
      marginBottom: '32px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    },
    pulsingDot: {
      width: '8px',
      height: '8px',
      background: '#fbbf24',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    mainHeading: {
      fontSize: 'clamp(3rem, 8vw, 8rem)',
      fontWeight: '300',
      color: '#1e293b',
      lineHeight: '0.9',
      letterSpacing: '-0.02em',
      marginBottom: '32px'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #64748b 0%, #1e293b 50%, #64748b 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
      color: '#64748b',
      fontWeight: '300',
      fontStyle: 'italic',
      position: 'relative',
      display: 'inline-block'
    },
    description: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      color: '#64748b',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontWeight: '300'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 3fr',
      gap: '64px',
      alignItems: 'start',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr',
        gap: '48px'
      },
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '32px'
      },
      '@media (max-width: 480px)': {
        gridTemplateColumns: '1fr',
        gap: '24px'
      }
    },
    featureCard: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    featureIcon: {
      width: '56px',
      height: '56px',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      marginRight: '20px',
      flexShrink: 0,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    productShowcase: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    carouselContainer: {
      position: 'relative',
      height: '320px',
      marginBottom: '32px',
      overflow: 'hidden',
      borderRadius: '16px'
    },
    carouselSlide: {
      display: 'flex',
      height: '100%',
      transform: `translateX(-${currentSlide * 100}%)`,
      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    slideContent: {
      minWidth: '100%',
      height: '100%',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.5)',
      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    slidePattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000'%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    indicators: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '32px'
    },
    indicator: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#cbd5e1',
      cursor: 'pointer',
      transition: 'all 0.5s ease',
      border: 'none'
    },
    indicatorActive: {
      background: '#64748b',
      width: '32px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    buttonPrimary: {
      background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
      color: 'white',
      fontWeight: '500',
      padding: '16px 32px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(30,41,59,0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonSecondary: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid #cbd5e1',
      color: '#1e293b',
      fontWeight: '500',
      padding: '16px 32px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginTop: '32px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginTop: '24px'
      },
      '@media (max-width: 480px)': {
        gridTemplateColumns: '1fr',
        gap: '12px',
        marginTop: '20px'
      }
    },
    statCard: {
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.3s ease'
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '96px',
      marginBottom: '64px'
    },
    ctaContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '24px',
      background: 'linear-gradient(135deg, #fef7cd 0%, #fde68a 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      borderRadius: '50px',
      padding: '24px 48px',
      boxShadow: '0 20px 40px rgba(251, 191, 36, 0.2)',
      position: 'relative'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      color: 'white',
      fontWeight: '600',
      padding: '12px 32px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(251, 191, 36, 0.3)'
    }
  };

  // Floating particles animation
  const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
      const newParticles = [];
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 10,
          delay: Math.random() * 8,
          duration: 15 + Math.random() * 10
        });
      }
      setParticles(newParticles);
    }, []);

    return (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              ...styles.floatingParticle,
              left: `${particle.x}px`,
              animationName: 'floatUp',
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          />
        ))}
      </div>
    );
  };

  // Floating geometric shapes
  const FloatingShapes = () => {
    const shapes = [];
    for (let i = 0; i < 8; i++) {
      shapes.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 20 + Math.random() * 20,
        isCircle: i % 2 === 0
      });
    }

    return (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.05 }}>
        {shapes.map(shape => (
          <div
            key={shape.id}
            style={{
              position: 'absolute',
              left: `${shape.x}px`,
              top: `${shape.y}px`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              border: '2px solid #64748b',
              borderRadius: shape.isCircle ? '50%' : '0',
              transform: shape.isCircle ? 'none' : 'rotate(45deg)',
              animationName: 'floatRotate',
              animationDuration: `${20 + Math.random() * 10}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        
        @keyframes floatRotate {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-50px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }
        
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .text-responsive {
            font-size: clamp(2rem, 8vw, 4rem) !important;
          }
          .main-content {
            padding: 60px 12px 40px !important;
          }
          .hero-heading {
            font-size: clamp(2.5rem, 9vw, 5rem) !important;
            line-height: 0.95 !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            margin-bottom: 24px !important;
          }
          .hero-subtitle {
            font-size: clamp(1rem, 4vw, 1.4rem) !important;
            padding: 0 8px !important;
          }
          .hero-description {
            font-size: clamp(0.9rem, 3vw, 1.2rem) !important;
            padding: 0 8px !important;
            margin-bottom: 32px !important;
          }
          .feature-cards {
            margin-bottom: 24px !important;
          }
          
          .feature-card {
            padding: 16px !important;
            margin-bottom: 12px !important;
            border-radius: 12px !important;
          }
          
          .feature-icon {
            width: 44px !important;
            height: 44px !important;
            margin-right: 12px !important;
          }
          
          .contact-card {
            padding: 12px !important;
          }
          
          .contact-card h4 {
            font-size: 16px !important;
            margin-bottom: 12px !important;
          }
          
          .contact-card .contact-item {
            font-size: 12px !important;
            margin-bottom: 8px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            gap: 2px !important;
          }
          
          .contact-card .contact-item span {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }
          .product-showcase {
            margin-top: 24px !important;
            padding: 0 8px !important;
          }
          
          .product-showcase h3 {
            font-size: 20px !important;
            margin-bottom: 8px !important;
          }
          
          .product-showcase p {
            font-size: 12px !important;
            padding: 0 4px !important;
          }
          
          .carousel-container {
            height: 220px !important;
            margin-bottom: 20px !important;
          }
          
          .slide-content h4 {
            font-size: 18px !important;
            margin-bottom: 6px !important;
          }
          
          .slide-content .subtitle {
            font-size: 12px !important;
            margin-bottom: 8px !important;
          }
          
          .slide-content .description {
            font-size: 11px !important;
            margin-bottom: 12px !important;
            line-height: 1.4 !important;
          }
          
          .slide-content .price {
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .grid-responsive {
            gap: 24px !important;
          }
          .main-content {
            padding: 40px 8px 32px !important;
          }
          .hero-heading {
            font-size: clamp(2rem, 8vw, 4rem) !important;
            line-height: 1 !important;
            margin-bottom: 20px !important;
          }
          .hero-subtitle {
            font-size: clamp(0.9rem, 3.5vw, 1.2rem) !important;
            padding: 0 4px !important;
          }
          .hero-description {
            font-size: clamp(0.85rem, 2.5vw, 1.1rem) !important;
            padding: 0 4px !important;
            margin-bottom: 24px !important;
          }
          .badge-mobile {
            padding: 8px 16px !important;
            margin-bottom: 20px !important;
            font-size: 12px !important;
            max-width: 90% !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .cta-section {
            margin-top: 48px !important;
          }
          .responsive-button-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
        
        @media (max-width: 320px) {
          .main-content {
            padding: 32px 6px 24px !important;
          }
          .hero-heading {
            font-size: clamp(1.75rem, 7vw, 3rem) !important;
          }
          .grid-responsive {
            gap: 20px !important;
          }
          .responsive-button-grid {
            gap: 10px !important;
          }
          .product-showcase {
            padding: 0 4px !important;
          }
          .slide-content h4 {
            font-size: 16px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .slide-content .description {
            font-size: 10px !important;
            padding: 0 8px !important;
          }
          .contact-card {
            padding: 8px !important;
          }
        }
      `}</style>
      
      <div style={styles.container}>
        
        {/* Background Elements */}
        <div style={styles.backgroundPattern} />
        <div style={styles.mouseGradient} />
        <FloatingShapes />
        <FloatingParticles />

        <div style={styles.mainContent} className="main-content">
          
          {/* Elegant Header */}
          <div style={styles.header}>
            
            {/* Premium Badge */}
            <div 
              className="badge-mobile"
              style={{
                ...styles.badge,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.8s ease',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <div style={styles.pulsingDot} />
              <span style={{ 
                color: '#475569', 
                fontWeight: '500', 
                letterSpacing: '0.025em',
                fontSize: 'clamp(11px, 2.5vw, 14px)',
                textAlign: 'center'
              }}>
                Crafting Luxury Since 1995
              </span>
              <div style={{ 
                height: '12px', 
                width: '1px', 
                background: '#cbd5e1',
                display: isMobile ? 'none' : 'block'
              }} />
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '3px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ 
                    color: '#fbbf24', 
                    fontSize: 'clamp(10px, 2vw, 12px)' 
                  }}>★</span>
                ))}
                <span style={{ 
                  color: '#64748b', 
                  fontSize: 'clamp(10px, 2vw, 12px)', 
                  marginLeft: '4px', 
                  fontWeight: '500' 
                }}>4.9</span>
              </div>
            </div>

            {/* Elegant Main Heading */}
            <div style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s ease 0.3s',
              marginBottom: '32px'
            }}>
              <h1 style={styles.mainHeading} className="hero-heading">
                <div style={{ position: 'relative' }}>
                  JANKIDAS
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 1.5s ease 1s'
                  }} />
                </div>
                <div style={styles.gradientText}>
                  SANITARYWARE
                </div>
                <div style={{
                  ...styles.gradientText,
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  marginTop: '16px',
                  background: 'linear-gradient(135deg, #64748b 0%, #1e293b 50%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '800',
                  letterSpacing: '-0.02em'
                }}>
                  AND BATH FITTINGS
                </div>
              </h1>
              
              <div style={{
                position: 'relative',
                display: 'inline-block',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.8s ease 0.8s'
              }}>
                <p style={styles.subtitle} className="hero-subtitle">
                  Crafting Luxury Since 1995
                </p>
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-32px',
                  fontSize: '32px',
                  opacity: 0.2,
                  transform: 'rotate(12deg)'
                }}>
                  ✨
                </div>
              </div>
            </div>

            {/* Sophisticated Description */}
            <p style={{
              ...styles.description,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.6s'
            }} className="hero-description">
              Where <em style={{ color: '#1e293b', fontWeight: '500' }}>German precision</em> meets 
              <em style={{ color: '#1e293b', fontWeight: '500' }}> timeless design</em>. 
              Experience sanitaryware that transforms bathrooms into sanctuaries of luxury and comfort.
            </p>
          </div>

          {/* Main Content Layout */}
          <div style={styles.gridContainer} className="grid-responsive">
            
            {/* Left Column - Features */}
            <div className="feature-cards">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="feature-card"
                  style={{
                    ...styles.featureCard,
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
                    transitionDelay: `${0.8 + index * 0.15}s`,
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.5)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.5)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.featureIcon} className="feature-icon">
                    {feature.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '600', 
                      color: '#1e293b', 
                      marginBottom: '8px',
                      transition: 'color 0.3s ease'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{ 
                      color: '#64748b', 
                      marginBottom: '12px', 
                      lineHeight: '1.6' 
                    }}>
                      {feature.description}
                    </p>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#f59e0b' 
                    }}>
                      <div style={{ 
                        width: '6px', 
                        height: '6px', 
                        background: '#fbbf24', 
                        borderRadius: '50%' 
                      }} />
                      {feature.detail}
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Information */}
              <div 
                className="feature-card contact-card"
                style={{
                  ...styles.featureCard,
                  background: 'linear-gradient(135deg, #fef7cd 0%, #fde68a 100%)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '1.4s',
                  position: 'relative'
                }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '48px',
                  opacity: 0.1,
                  transform: 'rotate(12deg)'
                }}>
                  📞
                </div>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1e293b', 
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>✨</span> 
                  Expert Consultation Available
                </h4>
                <div style={{ fontSize: '14px' }}>
                  {[
                    { label: 'Phone', value: '+91-8527161330' },
                    { label: 'Email', value: 'jd95royal@gmail.com' },
                    { label: 'Showroom', value: 'Chawri Bazar, Delhi' }
                  ].map((contact, i) => (
                    <div key={i} className="contact-item" style={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      justifyContent: isMobile ? 'flex-start' : 'space-between',
                      marginBottom: i < 2 ? '12px' : '0',
                      gap: isMobile ? '2px' : '8px'
                    }}>
                      <span style={{ 
                        color: '#64748b',
                        fontSize: isMobile ? '11px' : '14px',
                        fontWeight: '600'
                      }}>{contact.label}:</span>
                      <span style={{ 
                        color: '#1e293b', 
                        fontWeight: '500',
                        fontSize: isMobile ? '11px' : '14px',
                        wordBreak: 'break-all',
                        lineHeight: '1.3'
                      }}>{contact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Product Showcase */}
            <div 
              className="product-showcase"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 1s ease 1s'
              }}>
              {/* Main Product Display */}
              <div style={styles.productShowcase}>
                
                <div style={{ position: 'relative' }}>
                  {/* Header */}
                  <div style={{ 
                    textAlign: 'center', 
                    marginBottom: isMobile ? '20px' : '32px',
                    padding: isMobile ? '0 8px' : '0'
                  }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '20px' : '28px', 
                      fontWeight: '300', 
                      color: '#1e293b', 
                      marginBottom: isMobile ? '8px' : '12px',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      Featured Collections
                    </h3>
                    <p style={{ 
                      color: '#64748b',
                      fontSize: isMobile ? '12px' : '16px',
                      lineHeight: '1.5',
                      padding: isMobile ? '0 4px' : '0'
                    }}>
                      Curated premium sanitaryware for discerning homes
                    </p>
                  </div>
                  
                  {/* Elegant Product Carousel */}
                  <div style={{
                    ...styles.carouselContainer,
                    height: isMobile ? '280px' : '320px',
                    marginBottom: isMobile ? '20px' : '32px'
                  }} className="carousel-container">
                    <div style={styles.carouselSlide}>
                      {products.map((product, index) => (
                        <div key={index} style={styles.slideContent} className="slide-content">
                          <div style={{ 
                            width: '100%', 
                            height: '100%', 
                            background: product.gradient, 
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.5)'
                          }}>
                            
                            <div style={styles.slidePattern} />
                            
                            <div style={{ 
                              position: 'relative', 
                              textAlign: 'center', 
                              color: '#1e293b', 
                              maxWidth: isMobile ? '100%' : '400px',
                              margin: '0 auto',
                              padding: isMobile ? '0 12px' : '0 20px',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word'
                            }}>
                              <div style={{ 
                                fontSize: isMobile ? '40px' : '64px', 
                                marginBottom: isMobile ? '16px' : '24px', 
                                opacity: 0.2 
                              }}>
                                {index === 0 ? '🚿' : index === 1 ? '🚽' : index === 2 ? '🚰' : '💧'}
                              </div>
                              <h4 style={{ 
                                fontSize: isMobile ? '18px' : '24px', 
                                fontWeight: '500', 
                                marginBottom: isMobile ? '6px' : '8px',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                lineHeight: '1.2'
                              }}>
                                {product.name}
                              </h4>
                              <p className="subtitle" style={{ 
                                color: '#475569', 
                                marginBottom: isMobile ? '8px' : '12px', 
                                fontWeight: '300', 
                                fontStyle: 'italic',
                                fontSize: isMobile ? '12px' : '16px',
                                lineHeight: '1.3'
                              }}>
                                {product.subtitle}
                              </p>
                              <p className="description" style={{ 
                                color: '#64748b', 
                                fontSize: isMobile ? '11px' : '14px',
                                marginBottom: isMobile ? '12px' : '16px', 
                                lineHeight: isMobile ? '1.4' : '1.6',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word'
                              }}>
                                {product.description}
                              </p>
                              <div style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: isMobile ? '4px' : '8px', 
                                background: 'rgba(255,255,255,0.5)', 
                                backdropFilter: 'blur(10px)', 
                                padding: isMobile ? '6px 12px' : '8px 16px', 
                                borderRadius: '50px', 
                                border: '1px solid rgba(255,255,255,0.3)' 
                              }}>
                                <span className="price" style={{ 
                                  color: '#1e293b', 
                                  fontWeight: '600',
                                  fontSize: isMobile ? '12px' : '16px'
                                }}>
                                  {product.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Elegant Slide Indicators */}
                  <div style={{
                    ...styles.indicators,
                    marginBottom: isMobile ? '20px' : '32px',
                    gap: isMobile ? '8px' : '12px'
                  }}>
                    {products.map((_, index) => (
                      <button
                        key={index}
                        style={{
                          ...styles.indicator,
                          ...(index === currentSlide ? styles.indicatorActive : {}),
                          width: isMobile ? '6px' : '8px',
                          height: isMobile ? '6px' : '8px',
                          minHeight: isMobile ? '44px' : 'auto',
                          minWidth: isMobile ? '44px' : 'auto',
                          padding: isMobile ? '18px' : '0'
                        }}
                        onClick={() => setCurrentSlide(index)}
                        onMouseEnter={(e) => {
                          if (index !== currentSlide) {
                            e.target.style.background = '#94a3b8';
                            e.target.style.transform = 'scale(1.2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (index !== currentSlide) {
                            e.target.style.background = '#cbd5e1';
                            e.target.style.transform = 'scale(1)';
                          }
                        }}
                      />
                    ))}
                  </div>

                  {/* Premium Action Buttons */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: isMobile ? '12px' : '16px',
                    padding: isMobile ? '0 8px' : '0'
                  }} className="responsive-button-grid">
                    <button
                      style={{
                        ...styles.buttonPrimary,
                        fontSize: isMobile ? '14px' : '16px',
                        padding: isMobile ? '12px 20px' : '16px 32px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 15px 35px rgba(30,41,59,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 25px rgba(30,41,59,0.3)';
                      }}
                    >
                      <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: '-100%', 
                        width: '100%', 
                        height: '100%', 
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', 
                        transition: 'left 0.6s ease' 
                      }} />
                      <span style={{ 
                        position: 'relative', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: isMobile ? '4px' : '8px',
                        fontSize: isMobile ? '14px' : '16px'
                      }}>
                        <span>{isMobile ? 'Explore' : 'Explore Collection'}</span>
                        <span style={{ fontSize: isMobile ? '16px' : '18px' }}>→</span>
                      </span>
                    </button>
                    
                    <button
                      style={{
                        ...styles.buttonSecondary,
                        fontSize: isMobile ? '14px' : '16px',
                        padding: isMobile ? '12px 20px' : '16px 32px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 1)';
                        e.target.style.borderColor = '#94a3b8';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                        e.target.style.borderColor = '#cbd5e1';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <span style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: isMobile ? '4px' : '8px',
                        fontSize: isMobile ? '14px' : '16px'
                      }}>
                        <span>{isMobile ? 'Showroom' : 'Visit Showroom'}</span>
                        <span style={{ fontSize: isMobile ? '16px' : '18px' }}>📍</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Elegant Stats Grid */}
              <div style={{
                ...styles.statsGrid,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease 1.6s'
              }}>
                {[
                  { number: "500+", label: "Premium Products", icon: "✨" },
                  { number: "28", label: "Years Excellence", icon: "🏆" },
                  { number: "15K+", label: "Satisfied Clients", icon: "💎" }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.3 }}>
                      {stat.icon}
                    </div>
                    <div style={{ 
                      fontSize: '28px', 
                      fontWeight: '300', 
                      color: '#1e293b', 
                      marginBottom: '8px' 
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ 
                      color: '#64748b', 
                      fontSize: '14px', 
                      fontWeight: '500' 
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Elegant CTA */}
          <div 
            className="cta-section"
            style={{
              ...styles.ctaSection,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s ease 2s'
            }}>
            <div style={styles.ctaContainer}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                borderRadius: '50px'
              }} />
              <div style={{ 
                position: 'relative', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '24px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: '#fbbf24', 
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)' 
                }} />
                <span style={{ 
                  color: '#1e293b', 
                  fontWeight: '500', 
                  fontSize: '18px' 
                }}>
                  Ready to experience luxury?
                </span>
                <button
                  style={styles.ctaButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateX(5px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(251, 191, 36, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateX(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(251, 191, 36, 0.3)';
                  }}
                >
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px' 
                  }}>
                    Begin Your Journey
                    <span style={{ 
                      display: 'inline-block',
                      animation: 'floatArrow 1.5s ease-in-out infinite'
                    }}>
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </>
  );
};

export default Hero;