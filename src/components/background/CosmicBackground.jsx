import React, { useEffect, useRef } from 'react';

export const CosmicBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let brightStars = [];
    let shootingStars = [];
    let galaxies = [];
    
    // ========== DEFINE FUNCTIONS FIRST ==========
    
    // CREATE SUPER BRIGHT STARS (lebih banyak dan lebih terang)
    const createStars = () => {
      stars = [];
      // 3000 bintang kecil untuk background
      for (let i = 0; i < 3000; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.6 + 0.2,
          color: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`,
          twinkleSpeed: 0.01 + Math.random() * 0.02,
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    };
    
    // CREATE BRIGHT STARS (bintang terang dengan efek glow)
    const createBrightStars = () => {
      brightStars = [];
      // 200 bintang terang dengan berbagai warna
      const colors = [
        'rgba(255, 255, 200,',  // Kuning terang
        'rgba(200, 220, 255,',  // Biru muda
        'rgba(255, 200, 200,',  // Merah muda
        'rgba(200, 255, 200,',  // Hijau muda
        'rgba(255, 220, 180,',  // Orange
      ];
      
      for (let i = 0; i < 200; i++) {
        brightStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 1.5,
          alpha: 0.7 + Math.random() * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)] + `${0.6 + Math.random() * 0.4})`,
          glowSize: Math.random() * 8 + 4,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    };
    
    // CREATE GALAXIES (lebih realistis)
    const createGalaxies = () => {
      galaxies = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.25,
          radius: 180,
          arms: 4,
          rotation: 0,
          rotationSpeed: 0.0008,
          coreColor: 'rgba(139, 92, 246, 0.25)',
          armColor: 'rgba(99, 102, 241, 0.15)',
          starColor: 'rgba(200, 180, 255, 0.4)'
        },
        {
          x: canvas.width * 0.75,
          y: canvas.height * 0.65,
          radius: 150,
          arms: 3,
          rotation: 0,
          rotationSpeed: -0.001,
          coreColor: 'rgba(59, 130, 246, 0.22)',
          armColor: 'rgba(37, 99, 235, 0.12)',
          starColor: 'rgba(150, 180, 255, 0.35)'
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.8,
          radius: 120,
          arms: 5,
          rotation: 0,
          rotationSpeed: 0.0006,
          coreColor: 'rgba(236, 72, 153, 0.2)',
          armColor: 'rgba(219, 39, 119, 0.1)',
          starColor: 'rgba(255, 160, 200, 0.3)'
        },
        {
          x: canvas.width * 0.85,
          y: canvas.height * 0.2,
          radius: 100,
          arms: 4,
          rotation: 0,
          rotationSpeed: 0.0012,
          coreColor: 'rgba(168, 85, 247, 0.18)',
          armColor: 'rgba(126, 34, 206, 0.1)',
          starColor: 'rgba(200, 150, 255, 0.3)'
        }
      ];
    };
    
    // CREATE SHOOTING STAR
    const createShootingStar = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        length: 40 + Math.random() * 60,
        speed: 8 + Math.random() * 10,
        angle: Math.PI / 3 + (Math.random() - 0.5) * 0.8,
        alpha: 0.9,
        active: true,
        tailWidth: 1.5 + Math.random() * 1.5
      };
    };
    
    // DRAW GALAXIES
    const drawGalaxiesFn = () => {
      for (const galaxy of galaxies) {
        ctx.save();
        ctx.translate(galaxy.x, galaxy.y);
        ctx.rotate(galaxy.rotation);
        
        // Draw spiral arms with more detail
        for (let arm = 0; arm < galaxy.arms; arm++) {
          const armAngle = (arm / galaxy.arms) * Math.PI * 2;
          
          // Draw multiple layers for each arm
          for (let layer = 0; layer < 3; layer++) {
            const offset = layer * 8;
            for (let r = 15; r < galaxy.radius; r += 8) {
              const spiralAngle = armAngle + (r + offset) / 28;
              const x = Math.cos(spiralAngle) * r;
              const y = Math.sin(spiralAngle) * r;
              
              const size = Math.max(1, 3.5 - r / 50);
              const alpha = Math.max(0.08, 0.35 - r / galaxy.radius);
              
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fillStyle = galaxy.armColor.replace(/[\d\.]+\)$/g, `${alpha * (1 - layer * 0.3)})`);
              ctx.fill();
            }
          }
        }
        
        // Galaxy core - multiple layers for depth
        for (let i = 0; i < 3; i++) {
          const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 50 + i * 20);
          coreGradient.addColorStop(0, galaxy.coreColor.replace(/[\d\.]+\)$/g, `${0.3 - i * 0.08})`));
          coreGradient.addColorStop(0.5, galaxy.armColor.replace(/[\d\.]+\)$/g, `${0.1 - i * 0.03})`));
          coreGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = coreGradient;
          ctx.beginPath();
          ctx.arc(0, 0, 70 + i * 15, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Bright galactic core
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        ctx.restore();
        
        // Update rotation
        galaxy.rotation += galaxy.rotationSpeed;
      }
    };
    
    // DRAW STARS
    const drawStarsFn = (time) => {
      // Small background stars
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
        ctx.fill();
      }
      
      // Bright stars with glow effect
      for (const star of brightStars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.15 + 0.85;
        
        // Glow effect (soft)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace(/[\d\.]+\)$/g, `${0.15 * twinkle})`);
        ctx.fill();
        
        // Core star (sharp)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace(/[\d\.]+\)$/g, `${star.alpha * twinkle})`);
        ctx.fill();
        
        // Star cross/sparkle effect for very bright stars
        if (star.radius > 2 && Math.random() < 0.005) {
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 3, star.y);
          ctx.lineTo(star.x + star.radius * 3, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 3);
          ctx.lineTo(star.x, star.y + star.radius * 3);
          ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    };
    
    // DRAW SHOOTING STARS
    const drawShootingStarsFn = () => {
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i];
        if (!star.active) continue;
        
        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;
        
        // Gradient tail
        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 240, 180, ${star.alpha})`);
        gradient.addColorStop(0.4, `rgba(255, 200, 100, ${star.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.tailWidth;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Bright head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 200, ${star.alpha})`;
        ctx.fill();
        
        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.025;
        
        if (star.alpha <= 0 || star.x > canvas.width + 200 || star.y > canvas.height + 200) {
          star.active = false;
        }
      }
      
      // Add new shooting stars
      if (Math.random() < 0.012 && shootingStars.filter(s => s.active).length < 2) {
        shootingStars.push(createShootingStar());
      }
    };
    
    // DRAW NEBULA BACKGROUND
    const drawNebulaBackground = () => {
      const nebulaColors = [
        { x: canvas.width * 0.3, y: canvas.height * 0.4, radius: 300, color: 'rgba(80, 50, 150, 0.04)' },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: 350, color: 'rgba(50, 80, 150, 0.03)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, radius: 280, color: 'rgba(150, 50, 100, 0.03)' },
        { x: canvas.width * 0.15, y: canvas.height * 0.7, radius: 250, color: 'rgba(100, 50, 130, 0.035)' },
        { x: canvas.width * 0.85, y: canvas.height * 0.3, radius: 270, color: 'rgba(60, 100, 140, 0.03)' },
      ];
      
      for (const nebula of nebulaColors) {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    // DRAW MILKY WAY
    const drawMilkyWay = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(60, 40, 80, 0.08)');
      gradient.addColorStop(0.25, 'rgba(40, 50, 90, 0.06)');
      gradient.addColorStop(0.5, 'rgba(70, 40, 80, 0.07)');
      gradient.addColorStop(0.75, 'rgba(40, 60, 100, 0.05)');
      gradient.addColorStop(1, 'rgba(50, 40, 70, 0.06)');
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 5);
      ctx.fillStyle = gradient;
      ctx.fillRect(-canvas.width, -canvas.height / 3, canvas.width * 2, canvas.height * 0.6);
      ctx.restore();
    };
    
    // DRAW DISTANT STARS
    const drawDistantStars = () => {
      for (let i = 0; i < 4000; i++) {
        const x = (i * 131071) % canvas.width;
        const y = (i * 524287) % canvas.height;
        const brightness = Math.random() * 0.15;
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fillRect(x, y, 0.8, 0.8);
      }
    };
    
    // RESIZE HANDLER (panggil fungsi setelah didefinisikan)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
      createBrightStars();
      createGalaxies();
    };
    
    // ========== INITIALIZE ==========
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // ========== ANIMATION LOOP ==========
    let time = 0;
    const animate = () => {
      // Clear dengan warna hitam pekat
      ctx.fillStyle = '#030308';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.5;
      
      // Draw layers from back to front
      drawDistantStars();
      drawNebulaBackground();
      drawMilkyWay();
      drawGalaxiesFn();
      drawStarsFn(time);
      drawShootingStarsFn();
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20"
      style={{ 
        background: '#030308',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
};