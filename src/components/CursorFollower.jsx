import React, { useEffect, useRef } from 'react';

const CursorFollower = () => {
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Linear Interpolation (Lerp) for smooth movement
      const lerp = (start, end, factor) => start + (end - start) * factor;

      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
      <div 
        ref={cursorRef} 
      className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[9999] opacity-30 mix-blend-screen bg-accent blur-xl"
        style={{ willChange: 'transform' }}
      />
  );
};

export default CursorFollower;
