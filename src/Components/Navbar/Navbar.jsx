import React, { useEffect, useState, useRef } from 'react';

const messages = [
  "PACKED WITH BUILT-IN FEATURES",
  "GET 3 MONTHS SHOPIFY FOR JUST $1 PER MONTH",
  "SHOPIFY THEM", 
  "COVERED BY LONG-TERM SUPPORT",
];

const getBackgroundColor = () => 'bg-gray-400';

const Navbar = () => {
  const [offset, setOffset] = useState(0);
  const contentRef = useRef(null);
  
  // For Animation repeat messages 3 time
  const repeatedMessages = messages.concat(messages).concat(messages);

//  useEffect hook
useEffect(() => {
  let animationFrameId;
  const speed = 0.5; 
  let singleContentWidth = 0; // New variable to store width once
  
  const calculateWidth = () => {
      if (contentRef.current && contentRef.current.scrollWidth > 0) {
          singleContentWidth = contentRef.current.scrollWidth / 3;
          return true;
      }
      return false;
  };

  const animateScroll = () => {
    if (singleContentWidth === 0 && !calculateWidth()) {
        animationFrameId = requestAnimationFrame(animateScroll);
        return; 
    }
    
    setOffset(prevOffset => {
      let newOffset = prevOffset - speed;

      // Reset logic: singleContentWidth use
      if (newOffset < -singleContentWidth) {
        // Modulus (for smooth reset)
        return newOffset % singleContentWidth; 
      }
      
      return newOffset;
    });

    animationFrameId = requestAnimationFrame(animateScroll);
  };

  animationFrameId = requestAnimationFrame(animateScroll);

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}, []);
  

    
  return (
    <div className={`relative w-full overflow-hidden text-white py-5 ${getBackgroundColor()}`}>
      <div
        ref={contentRef}
        className="whitespace-nowrap absolute top-1/2"
        style={{ 
            // For Performance translate3d use 
            transform: `translate3d(${offset}px, -50%, 0)`,
        }}
      >
        {repeatedMessages.map((msg, index) => (
          // Each message and divider wrap in one fragment
          <React.Fragment key={index}>
            
            {/* 1. MESSAGE ITSELF (No dot, No extra padding) */}
            <span 
              className="inline-block text-sm font-semibold uppercase"
            >
              {msg}
            </span>
            
            {/* 2. DIVIDER (Dot and Space use here) */}
            <span 
              className="inline-block text-sm font-semibold mx-20" 
              style={{ paddingRight: '1rem' }} 
            >
              •
            </span>
            
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navbar;