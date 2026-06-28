import React, { useEffect, useRef, useState } from "react";

interface BackgroundEffectsProps {
  isDarkMode: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Track mouse coordinates for glow effect and canvas gravity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // HTML5 Canvas Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };

    // Responsive Canvas observation using ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    resizeCanvas();

    // Spawning particles
    const initParticles = () => {
      particles = [];
      const density = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
      const particleColors = isDarkMode
        ? ["rgba(99, 102, 241, 0.4)", "rgba(168, 85, 247, 0.4)", "rgba(59, 130, 246, 0.4)", "rgba(236, 72, 153, 0.4)"] // Indigo, Purple, Blue, Pink
        : ["rgba(99, 102, 241, 0.2)", "rgba(168, 85, 247, 0.2)", "rgba(59, 130, 246, 0.2)", "rgba(236, 72, 153, 0.2)"];

      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
        });
      }
    };

    initParticles();

    // Game loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connective background mesh (Stripe/Vercel styling)
      const connectDist = 120;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particles
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Mouse gravity influence (gently pull particles closer)
        if (isHovered) {
          const dx = mousePos.x - p1.x;
          const dy = mousePos.y - p1.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 200) {
            const force = (200 - dist) / 3000;
            p1.x += (dx / dist) * force;
            p1.y += (dy / dist) * force;
          }
        }

        // Boundary collision check
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p1.alpha;
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < connectDist) {
            ctx.save();
            ctx.lineWidth = 0.5;
            const lineAlpha = (1 - dist / connectDist) * (isDarkMode ? 0.08 : 0.04);
            ctx.strokeStyle = isDarkMode ? `rgba(139, 92, 246, ${lineAlpha})` : `rgba(139, 92, 246, ${lineAlpha * 1.5})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isDarkMode, mousePos, isHovered]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      id="bg-effects-container"
    >
      {/* 1. Aurora Animated Gradients (Stripe / Framer look) */}
      <div className="absolute inset-0 transition-colors duration-1000">
        <div
          className={`absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-70 animate-pulse duration-[8000ms] ${
            isDarkMode
              ? "bg-blue-900/10"
              : "bg-gradient-to-tr from-indigo-200 via-purple-300 to-transparent"
          }`}
        />
        <div
          className={`absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-70 animate-pulse duration-[12000ms] delay-1000 ${
            isDarkMode
              ? "bg-purple-900/10"
              : "bg-gradient-to-bl from-pink-200 via-fuchsia-300 to-transparent"
          }`}
        />
      </div>

      {/* 2. Floating interactive Canvas particle mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* 3. Luxury Cursor Mouse Glow aura */}
      {isHovered && (
        <div
          className="absolute rounded-full pointer-events-none transition-opacity duration-300 filter blur-[80px]"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)",
          }}
        />
      )}

      {/* Grid overlay for high-tech aesthetic (Stripe and Vercel look) */}
      <div
        className={`absolute inset-0 opacity-[0.03] pointer-events-none ${
          isDarkMode
            ? "bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"
            : "bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]"
        }`}
      />
    </div>
  );
};
