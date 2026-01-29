import { useEffect, useRef } from 'react';

const RetroPixelCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Smooth following
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${currentX - 8}px, ${currentY - 8}px)`;
      }

      // Animate trails
      trailsRef.current.forEach((trail, index) => {
        if (trail) {
          const delay = (index + 1) * 0.05;
          const trailX = currentX + (mouseX - currentX) * (1 - delay);
          const trailY = currentY + (mouseY - currentY) * (1 - delay);
          trail.style.transform = `translate(${trailX - 6}px, ${trailY - 6}px)`;
          trail.style.opacity = String(0.6 - index * 0.15);
        }
      });

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Cursor trails */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="absolute w-3 h-3 border-2 border-primary transition-opacity"
          style={{
            mixBlendMode: 'screen',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="absolute w-4 h-4 border-2 border-primary bg-primary/20"
        style={{
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default RetroPixelCursor;
