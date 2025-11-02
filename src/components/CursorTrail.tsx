import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-primary opacity-70 animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            animationDuration: '1s',
            opacity: 1 - index / particles.length,
          }}
        />
      ))}
    </div>
  );
};
