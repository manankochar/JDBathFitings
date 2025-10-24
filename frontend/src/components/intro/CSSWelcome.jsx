import React, { useState, useEffect } from 'react';
import { colors } from '../../theme/colors';

const CSSWelcome = ({ onComplete = () => {} }) => {
  const [visible, setVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = [];
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3
      });
    }
    setParticles(newParticles);

    // Enhanced animation sequence
    setTimeout(() => setAnimationPhase(1), 200);   // Background effects
    setTimeout(() => setAnimationPhase(2), 600);   // Panel materialization
    setTimeout(() => setAnimationPhase(3), 1000);  // Logo reveal
    setTimeout(() => setAnimationPhase(4), 1500);  // Text decode effect
    setTimeout(() => setAnimationPhase(5), 2200);  // Final effects
    
    // Start fade out after 5 seconds
    setTimeout(() => {
      setVisible(false);
    }, 5000);

    // Call onComplete after fade out
    setTimeout(() => {
      onComplete();
    }, 5800);
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
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, ${colors.accent}15 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, ${colors.accentSoft}20 0%, transparent 40%),
          radial-gradient(circle at 40% 60%, ${colors.accent}10 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease-out'
      }}
    >
      {/* Animated grid background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(${colors.accent}20 1px, transparent 1px),
            linear-gradient(90deg, ${colors.accent}20 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: animationPhase >= 1 ? 0.3 : 0,
          transform: animationPhase >= 1 ? 'scale(1)' : 'scale(1.1)',
          transition: 'all 1s ease-out',
          animation: animationPhase >= 1 ? 'gridPulse 4s ease-in-out infinite' : 'none'
        }}
      />

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `linear-gradient(45deg, ${colors.accent}80, ${colors.accentSoft}60)`,
            borderRadius: '50%',
            opacity: animationPhase >= 1 ? 0.7 : 0,
            animation: animationPhase >= 1 ? `float ${particle.duration}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 3}px ${colors.accent}60`,
            transition: 'opacity 1s ease-out'
          }}
        />
      ))}

      {/* Scanning beam effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '200%',
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${colors.accent} 50%, transparent 100%)`,
          opacity: animationPhase >= 1 ? 0.8 : 0,
          animation: animationPhase >= 1 ? 'scanHorizontal 3s ease-in-out infinite' : 'none',
          transition: 'opacity 0.5s ease-out'
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '-100%',
          left: 0,
          width: '2px',
          height: '200%',
          background: `linear-gradient(180deg, transparent 0%, ${colors.accent} 50%, transparent 100%)`,
          opacity: animationPhase >= 1 ? 0.8 : 0,
          animation: animationPhase >= 1 ? 'scanVertical 3.5s ease-in-out infinite' : 'none',
          animationDelay: '1s',
          transition: 'opacity 0.5s ease-out'
        }}
      />
      {/* Enhanced content panel */}
      <div
        style={{
          background: `
            linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%),
            radial-gradient(circle at 50% 50%, ${colors.accent}05 0%, transparent 70%)
          `,
          backdropFilter: 'blur(25px) saturate(1.5)',
          border: `1px solid rgba(30, 41, 59, 0.5)`,
          borderRadius: '24px',
          padding: '50px 40px',
          textAlign: 'center',
          boxShadow: `
            0 25px 50px rgba(0, 0, 0, 0.4),
            0 0 80px ${colors.accent}20,
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2)
          `,
          maxWidth: '550px',
          width: '90%',
          position: 'relative',
          opacity: animationPhase >= 2 ? 1 : 0,
          transform: animationPhase >= 2 ? 'translateY(0) scale(1) rotateX(0deg)' : 'translateY(30px) scale(0.9) rotateX(10deg)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Holographic border effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '24px',
            background: `conic-gradient(from 0deg, ${colors.accent}40, transparent 30%, ${colors.accentSoft}40, transparent 70%, ${colors.accent}40)`,
            opacity: animationPhase >= 2 ? 0.6 : 0,
            animation: animationPhase >= 2 ? 'rotate 6s linear infinite' : 'none',
            transition: 'opacity 1s ease-out',
            zIndex: -1
          }}
        />
        
        {/* Inner glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '2px',
            bottom: '2px',
            borderRadius: '22px',
            background: 'rgba(15, 23, 42, 0.95)',
            zIndex: -1
          }}
        />
        <div
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 40px',
            position: 'relative',
            opacity: animationPhase >= 2 ? 1 : 0,
            transform: animationPhase >= 2 ? 'scale(1) rotateY(0deg)' : 'scale(0.8) rotateY(180deg)',
            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <img
            src="/jankidas-logo.png"
            alt="JD Bath Fittings Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 20px ${colors.accent}40) drop-shadow(0 0 40px ${colors.accent}20)`,
              animation: animationPhase >= 2 ? 'logoGlow 3s ease-in-out infinite alternate' : 'none'
            }}
          />
          
          {/* Animated ring around logo */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              border: `2px solid ${colors.accent}60`,
              borderRadius: '50%',
              animation: animationPhase >= 2 ? 'rotate 8s linear infinite' : 'none',
              background: `conic-gradient(from 0deg, transparent 0deg, ${colors.accent}40 90deg, transparent 180deg, ${colors.accentSoft}40 270deg, transparent 360deg)`
            }}
          />
        </div>

        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 800,
            margin: '0 0 20px 0',
            background: `linear-gradient(135deg, #ffffff 0%, ${colors.accent} 30%, #e2e8f0 60%, ${colors.accentSoft} 100%)`,
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
            textShadow: `0 0 30px ${colors.accent}40`,
            opacity: animationPhase >= 4 ? 1 : 0,
            transform: animationPhase >= 4 ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: animationPhase >= 4 ? 'textShimmer 3s ease-in-out infinite' : 'none',
            position: 'relative'
          }}
        >
          R Diamond
          
          {/* Text glow effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, transparent 0%, ${colors.accent}20 50%, transparent 100%)`,
              borderRadius: '8px',
              opacity: animationPhase >= 4 ? 0.5 : 0,
              animation: animationPhase >= 4 ? 'pulse 2s ease-in-out infinite alternate' : 'none',
              transition: 'opacity 0.8s ease-out',
              zIndex: -1
            }}
          />
        </h1>

        <div
          style={{
            height: '2px',
            width: '60%',
            margin: '0 auto 25px',
            background: `linear-gradient(90deg, transparent 0%, ${colors.accent} 50%, transparent 100%)`,
            opacity: animationPhase >= 4 ? 1 : 0,
            transform: animationPhase >= 4 ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '0.3s'
          }}
        />

        <p
          style={{
            fontSize: '1.1rem',
            color: '#e2e8f0',
            margin: '0 0 35px 0',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            lineHeight: 1.6,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            opacity: animationPhase >= 4 ? 1 : 0,
            transform: animationPhase >= 4 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '0.5s'
          }}
        >
          Premium Bathroom Solutions
        </p>

        {/* Progress indicator with enhanced styling */}
        <div
          style={{
            width: '70%',
            height: '3px',
            background: 'rgba(100, 116, 139, 0.2)',
            margin: '0 auto',
            borderRadius: '2px',
            overflow: 'hidden',
            opacity: animationPhase >= 5 ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
            transitionDelay: '0.8s',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSoft}, ${colors.accent})`,
              backgroundSize: '200% 100%',
              borderRadius: '2px',
              animation: animationPhase >= 5 ? 'progressFill 2s ease-out forwards, shimmer 2s ease-in-out infinite' : 'none',
              transform: 'translateX(-100%)',
              boxShadow: `0 0 15px ${colors.accent}60`
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          100% { transform: translateY(-20px) translateX(10px) rotate(180deg); }
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.02); }
        }

        @keyframes scanHorizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes scanVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes logoGlow {
          0% { filter: drop-shadow(0 0 20px ${colors.accent}40) drop-shadow(0 0 40px ${colors.accent}20); }
          100% { filter: drop-shadow(0 0 30px ${colors.accent}60) drop-shadow(0 0 60px ${colors.accent}40); }
        }

        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes progressFill {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default CSSWelcome;
