import React, { useState, useEffect } from 'react';

const CSSWelcome = ({ onComplete = () => {} }) => {
  const [visible, setVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    console.log('CSSWelcome: Loading animation started');

    // Animation sequence
    setTimeout(() => setAnimationPhase(1), 100);  // Background fade in
    setTimeout(() => setAnimationPhase(2), 600);  // Logo appear
    setTimeout(() => setAnimationPhase(3), 1200); // Heading appear
    setTimeout(() => setAnimationPhase(4), 1800); // Subtext appear
    
    // Start fade out after 4 seconds
    setTimeout(() => {
      console.log('CSSWelcome: Starting fade out');
      setVisible(false);
    }, 4000);

    // Call onComplete after fade out completes
    setTimeout(() => {
      console.log('CSSWelcome: Animation complete, loading main website');
      onComplete();
    }, 5000);

    return () => {};
  }, [onComplete]);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #f1f5f9 75%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: animationPhase >= 1 ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out'
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#1e293b',
          padding: '60px 50px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(25px)',
          border: '2px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          transform: animationPhase >= 1 ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(30px)',
          transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)',
          maxWidth: '600px',
          width: '90%'
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: '32px',
            opacity: animationPhase >= 2 ? 1 : 0,
            transform: animationPhase >= 2 ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-180deg)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative'
          }}
        >
          {/* Logo background glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(20px)',
              animation: animationPhase >= 2 ? 'glow 2s ease-in-out infinite alternate' : 'none'
            }}
          />
          
          <img 
            src="/jankidas-logo.png" 
            alt="JD Bath Fittings Logo" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            style={{
              width: '140px',
              height: '140px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
              position: 'relative',
              zIndex: 1,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '15px',
              border: '3px solid rgba(59, 130, 246, 0.2)'
            }}
          />
          
          {/* Fallback logo */}
          <div
            style={{
              display: 'none',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
              position: 'relative',
              zIndex: 1,
              border: '3px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            JD
          </div>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(36px, 8vw, 56px)',
            fontWeight: '800',
            marginBottom: '20px',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.03em',
            opacity: animationPhase >= 3 ? 1 : 0,
            transform: animationPhase >= 3 ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease-out',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          JD Bath Fittings
        </h1>

        {/* Divider */}
        <div
          style={{
            width: '120px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #3b82f6 25%, #1d4ed8 50%, #60a5fa 75%, transparent 100%)',
            margin: '0 auto 24px',
            transform: animationPhase >= 3 ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.8s ease-out',
            borderRadius: '2px',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
          }}
        />

        {/* Subtext */}
        <p
          style={{
            fontSize: 'clamp(16px, 4vw, 22px)',
            color: '#64748b',
            fontWeight: '400',
            lineHeight: '1.6',
            opacity: animationPhase >= 4 ? 1 : 0,
            transition: 'opacity 1s ease-out',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.5px'
          }}
        >
          Premium Quality • Innovative Design • Trusted Excellence
        </p>


        {/* Loading dots */}
        <div 
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            opacity: animationPhase >= 4 ? 1 : 0,
            transition: 'opacity 0.5s ease-out'
          }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3b82f6',
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes glow {
            0% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
          }
        `}
      </style>
    </div>
  );
};

export default CSSWelcome;
