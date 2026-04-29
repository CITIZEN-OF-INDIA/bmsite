import React, { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  hue: number;
}

export const FloatingHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hearts: Heart[] = [];
    const MAX_HEARTS = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const createHeart = (): Heart => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 15 + 5,
        speedY: Math.random() * 1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        // Range around hot pink/purple (300-340)
        hue: 300 + Math.random() * 40 
      };
    };

    // Initialize some hearts
    for (let i = 0; i < MAX_HEARTS; i++) {
      hearts.push({
        ...createHeart(),
        y: Math.random() * canvas.height // Distribute initially
      });
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, hue: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      
      ctx.moveTo(0, size / 4);
      ctx.quadraticCurveTo(0, 0, size / 4, 0);
      ctx.quadraticCurveTo(size / 2, 0, size / 2, size / 4);
      ctx.quadraticCurveTo(size / 2, 0, size * 3/4, 0);
      ctx.quadraticCurveTo(size, 0, size, size / 4);
      ctx.quadraticCurveTo(size, size / 2, size / 2, size);
      ctx.quadraticCurveTo(0, size / 2, 0, size / 4);
      
      ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${opacity * 0.5})`;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart, index) => {
        heart.y -= heart.speedY;
        heart.x += heart.speedX;

        drawHeart(ctx, heart.x, heart.y, heart.size, heart.opacity, heart.hue);

        if (heart.y < -50) {
          hearts[index] = createHeart();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};
