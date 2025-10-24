import React, { useEffect, useState } from 'react';
import { colors, gradients, shadows } from '../../theme/colors';

const Hero = () => {
  // Rotating words for the animated heading
  const rotatingWords = [
    "Luxury Sanitaryware",
    "Sustainable Design",
    "Engineered to Endure",
    "Inspired Living"
  ];

  // Product carousel data
  const products = [
    {
      name: "ITA Blue Berry",
      subtitle: "Vibrant Elegance",
      description: "Bold blue tones with sophisticated design.",
      image: "/images/ITA BLue Berry.png",
      gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
    },
    {
      name: "Femina",
      subtitle: "Graceful Beauty",
      description: "Elegant curves with feminine sophistication.",
      image: "/images/Femina.png",
      gradient: "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%)"
    },
    {
      name: "Alaska",
      subtitle: "Arctic Purity",
      description: "Clean lines with pristine white finish.",
      image: "/images/Alaska.png",
      gradient: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
    },
    {
      name: "Star",
      subtitle: "Stellar Performance",
      description: "Premium quality with star-rated efficiency.",
      image: "/images/Star.png",
      gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel every 4 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, products.length]);

  // Cycle through rotatingWords every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: "🪨",
      title: "Premium Materials",
      description: "Finest ceramics & metals sourced globally",
      detail: "German engineering, world-class quality"
    },
    {
      icon: "🛠️",
      title: "Precision Crafted",
      description: "Meticulous attention to every detail",
      detail: "Hand-finished, artisan excellence"
    },
    {
      icon: "🌱",
      title: "Eco Conscious",
      description: "Sustainable, water-efficient innovation",
      detail: "Advanced green technology"
    },
    {
      icon: "🥇",
      title: "Award Winning",
      description: "Recognized for innovation & quality",
      detail: "Industry leader since 1995"
    }
  ];
    
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const styles = {
    container: {
      position: 'relative',
      minHeight: 'auto',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflow: 'hidden',
      paddingBottom: '80px',
      zIndex: 1,
      backgroundColor: '#FFF' // solid background for lower half when video ends
    },
    // New wrapper that limits video height to upper portion only
    videoContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '50vh', // video occupies upper 50%
      overflow: 'hidden',
      zIndex: 0,
      '@media (max-width: 768px)': {
        height: '45vh'
      },
      '@media (max-width: 480px)': {
        height: '40vh'
      }
    },
    videoBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%', // now fills only the videoContainer
      objectFit: 'cover',
      zIndex: 0,
      // Removed brightness filter to show original video colors
    },
    videoGradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '160px',
      // background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 60%, #000 100%)',
      pointerEvents: 'none',
      zIndex: 1
    },
    floatingParticle: {
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: gradients.accentLinear,
      borderRadius: '50%',
      opacity: 0.55
    },
    mainContent: {
      position: 'relative',
      zIndex: 10,
      margin: '0 auto',
      padding: '0 16px 64px',
      marginTop: '45vh',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflow: 'hidden',
      '@media (max-width: 768px)': {
        padding: '0 16px 60px',
        marginTop: '40vh',
        maxWidth: '100vw',
        overflow: 'hidden'
      },
      '@media (max-width: 480px)': {
        padding: '0 12px 48px',
        marginTop: '35vh',
        maxWidth: '100vw',
        overflow: 'hidden'
      }
    },
    futuristicSection: {
      position: 'relative',
      minHeight: 'auto',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '60px',
      alignItems: 'center',
      padding: '60px 0 40px',
      '@media (max-width: 980px)': {
        gridTemplateColumns: '1fr',
        gap: '40px',
        padding: '40px 0 30px',
        minHeight: 'auto'
      },
      '@media (max-width: 768px)': {
        padding: '30px 0 25px',
        gap: '30px'
      },
      '@media (max-width: 600px)': {
        padding: '25px 0 20px',
        gap: '25px'
      },
      '@media (max-width: 480px)': {
        padding: '20px 0 15px',
        gap: '20px'
      }
    },
    heroLeft: {
      position: 'relative',
      padding: '0 12px'
    },
    futuristicHeading: {
      fontSize: 'clamp(2.8rem,7vw,5rem)',
      fontWeight: 800,
      letterSpacing: '0.05em',
      lineHeight: 0.95,
      margin: 0,
      background: gradients.accentText,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative',
      filter: 'drop-shadow(0 4px 18px rgba(255,255,255,0.08))'
    },
    scanLine: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
      mixBlendMode: 'overlay',
      animation: 'scanMove 5s linear infinite'
    },
    subDeck: {
      marginTop: '28px',
      fontSize: 'clamp(1.05rem,2vw,1.45rem)',
      color: '#475569',
      fontWeight: 300,
      lineHeight: 1.5,
      maxWidth: '640px'
    },
    rotatingContainer: {
      marginTop: '34px',
      letterSpacing: '0.6rem',
      fontSize: 'clamp(0.85rem,1.4vw,1.1rem)',
      fontWeight: 500,
      display: 'flex',
      gap: '14px',
      flexWrap: 'wrap'
    },
    rotatingWord: {
      position: 'relative',
      minWidth: '220px',
      textAlign: 'left',
      fontSize: 'clamp(1.1rem,2vw,1.6rem)',
      letterSpacing: '0.5rem',
      fontWeight: 400,
      color: '#0f172a'
    },
    rotatingWordInner: {
      display: 'inline-block',
      animation: 'wordFade 2.6s ease-in-out forwards',
      background: `linear-gradient(90deg,#1e293b,#0f172a,${colors.accent})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    heroRight: {
      position: 'relative',
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))'
    },
    rightCard: {
      position: 'relative',
      padding: '14px',
      borderRadius: '8px',
      border: '1px solid rgba(226,232,240,0.8)',
      background: '#ffffff',
      boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
      overflow: 'hidden',
      width: '100%',
      aspectRatio: '1 / 1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    rightCardAccent: {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle at 30% 20%, ${colors.accentGlow}, transparent 60%)`,
      opacity: 0,
      transition: 'opacity .5s'
    },
    rightCardTitle: {
      fontSize: '0.68rem',
      letterSpacing: '0.18rem',
      fontWeight: 600,
      color: '#475569',
      marginBottom: '8px'
    },
    rightCardValue: {
      fontSize: '2rem',
      fontWeight: 800,
      letterSpacing: '0.01em',
      color: '#0f172a'
    },
    rightCardFoot: {
      fontSize: '0.65rem',
      letterSpacing: '0.3rem',
      textTransform: 'uppercase',
      marginTop: '14px',
      color: '#475569'
    },
    header: {
      textAlign: 'center',
      marginBottom: '80px',
      '@media (max-width: 768px)': {
        marginBottom: '80px'
      },
      '@media (max-width: 480px)': {
        marginBottom: '60px'
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
      background: colors.accent,
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    mainHeading: {
      fontSize: 'clamp(3rem, 8vw, 8rem)',
      fontWeight: '300',
      color: '#1e293b',
      lineHeight: '0.9',
      letterSpacing: '-0.02em',
      marginBottom: '32px',
      display: 'none' // hidden since hero text removed
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
      display: 'none'
    },
    description: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      color: '#64748b',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontWeight: '300',
      display: 'none'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 3fr',
      gap: '64px',
      alignItems: 'start',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr',
        gap: '48px',
        width: '100%',
        maxWidth: '100%'
      },
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '32px',
        width: '100%',
        maxWidth: '100%'
      },
      '@media (max-width: 480px)': {
        gridTemplateColumns: '1fr',
        gap: '20px',
        width: '100%',
        maxWidth: '100%'
      }
    },
    featureCard: {
      position: 'relative',
      background: '#ffffff',
      border: '1px solid rgba(226,232,240,0.8)',
      borderRadius: '16px',
      padding: '24px 20px 20px 20px',
      marginBottom: '24px',
      transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, opacity 0.6s ease, filter 0.35s ease',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(15,23,42,0.06)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '180px',
      textAlign: 'center',
      overflow: 'hidden',
    },
    featureBorder: {
      position: 'absolute',
      inset: 0,
      padding: '1px',
      borderRadius: '16px',
      background: 'conic-gradient(from 0deg, #0ea5e9, #a855f7, #f59e0b, #0ea5e9)',
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      animation: 'borderSpin 6s linear infinite',
      pointerEvents: 'none'
    },
    featureAccent: {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(60% 60% at 50% 0%, ${colors.accent}15 0%, transparent 60%)`,
      opacity: 0,
      transition: 'opacity .35s ease',
      pointerEvents: 'none'
    },
    featureHoloSheen: {
      position: 'absolute',
      top: 0,
      left: '-120%',
      width: '120%',
      height: '100%',
      background: 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.28) 55%, transparent 100%)',
      transform: 'skewX(-18deg)',
      filter: 'blur(0.5px)',
      animation: 'sheen 3.2s ease-in-out infinite',
      pointerEvents: 'none'
    },
    featureCornerOrb: {
      position: 'absolute',
      right: '-16px',
      bottom: '-16px',
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${colors.accent} 0%, ${colors.accent}66 30%, transparent 70%)`,
      filter: 'blur(8px) saturate(130%)',
      opacity: 0.25,
      animation: 'glow 4.8s ease-in-out infinite',
      pointerEvents: 'none'
    },
    featureIcon: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.2rem',
      marginBottom: '18px',
      boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
      color: '#1e293b',
      animation: 'bob 3.2s ease-in-out infinite'
    },
    featureTitle: {
      fontSize: '1.18rem',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '7px',
      letterSpacing: '0.01em',
    },
    featureDescription: {
      fontSize: '1.01rem',
      color: '#475569',
      fontWeight: 400,
      marginBottom: '4px',
      lineHeight: 1.4,
    },
    featureDetail: {
      fontSize: '0.97rem',
      color: '#64748b',
      fontWeight: 500,
      marginTop: '2px',
      lineHeight: 1.3,
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
      borderRadius: '16px',
      cursor: 'grab',
      userSelect: 'none',
      touchAction: 'pan-y',
      '@media (max-width: 768px)': {
        height: '320px',
        marginBottom: '32px'
      },
      '@media (max-width: 480px)': {
        height: '280px',
        marginBottom: '28px'
      }
    },
    carouselSlide: {
      display: 'flex',
      height: '100%',
      transform: `translateX(-${currentSlide * 100}%)`,
      transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      willChange: 'transform'
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
      border: 'none',
      minWidth: '44px',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '@media (max-width: 480px)': {
        minWidth: '48px',
        minHeight: '48px'
      }
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
      overflow: 'hidden',
      minHeight: '48px',
      '@media (max-width: 768px)': {
        padding: '16px 28px',
        minHeight: '56px'
      },
      '@media (max-width: 480px)': {
        padding: '14px 24px',
        minHeight: '60px',
        fontSize: '16px'
      }
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
      transition: 'all 0.3s ease',
      minHeight: '48px',
      '@media (max-width: 768px)': {
        padding: '16px 28px',
        minHeight: '56px'
      },
      '@media (max-width: 480px)': {
        padding: '14px 24px',
        minHeight: '60px',
        fontSize: '16px'
      }
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
      background: '#ffffff',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '8px',
      padding: '10px',
      transition: 'all 0.3s ease',
      aspectRatio: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '96px',
      marginBottom: '24px'
    },
    ctaContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '24px',
      background: gradients.ctaPill,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${colors.accent}55`,
      borderRadius: '50px',
      padding: '24px 48px',
      boxShadow: '0 20px 40px rgba(34,4,56,0.25)',
      position: 'relative'
    },
    ctaButton: {
      background: gradients.accentLinear,
      color: 'white',
      fontWeight: '600',
      padding: '12px 32px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: shadows?.accentSoft || '0 8px 25px rgba(34,4,56,0.3)'
    }
  };


  return (
    <>
      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
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
        @keyframes scanMove { 0% { transform: translateY(-100%);} 100% { transform: translateY(100%);} }
        @keyframes wordFade { 0% { opacity:0; transform:translateY(12px);} 15% {opacity:1; transform:translateY(0);} 85% {opacity:1;} 100% {opacity:0; transform:translateY(-10px);} }
        @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .text-responsive {
            font-size: clamp(2.5rem, 10vw, 5rem) !important;
          }
          .main-content {
            padding: 80px 16px 60px !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .hero-heading {
            font-size: clamp(3.5rem, 12vw, 7rem) !important;
            line-height: 0.9 !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            margin-bottom: 32px !important;
          }
          .hero-subtitle {
            font-size: clamp(1.2rem, 5vw, 1.8rem) !important;
            padding: 0 12px !important;
          }
          .hero-description {
            font-size: clamp(1rem, 4vw, 1.4rem) !important;
            padding: 0 12px !important;
            margin-bottom: 48px !important;
          }
          .feature-cards {
            margin-bottom: 32px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            order: 2 !important;
          }
          
          .feature-card {
            padding: 20px !important;
            margin-bottom: 0 !important;
            border-radius: 16px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            min-height: 140px !important;
          }
          
          .feature-icon {
            width: 48px !important;
            height: 48px !important;
            margin-right: 12px !important;
            flex-shrink: 0 !important;
          }
          
          .contact-card {
            padding: 12px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            grid-column: 1 / -1 !important;
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
            margin-top: 32px !important;
            padding: 0 12px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            order: 1 !important;
          }
          
          .product-showcase h3 {
            font-size: 24px !important;
            margin-bottom: 12px !important;
          }
          
          .product-showcase p {
            font-size: 14px !important;
            padding: 0 8px !important;
          }
          
          .carousel-container {
            height: 320px !important;
            margin-bottom: 32px !important;
          }
          
          .slide-content h4 {
            font-size: 22px !important;
            margin-bottom: 8px !important;
          }
          
          .slide-content .subtitle {
            font-size: 14px !important;
            margin-bottom: 10px !important;
          }
          
          .slide-content .description {
            font-size: 13px !important;
            margin-bottom: 16px !important;
            line-height: 1.5 !important;
          }
          
          .slide-content .price {
            font-size: 14px !important;
          }
          
          .responsive-button-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        
        @media (max-width: 480px) {
          .grid-responsive {
            gap: 32px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .main-content {
            padding: 60px 12px 48px !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .hero-heading {
            font-size: clamp(2.5rem, 10vw, 5rem) !important;
            line-height: 0.95 !important;
            margin-bottom: 28px !important;
          }
          .hero-subtitle {
            font-size: clamp(1rem, 4vw, 1.4rem) !important;
            padding: 0 8px !important;
          }
          .hero-description {
            font-size: clamp(0.9rem, 3vw, 1.2rem) !important;
            padding: 0 8px !important;
            margin-bottom: 40px !important;
          }
          .badge-mobile {
            padding: 12px 20px !important;
            margin-bottom: 24px !important;
            font-size: 13px !important;
            max-width: 95% !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .cta-section {
            margin-top: 60px !important;
          }
          .responsive-button-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .carousel-container {
            height: 280px !important;
            margin-bottom: 28px !important;
          }
          .slide-content h4 {
            font-size: 20px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .slide-content .description {
            font-size: 12px !important;
            padding: 0 12px !important;
          }
          .contact-card {
            padding: 16px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            grid-column: 1 / -1 !important;
          }
          .feature-card {
            padding: 16px !important;
            margin-bottom: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            min-height: 120px !important;
          }
          .feature-icon {
            width: 44px !important;
            height: 44px !important;
            margin-right: 12px !important;
            flex-shrink: 0 !important;
          }
          .feature-cards {
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
            order: 2 !important;
          }
        }
        
        @media (max-width: 320px) {
          .main-content {
            padding: 48px 8px 36px !important;
          }
          .hero-heading {
            font-size: clamp(2rem, 8vw, 4rem) !important;
          }
          .grid-responsive {
            gap: 28px !important;
          }
          .responsive-button-grid {
            gap: 14px !important;
          }
          .product-showcase {
            padding: 0 8px !important;
          }
          .slide-content h4 {
            font-size: 18px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .slide-content .description {
            font-size: 11px !important;
            padding: 0 10px !important;
          }
          .contact-card {
            padding: 12px !important;
          }
        }
      `}</style>
      
      <div style={styles.container}>
        {/* Limited Height Video Background (upper portion only) */}
        <div style={styles.videoContainer}>
          <video
            style={styles.videoBg}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={require('../../assets/bgVideo.mp4')} type="video/mp4" />
          </video>
          {/* Gradient fade so lower half is solid background */}
          <div style={styles.videoGradientOverlay} />
          {/* Minimal overlay hint */}
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
            <div style={{
              fontSize:'clamp(2.5rem,6vw,5rem)',
              fontWeight:900,
              letterSpacing:'0.6rem',
              background:`linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65), ${colors.accent}E6)`,
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              mixBlendMode:'overlay',
              opacity:0.25,
              textAlign:'center'
            }}></div>
          </div>
        </div>

        <div style={styles.mainContent} className="main-content">
          {/* Futuristic Statement Section */}
          <section style={{
            ...styles.futuristicSection,
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
            gap: isMobile ? '30px' : '60px',
            padding: isMobile ? '30px 0 25px' : '60px 0 40px'
          }}>
            <div style={styles.heroLeft}>
              
               <div style={styles.rotatingContainer}>
                <div style={styles.rotatingWord}>
                  <span key={wordIndex} style={styles.rotatingWordInner}>{rotatingWords[wordIndex]}</span>
                </div>
              </div>
              <p style={styles.subDeck}>
                Elevating everyday rituals with precision-crafted luxury sanitaryware engineered to endure and inspire. Where design intelligence fuses with sustainable performance.
              </p>
             {/* <h1
                style={{
                  ...styles.futuristicHeading,
                  transform: `translate3d(${(mousePosition.x-0.5)*16}px, ${(mousePosition.y-0.5)*12}px,0)`
                }}
              >
                R DIAMOND
                <span style={styles.scanLine} />
              </h1> */}
              <div style={{display:'flex', gap:'18px', marginTop:'20px', flexWrap:'wrap'}}>
                <button
                  style={{
                    background:'linear-gradient(135deg,#1e293b,#0f172a)',
                    color:'#fff',
                    border:'1px solid #334155',
                    padding:'16px 34px',
                    fontSize:'0.85rem',
                    letterSpacing:'0.25rem',
                    borderRadius:'14px',
                    fontWeight:600,
                    position:'relative',
                    overflow:'hidden',
                    cursor:'pointer'
                  }}
                  onMouseEnter={(e)=>{e.currentTarget.querySelector('.shine').style.left='120%';}}
                  onMouseLeave={(e)=>{e.currentTarget.querySelector('.shine').style.left='-120%';}}
                >
                  <span className='shine' style={{position:'absolute',top:0,left:'-120%',height:'100%',width:'120%',background:'linear-gradient(115deg, transparent, rgba(255,255,255,0.25), transparent)',transform:'skewX(-20deg)',transition:'left .8s ease'}} />
                  EXPLORE FUTURE →
                </button>
                <button
                  style={{
                    background:'rgba(255,255,255,0.55)',
                    backdropFilter:'blur(14px)',
                    border:'1px solid rgba(255,255,255,0.4)',
                    padding:'16px 34px',
                    fontSize:'0.85rem',
                    letterSpacing:'0.25rem',
                    borderRadius:'14px',
                    fontWeight:600,
                    color:'#0f172a',
                    cursor:'pointer',
                    position:'relative'
                  }}
                >VISIT SHOWROOM</button>
              </div>
            </div>
            <div style={{
              ...styles.heroRight,
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill,minmax(160px,1fr))',
              gap: isMobile ? '10px' : styles.heroRight.gap,
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              padding: isMobile ? '0 12px' : undefined,
              justifyItems: isMobile ? 'stretch' : 'center',
              alignItems: 'stretch',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {[{t:'YEARS',v:'28'},{t:'COLLECTIONS',v:'45+'},{t:'CLIENTS',v:'15K+'},{t:'WATER SAVINGS',v:'30%'}].map((itm,i)=>(
                <div key={i} style={styles.rightCard}
                  onMouseEnter={(e)=>{e.currentTarget.querySelector('.accent').style.opacity=1;}}
                  onMouseLeave={(e)=>{e.currentTarget.querySelector('.accent').style.opacity=0;}}
                >
                  <div className='accent' style={styles.rightCardAccent} />
                  <div style={styles.rightCardTitle}>{itm.t}</div>
                  <div style={styles.rightCardValue}>{itm.v}</div>
                  {!isMobile && <div style={styles.rightCardFoot}>ELEVATED</div>}
                </div>
              ))}
            </div>
          </section>

          {/* Main Content Layout */}
          <div style={styles.gridContainer} className="grid-responsive">
            
            {/* Left Column - Features */}
            {/* Redesigned Feature Cards */}
            <div className="feature-cards" style={{display:'grid',gap:isMobile?'14px':'18px',gridTemplateColumns:isMobile?'1fr 1fr':'1fr 1fr',width:'100%',marginTop:isMobile?'8px':'16px',padding:isMobile?'0 8px':'0 16px',boxSizing:'border-box'}}>
              {features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.featureCard,
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
                    transitionDelay: `${i * 80}ms`
                  }}
                  onMouseMove={(e)=>{
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width - 0.5;
                    const py = (e.clientY - rect.top) / rect.height - 0.5;
                    const rotateX = (-py) * 10; // tilt up/down
                    const rotateY = (px) * 10;  // tilt left/right
                    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    card.style.filter = 'drop-shadow(0 12px 28px rgba(15,23,42,0.18))';
                  }}
                  onMouseEnter={(e)=>{
                    const card=e.currentTarget; 
                    card.style.transform='translateY(-6px)';
                    card.style.boxShadow='0 18px 40px rgba(15,23,42,0.12)';
                    const acc=card.querySelector('.f-accent');
                    if(acc) acc.style.opacity=1;
                  }}
                  onMouseLeave={(e)=>{
                    const card=e.currentTarget; 
                    card.style.transform='translateY(0) rotateX(0deg) rotateY(0deg)';
                    card.style.boxShadow='0 10px 25px rgba(15,23,42,0.06)';
                    card.style.filter = 'none';
                    const acc=card.querySelector('.f-accent');
                    if(acc) acc.style.opacity=0;
                  }}
                >
                  <div style={styles.featureBorder} />
                  <div className='f-accent' style={styles.featureAccent} />
                  <div style={styles.featureHoloSheen} />
                  <div style={styles.featureCornerOrb} />
                  <div style={styles.featureIcon}>{f.icon}</div>
                  <div style={styles.featureTitle}>{f.title}</div>
                  <div style={styles.featureDescription}>{f.description}</div>
                  <div style={styles.featureDetail}>{f.detail}</div>
                </div>
              ))}
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
                    height: isMobile ? '240px' : '320px',
                    marginBottom: isMobile ? '20px' : '32px'
                  }} 
                  className="carousel-container"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={(e) => {
                    setIsPaused(true);
                    const touchStart = e.touches[0].clientX;
                    e.currentTarget.touchStartX = touchStart;
                  }}
                  onTouchEnd={(e) => {
                    setIsPaused(false);
                    const touchEnd = e.changedTouches[0].clientX;
                    const touchStart = e.currentTarget.touchStartX;
                    const swipeThreshold = 50;
                    
                    if (touchStart - touchEnd > swipeThreshold) {
                      // Swipe left - next slide
                      setCurrentSlide(prev => (prev + 1) % products.length);
                    } else if (touchEnd - touchStart > swipeThreshold) {
                      // Swipe right - previous slide
                      setCurrentSlide(prev => prev === 0 ? products.length - 1 : prev - 1);
                    }
                  }}
                  >
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
                              overflowWrap: 'break-word',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between'
                            }}>
                              {/* Product Image */}
                              <div style={{ 
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: isMobile ? '12px' : '16px'
                              }}>
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  style={{
                                    maxWidth: '80%',
                                    maxHeight: '180px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                                  }}
                                />
                              </div>
                              
                              {/* Product Info */}
                              <div>
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
                                  lineHeight: isMobile ? '1.4' : '1.6',
                                  wordWrap: 'break-word',
                                  overflowWrap: 'break-word'
                                }}>
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: isMobile ? '15px' : '20px'
                  }}>
                    <button
                      onClick={() => {
                        setCurrentSlide(prev => prev === 0 ? products.length - 1 : prev - 1);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 3000);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.3s ease',
                        fontSize: '18px',
                        color: '#4a5568'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 1)';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                      }}
                    >
                      ←
                    </button>
                    
                    <button
                      onClick={() => {
                        setCurrentSlide(prev => (prev + 1) % products.length);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 3000);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.3s ease',
                        fontSize: '18px',
                        color: '#4a5568'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 1)';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                      }}
                    >
                      →
                    </button>
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
                          width: isMobile ? '8px' : '8px',
                          height: isMobile ? '8px' : '8px',
                          minHeight: isMobile ? '48px' : '44px',
                          minWidth: isMobile ? '48px' : '44px',
                          padding: isMobile ? '20px' : '18px'
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
              <div style={{display:'flex',alignItems:'stretch',gap: isMobile ? '16px' : '32px',marginTop: isMobile ? '20px' : '32px',opacity: isLoaded ? 1 : 0,transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',transition: 'all 0.8s ease 1.6s'}}>
                {/* Decorative vertical accent and heading */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',minWidth:'70px',paddingTop:'8px'}}>
                  <div style={{width:'6px',height:'72px',borderRadius:'8px',background:colors.accent,marginBottom:'14px',boxShadow:`0 0 16px 2px ${colors.accent}44`}} />
                  <span style={{writingMode:'vertical-rl',textOrientation:'mixed',fontWeight:700,letterSpacing:'0.1em',fontSize:'1.1rem',color:'#2d225a',opacity:0.7}}>OUR IMPACT</span>
                </div>
                <div style={{
                  flex:1,
                  display:'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                  gap: isMobile ? '8px' : '16px'
                }}>
                  {[
                    { number: "500+", label: "Premium Products", icon: "✨" },
                    { number: "28", label: "Years Excellence", icon: "🏆" },
                    { number: "15K+", label: "Satisfied Clients", icon: "💎" },
                    { number: "30%", label: "Water Savings", icon: "💧" }
                  ].map((stat, index) => (
                    <div 
                      key={index} 
                      style={{
                        ...styles.statCard,
                        padding: isMobile ? '10px' : styles.statCard.padding,
                        aspectRatio: isMobile ? 'unset' : styles.statCard.aspectRatio,
                        minHeight: isMobile ? '120px' : undefined
                      }}
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
                    <div style={{ fontSize: isMobile ? '18px' : '20px', marginBottom: '4px', opacity: 0.3 }}>
                        {stat.icon}
                      </div>
                      <div style={{ 
                      fontSize: isMobile ? '18px' : '22px', 
                        fontWeight: '300', 
                        color: '#1e293b', 
                      marginBottom: isMobile ? '4px' : '6px' 
                      }}>
                        {stat.number}
                      </div>
                      <div style={{ 
                        color: '#64748b', 
                      fontSize: isMobile ? '11px' : '12px', 
                        fontWeight: '500' 
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
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
                justifyContent: 'flex-start'
              }}>
                {/* Tagline and icon for left empty space */}
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginRight:'18px',minWidth:'170px'}}>
                  <span style={{fontSize:'28px',color:colors.accent,opacity:0.7,verticalAlign:'middle'}}>💎</span>
                  <span style={{fontWeight:600,fontSize:'1.1rem',color:'#2d225a',letterSpacing:'0.02em',opacity:0.85,whiteSpace:'nowrap'}}>Luxury. Innovation. Trust.</span>
                </div>
                <div style={{ 
                  width: '18px',
                  height: '18px',
                  background: `radial-gradient(circle at 60% 40%, ${colors.accent} 70%, #fff0 100%)`,
                  borderRadius: '50%',
                  animation: 'pulse 1.2s cubic-bezier(0.4,0,0.2,1) infinite',
                  boxShadow: `0 0 0 4px ${colors.accent}33, 0 2px 12px 0 ${colors.accent}55`,
                  border: `2px solid ${colors.accent}`,
                  transition: 'box-shadow 0.3s, background 0.3s',
                  filter: 'drop-shadow(0 0 6px #fff8)',
                  display: 'block',
                  margin: '0 auto'
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
        @keyframes sheen {
          0% { left: -120%; }
          60% { left: 120%; }
          100% { left: 120%; }
        }
        @keyframes glow {
          0%,100% { opacity: 0.2; transform: scale(0.98); }
          50% { opacity: 0.35; transform: scale(1.04); }
        }
        @keyframes borderSpin {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </>
  );
}
export default Hero;