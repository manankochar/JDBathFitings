import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: '#ffffff',
      color: '#1e293b',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 25% 25%, rgba(226, 232, 240, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(226, 232, 240, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0.8) 0%, transparent 50%)
      `,
      zIndex: 0
    },
    content: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '800px',
      width: '100%'
    },
    errorCode: {
      fontSize: 'clamp(80px, 15vw, 160px)',
      fontWeight: '300',
      margin: '0',
      color: '#1e293b',
      letterSpacing: '-0.02em',
      lineHeight: '1'
    },
    title: {
      fontSize: 'clamp(24px, 5vw, 48px)',
      fontWeight: '600',
      margin: '20px 0 16px 0',
      color: '#1e293b',
      letterSpacing: '-0.01em'
    },
    subtitle: {
      fontSize: 'clamp(16px, 3vw, 20px)',
      margin: '0 0 40px 0',
      color: '#64748b',
      maxWidth: '600px',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    homeButton: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      color: '#475569',
      padding: '16px 32px',
      borderRadius: '50px',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '600',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '60px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      maxWidth: '900px',
      width: '100%'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      padding: '32px 24px',
      borderRadius: '24px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      textAlign: 'center'
    },
    featureIcon: {
      fontSize: '32px',
      marginBottom: '16px',
      display: 'block'
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#1e293b'
    },
    featureDescription: {
      fontSize: '14px',
      color: '#64748b',
      lineHeight: '1.5',
      fontWeight: '400'
    }
  };

  const quickLinks = [
    {
      icon: '🏠',
      title: 'Home',
      description: 'Return to our homepage',
      link: '/'
    },
    {
      icon: '🛁',
      title: 'Products',
      description: 'Browse our bath fittings',
      link: '/products'
    },
    {
      icon: '📞',
      title: 'Contact',
      description: 'Get in touch with us',
      link: '/contact'
    },
    {
      icon: 'ℹ️',
      title: 'About',
      description: 'Learn more about us',
      link: '/about'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.subtitle}>
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          Let's get you back to exploring our premium bath fittings collection.
        </p>
        
        <Link 
          to="/" 
          style={styles.homeButton}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
            e.target.style.background = 'rgba(255, 255, 255, 1)';
            e.target.style.color = '#1e293b';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.color = '#475569';
          }}
        >
          <span>🏠</span> Back to Home
        </Link>

        <div style={styles.featuresGrid}>
          {quickLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 32px 64px rgba(0,0,0,0.15)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                <span style={styles.featureIcon}>{link.icon}</span>
                <h3 style={styles.featureTitle}>{link.title}</h3>
                <p style={styles.featureDescription}>{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;