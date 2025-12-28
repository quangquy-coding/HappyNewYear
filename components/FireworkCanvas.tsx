
import React, { useEffect, useRef } from 'react';

interface FireworkCanvasProps {
  active: boolean;
}

const FireworkCanvas: React.FC<FireworkCanvasProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      life: number;
      size: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.life = Math.random() * 0.02 + 0.005;
        this.size = Math.random() * 3 + 1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.12; // Gravity
        this.alpha -= this.life;
      }
    }

    const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    const createFirework = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    let lastLaunch = 0;
    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (time - lastLaunch > 800) {
        createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
        lastLaunch = time;
      }

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas 
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default FireworkCanvas;
