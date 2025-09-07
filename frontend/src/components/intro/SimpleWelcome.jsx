import React, { useState, useEffect } from 'react';

const SimpleWelcome = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log('SimpleWelcome: Component mounted!');
    
    // Hide after 3 seconds
    const timer = setTimeout(() => {
      console.log('SimpleWelcome: Hiding component');
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  console.log('SimpleWelcome: Rendering, show =', show);

  if (!show) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(139, 92, 246, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to JD Bath Fittings!</h1>
        <p>This is a simple test overlay</p>
      </div>
    </div>
  );
};

export default SimpleWelcome;
