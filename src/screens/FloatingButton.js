import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa';

const FloatingButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
  };

  return (
    <Button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px', // Distance from bottom
        right: '35px',  // Distance from right
        borderRadius: '50%',
        padding: '10px 15px',
        backgroundColor: 'red',
        border: 'none',
        zIndex: 1000,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <FaArrowUp style={{ color: '#fff' }} />
    </Button>
  );
};

export default FloatingButton;
