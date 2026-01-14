import React, { useState, useEffect } from 'react';

const Cursor = () => {
  // 1. Position States 
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false); 
  
  // 2. Fixed Sizes
  const DOT_SIZE = 8;
  const FOLLOWER_SIZE_REST = 20; // Rest size
  const FOLLOWER_SIZE_MOVE = 40; // Move size
  
  // 3. Offset to align with real cursor tip
  const OFFSET_X = 8;
  const OFFSET_Y = 16; 

  // useEffect hook
useEffect(() => {
    let timeout;
    let animationFrameId;

    let currentCursorPos = { x: 0, y: 0 };
    let currentIsMoving = false;
    
    const handleMouseMove = (e) => {
        currentCursorPos = { x: e.clientX, y: e.clientY };
        setCursorPos({ x: e.clientX, y: e.clientY });
        
        currentIsMoving = true;
        setIsMoving(true); 
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            currentIsMoving = false;
            setIsMoving(false);
        }, 100);
    };

    //  Visibility Change Handler 
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            // When tab active, so set cursor equally to follower
            setFollowerPos(currentCursorPos); // Follower position reset
            // Animation loop again start if stop
            animationFrameId = requestAnimationFrame(updateFollower);
        } else {
            // When tab move in background , so loop close
            cancelAnimationFrame(animationFrameId);
        }
    };

    const updateFollower = () => {
        setFollowerPos(prevPos => {
            const speed = currentIsMoving ? 0.15 : 1.0; 
            const newX = prevPos.x + (currentCursorPos.x - prevPos.x) * speed;
            const newY = prevPos.y + (currentCursorPos.y - prevPos.y) * speed;
            return { x: newX, y: newY };
        });
        // check, if browser is not hidden, so hi request
        if (document.visibilityState === 'visible') {
          animationFrameId = requestAnimationFrame(updateFollower);
        }
    };

    // Event listeners attach 
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start the initial loop
    animationFrameId = requestAnimationFrame(updateFollower);
    
    // Cleanup
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timeout);
    };
}, []);
  
  // Dynamic Size Calculation
  const followerSize = isMoving ? FOLLOWER_SIZE_MOVE : FOLLOWER_SIZE_REST;
  
  // Centering Margin Calculation
  const calculatedSettleMargin = (DOT_SIZE / 2) + ((FOLLOWER_SIZE_REST - DOT_SIZE) / 2); 
  
  const finalMargin = isMoving 
    ? `-${followerSize / 2}px` 
    : `-${calculatedSettleMargin}px`; 
  
  // Dynamic Transition Property
  const followerTransition = isMoving 
    ? 'transform 0.01s linear, width 0.3s ease, height 0.3s ease'
    : 'transform 0s, width 0.3s ease, height 0.3s ease'; 
  
  return (
    <>
      {/* 1. Trailing Background Circle */}
      <div
        className="cursor-follower"
        style={{
          //  Follower (light Color): Neon Green/Lime with opacity 
          backgroundColor: 'rgba(132, 204, 22, 0.3)', // Lime-500 with 30% opacity
          width: `${followerSize}px`,
          height: `${followerSize}px`,
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          
          // Margin: Perfect Centering
          marginLeft: finalMargin, 
          marginTop: finalMargin, 
          
          // Position and tip Alignment (Follower position)
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0) translate(${OFFSET_X}px, ${OFFSET_Y}px)`,
          
          // Dynamic Transition
          transition: followerTransition,
        }}
      />

      {/* 2. Main Cursor Dot */}
      <div
        className="cursor-dot"
        style={{
          //  Dot (Solid Color): Neon Green/Lime 
          backgroundColor: '#84CC16', // Solid Lime-500
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10000,
          
          // Centering (Dot always on its center)
          marginLeft: `-${DOT_SIZE / 2}px`, 
          marginTop: `-${DOT_SIZE / 2}px`, 
          
          // Position and tip Alignment (Dot position)
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(${OFFSET_X}px, ${OFFSET_Y}px)`,
          
          transition: 'none', // Movement always INSTANT
        }}
      />
    </>
  );
};

export default Cursor;