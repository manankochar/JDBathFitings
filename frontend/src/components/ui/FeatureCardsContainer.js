import React from 'react';
import FeatureCard from './FeatureCard';
import ContactCard from './ContactCard';

const FeatureCardsContainer = ({ features, isLoaded, isMobile }) => {
  const handleFeatureCardMouseEnter = (e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
    e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.5)';
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    e.currentTarget.style.transform = 'translateY(-5px)';
  };

  const handleFeatureCardMouseLeave = (e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.5)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const containerStyles = {
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: isMobile ? '16px' : '16px'
  };

  return (
    <div className="feature-cards" style={containerStyles}>
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          index={index}
          isLoaded={isLoaded}
          isMobile={isMobile}
          onMouseEnter={handleFeatureCardMouseEnter}
          onMouseLeave={handleFeatureCardMouseLeave}
        />
      ))}
      
      <ContactCard isLoaded={isLoaded} isMobile={isMobile} />
    </div>
  );
};

export default FeatureCardsContainer;