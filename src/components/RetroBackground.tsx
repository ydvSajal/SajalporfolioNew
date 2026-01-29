import { useEffect, useRef } from 'react';

const RetroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Retro grid configuration
    const gridSize = 50;
    const perspective = 400;
    let offsetY = 0;

    const drawRetroGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get theme colors from CSS variables
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--primary').trim() || '#ffdb33';
      const borderColor = computedStyle.getPropertyValue('--border').trim() || '#000';
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(250, 229, 131, 0.03)');
      gradient.addColorStop(1, 'rgba(255, 219, 51, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw perspective grid
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;

      const centerX = canvas.width / 2;
      const horizonY = canvas.height * 0.4;
      const rows = 20;

      // Draw horizontal lines
      for (let i = 0; i < rows; i++) {
        const y = horizonY + ((i + offsetY) * gridSize);
        if (y > canvas.height) continue;

        const scale = Math.max(0, (y - horizonY) / perspective);
        const lineWidth = canvas.width * scale;

        ctx.beginPath();
        ctx.moveTo(centerX - lineWidth / 2, y);
        ctx.lineTo(centerX + lineWidth / 2, y);
        ctx.globalAlpha = 0.1 + scale * 0.3;
        ctx.stroke();
      }

      // Draw vertical lines
      const verticalLines = 15;
      for (let i = -verticalLines; i <= verticalLines; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 30, horizonY);
        
        const endScale = (canvas.height - horizonY) / perspective;
        const endX = centerX + i * 30 * (1 + endScale * 8);
        
        ctx.lineTo(endX, canvas.height);
        ctx.globalAlpha = 0.08;
        ctx.stroke();
      }

      // Floating geometric shapes
      drawFloatingShapes(ctx, canvas.width, canvas.height, primaryColor, borderColor);

      // Update offset for animation
      offsetY = (offsetY + 0.02) % 1;
    };

    const drawFloatingShapes = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      primary: string,
      border: string
    ) => {
      const time = Date.now() * 0.001;

      const shapes = [
        { x: 0.2, y: 0.3, size: 40, type: 'square', speed: 1 },
        { x: 0.8, y: 0.2, size: 30, type: 'circle', speed: 1.5 },
        { x: 0.15, y: 0.7, size: 35, type: 'triangle', speed: 0.8 },
        { x: 0.85, y: 0.6, size: 25, type: 'square', speed: 1.2 },
        { x: 0.5, y: 0.15, size: 45, type: 'circle', speed: 0.9 },
      ];

      shapes.forEach((shape) => {
        const x = width * shape.x + Math.sin(time * shape.speed) * 30;
        const y = height * shape.y + Math.cos(time * shape.speed * 0.7) * 20;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * shape.speed * 0.5);

        // Border shadow
        ctx.strokeStyle = border;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.15;

        if (shape.type === 'square') {
          // Square
          ctx.strokeRect(-shape.size / 2 + 3, -shape.size / 2 + 3, shape.size, shape.size);
          ctx.fillStyle = primary;
          ctx.globalAlpha = 0.05;
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        } else if (shape.type === 'circle') {
          // Circle
          ctx.beginPath();
          ctx.arc(3, 3, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = primary;
          ctx.globalAlpha = 0.05;
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (shape.type === 'triangle') {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(3, -shape.size / 2 + 3);
          ctx.lineTo(-shape.size / 2 + 3, shape.size / 2 + 3);
          ctx.lineTo(shape.size / 2 + 3, shape.size / 2 + 3);
          ctx.closePath();
          ctx.stroke();
          
          ctx.fillStyle = primary;
          ctx.globalAlpha = 0.05;
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
        }

        // Main shape border
        ctx.strokeStyle = primary;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;

        if (shape.type === 'square') {
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        } else if (shape.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (shape.type === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      });
    };

    let animationId: number;
    const animate = () => {
      drawRetroGrid();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ mixBlendMode: 'multiply' }}
      />
      {/* Decorative dots pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }} 
      />
    </>
  );
};

export default RetroBackground;
