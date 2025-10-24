import React from 'react';
import { colors } from '../../theme/colors';

const FeatureCard = ({ 
  feature, 
  index, 
  isLoaded, 
  isMobile, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const cardStyles = {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    borderRadius: isMobile ? '12px' : '16px',
    padding: isMobile ? '16px' : '28px',
    marginBottom: isMobile ? '12px' : '24px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
    transitionDelay: `${0.8 + index * 0.15}s`,
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    minHeight: isMobile ? '110px' : 'auto'
  };

  const iconStyles = {
    width: isMobile ? '42px' : '60px',
    height: isMobile ? '42px' : '60px',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    borderRadius: isMobile ? '8px' : '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '18px' : '26px',
    marginRight: isMobile ? '14px' : '22px',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  };

  const titleStyles = {
    fontSize: isMobile ? '14px' : '17px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: isMobile ? '6px' : '8px',
    transition: 'color 0.3s ease',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    lineHeight: isMobile ? '1.3' : '1.3'
  };

  const descriptionStyles = {
    color: '#64748b',
    fontSize: isMobile ? '13px' : '17px',
    marginBottom: isMobile ? '8px' : '12px',
    lineHeight: isMobile ? '1.4' : '1.6',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    fontWeight: '500'
  };

  const detailStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: isMobile ? '4px' : '8px',
    fontSize: isMobile ? '12px' : '16px',
    fontWeight: '600',
    color: colors.accent,
    wordWrap: 'break-word',
    overflowWrap: 'break-word'
  };

  const dotStyles = {
    width: isMobile ? '4px' : '6px',
    height: isMobile ? '4px' : '6px',
    background: colors.accent,
    borderRadius: '50%'
  };

  return (
    <div
      className="feature-card"
      style={cardStyles}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={iconStyles} className="feature-icon">
        {feature.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={titleStyles}>
          {feature.title}
        </h3>
        <p style={descriptionStyles}>
          {feature.description}
        </p>
        <div style={detailStyles}>
          <div style={dotStyles} />
          {feature.detail}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;