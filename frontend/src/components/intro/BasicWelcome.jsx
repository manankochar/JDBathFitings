import React, { useState, useEffect } from 'react';

const BasicWelcome = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log('BasicWelcome: Component mounted - should show overlay');
    
    // Hide after 5 seconds
    const timer = setTimeout(() => {
      console.log('BasicWelcome: Hiding overlay after 5 seconds');
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  console.log('BasicWelcome: Rendering - visible =', visible);

  if (!visible) {
    console.log('BasicWelcome: Not visible, returning null');
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
        backgroundColor: '#7c3aed',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center'
      }}
    >
      <div>
        <h1 style={{ marginBottom: '20px', fontSize: '48px' }}>JD Bath Fittings</h1>
        <p>Welcome Animation Test - 5 seconds</p>
        <p style={{ fontSize: '16px', marginTop: '10px' }}>Check console for logs</p>
      </div>
    </div>
  );
};

export default BasicWelcome;
