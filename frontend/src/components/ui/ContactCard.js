import React from 'react';

const ContactCard = ({ isLoaded, isMobile }) => {
  const cardStyles = {
    position: 'relative',
    background: 'linear-gradient(135deg, #fef7cd 0%, #fde68a 100%)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
    transitionDelay: '1.4s',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    gridColumn: '1 / -1'
  };

  const phoneIconStyles = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    fontSize: '48px',
    opacity: 0.1,
    transform: 'rotate(12deg)'
  };

  const headerStyles = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const contactItemStyles = {
    fontSize: '14px'
  };

  const contactItemContainerStyles = (i) => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'flex-start' : 'center',
    justifyContent: isMobile ? 'flex-start' : 'space-between',
    marginBottom: i < 2 ? '12px' : '0',
    gap: isMobile ? '2px' : '8px'
  });

  const labelStyles = {
    color: '#64748b',
    fontSize: isMobile ? '11px' : '14px',
    fontWeight: '600'
  };

  const valueStyles = {
    color: '#1e293b',
    fontWeight: '500',
    fontSize: isMobile ? '11px' : '14px',
    wordBreak: 'break-all',
    lineHeight: '1.3'
  };

  const contactInfo = [
    { label: 'Phone', value: '+91-8527161330' },
    { label: 'Email', value: 'rdiamond2423@gmail.com' },
    { label: 'Showroom', value: 'Chawri Bazar, Delhi' }
  ];

  return (
    <div className="feature-card contact-card" style={cardStyles}>
      <div style={phoneIconStyles}>
        📞
      </div>
      <h4 style={headerStyles}>
        <span style={{ fontSize: '24px' }}>✨</span> 
        Expert Consultation Available
      </h4>
      <div style={contactItemStyles}>
        {contactInfo.map((contact, i) => (
          <div key={i} className="contact-item" style={contactItemContainerStyles(i)}>
            <span style={labelStyles}>{contact.label}:</span>
            <span style={valueStyles}>{contact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;