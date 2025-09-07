import React, { useState, useEffect } from 'react';
import './WelcomeIntro.css';

/**
 * WelcomeIntroCSS - CSS-only fallback version of WelcomeIntro
 * 
 * Features:
 * - Pure CSS animations using @keyframes
 * - Same timing and visual effects as Framer Motion version
 * - Respects prefers-reduced-motion
 * - localStorage integration
 * - Lightweight alternative when Framer Motion is not available
 * 
 * @param {string} logo - SVG logo content or image src
 * @param {string} heading - Main heading text (default: "Welcome to jd")
 * @param {string} subtext - Subtitle text (default: "Building things with code.")
 * @param {boolean} forceShow - Force show animation regardless of localStorage
 * @param {function} onComplete - Callback when animation completes and overlay dismisses
 */
const WelcomeIntroCSS = ({ 
  logo = null, 
  heading = "Welcome to jd", 
  subtext = "Building things with code.",
  forceShow = false,
  onComplete = () => {}
}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Check if intro should be shown
    const introSeen = localStorage.getItem('introSeen');
    if (!introSeen || forceShow) {
      setShouldShow(true);
      setIsVisible(true);
      
      if (mediaQuery.matches) {
        // Reduced motion: show briefly then hide
        setTimeout(() => {
          handleDismiss();
        }, 300);
      } else {
        // Start animation
        setTimeout(() => setIsAnimating(true), 50);
        // Auto-dismiss after animation completes
        setTimeout(() => {
          handleDismiss();
        }, 3200); // Total animation time + 1s delay
      }
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [forceShow]);

  const handleDismiss = () => {
    localStorage.setItem('introSeen', 'true');
    setIsVisible(false);
    setTimeout(() => {
      setShouldShow(false);
      onComplete();
    }, 400);
  };

  if (!shouldShow) return null;

  return (
    <div
      className={`welcome-intro-overlay ${isVisible ? 'welcome-intro-visible' : 'welcome-intro-hidden'} ${prefersReducedMotion ? 'welcome-intro-reduced-motion' : ''}`}
      role="dialog"
      aria-label="Welcome overlay"
    >
      {/* Subtle blurred radial accent behind logo */}
      <div className="welcome-intro-bg-accent" />
      
      {/* Main content container */}
      <div className="welcome-intro-content">
        {/* Logo */}
        {logo && (
          <div className={`welcome-intro-logo ${isAnimating ? 'welcome-intro-logo-animate' : ''}`}>
            {typeof logo === 'string' && logo.includes('<svg') ? (
              <div 
                className="welcome-intro-logo-container"
                dangerouslySetInnerHTML={{ __html: logo }}
              />
            ) : (
              <img 
                src={logo} 
                alt="Logo" 
                className="welcome-intro-logo-img"
              />
            )}
          </div>
        )}

        {/* Heading */}
        <h1 className={`welcome-intro-heading ${isAnimating ? 'welcome-intro-heading-animate' : ''}`}>
          {heading}
        </h1>

        {/* Subtext */}
        <p className={`welcome-intro-subtext ${isAnimating ? 'welcome-intro-subtext-animate' : ''}`}>
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default WelcomeIntroCSS;
