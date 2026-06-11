import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let globalGlitchActive = false;
    let glitchTimer = 0;
    let wakeUpFlash = 0;

    const mouse = { x: -1000, y: -1000 };

    canvas.width = width;
    canvas.height = height;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.isInfested = false;
        this.infestationLife = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.infestationLife > 0) {
          this.infestationLife--;
          this.x += (Math.random() - 0.5) * 2;
          this.y += (Math.random() - 0.5) * 2;
        } else {
          this.isInfested = false;
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        const color = this.isInfested 
            ? `rgba(255, ${Math.random() * 50}, ${Math.random() * 50}, 0.9)`
            : 'rgba(100, 200, 255, 0.4)';
            
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (this.isInfested) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'red';
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
      }

      infest() {
        this.isInfested = true;
        this.infestationLife = 60;
      }
    }

    class CyberAttack {
        constructor(originX, originY, target) {
            this.originX = originX;
            this.originY = originY;
            this.target = target;
            this.life = 10;
        }

        update() {
            this.life--;
            if (this.life === 3) this.target.infest();
        }

        draw() {
            const opacity = this.life / 10;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'red';
            ctx.moveTo(this.originX, this.originY);
            ctx.lineTo(this.target.x, this.target.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    class BreachGate {
        constructor() {
            this.reset();
            this.blockPositions = [];
            for(let i=0; i<60; i++) {
                this.blockPositions.push({
                    angle: (i / 60) * Math.PI * 2,
                    offset: (Math.random() - 0.5) * 20,
                    size: 15 + Math.random() * 25,
                    opacity: 0.3 + Math.random() * 0.5
                });
            }
        }

        reset() {
            this.active = false;
            this.state = 'idle'; 
            this.x = 0;
            this.y = 0;
            this.progressX = 0;
            this.progressY = 0;
            this.targetRX = 160;
            this.targetRY = 240;
            this.timer = 0;
            this.attacks = [];
            this.attackCooldown = 0;
            this.vignetteAlpha = 0;
        }

        start() {
            this.active = true;
            this.state = 'warning';
            this.timer = 80; 
            this.x = Math.random() > 0.5 ? width * 0.15 : width * 0.85;
            this.y = Math.random() * (height - 500) + 250;
            this.progressX = 0;
            this.progressY = 0;
            this.vignetteAlpha = 0;
        }

        update() {
            if (!this.active) return;

            switch(this.state) {
                case 'warning':
                    this.timer--;
                    if (this.timer <= 0) this.state = 'initial';
                    break;
                case 'initial':
                    this.progressY += 0.25;
                    this.progressX = 0.04;
                    if (this.progressY >= 1) {
                        this.progressY = 1;
                        this.state = 'pause';
                        this.timer = 25;
                    }
                    break;
                case 'pause':
                    this.timer--;
                    if (this.timer <= 0) this.state = 'struggle_open';
                    break;
                case 'struggle_open':
                    // Resistance when opening
                    const step = Math.random() > 0.65 ? 0.05 : -0.02;
                    this.progressX += step;
                    if (this.progressX >= 1) {
                        this.progressX = 1;
                        this.state = 'active';
                        this.timer = 240;
                    }
                    break;
                case 'active':
                    this.timer--;
                    this.vignetteAlpha = Math.min(this.vignetteAlpha + 0.02, 0.5);
                    
                    if (this.attackCooldown <= 0) {
                        const avail = particles.filter(p => !p.isInfested);
                        if (avail.length > 0) {
                            const oAngle = Math.random() * Math.PI * 2;
                            const oDist = Math.random() * 0.7;
                            const oX = this.x + Math.cos(oAngle) * (this.targetRX * this.progressX * oDist);
                            const oY = this.y + Math.sin(oAngle) * (this.targetRY * this.progressY * oDist);
                            this.attacks.push(new CyberAttack(oX, oY, avail[Math.floor(Math.random() * avail.length)]));
                            this.attackCooldown = 5;
                        }
                    } else { this.attackCooldown--; }

                    if (this.timer <= 0) this.state = 'closing';
                    break;
                case 'closing':
                    // Quick snap close
                    this.progressX -= 0.15;
                    this.vignetteAlpha *= 0.7;
                    if (this.progressX <= 0) {
                        this.progressX = 0;
                        this.progressY -= 0.3;
                        if (this.progressY <= 0) {
                            this.active = false;
                            wakeUpFlash = 1.0;
                        }
                    }
                    break;
            }

            this.attacks.forEach((a, i) => {
                a.update();
                if (a.life <= 0) this.attacks.splice(i, 1);
            });
        }

        draw() {
            if (!this.active) return;

            const curRX = Math.max(0, this.targetRX * this.progressX);
            const curRY = Math.max(0, this.targetRY * this.progressY);

            if (this.state === 'warning') {
                const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 100);
                grad.addColorStop(0, `rgba(255, 0, 0, ${0.4 * (1 - this.timer/80)})`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath(); ctx.arc(this.x, this.y, 100, 0, Math.PI * 2); ctx.fill();
                return;
            }

            if (this.vignetteAlpha > 0) {
                const vignette = ctx.createRadialGradient(width/2, height/2, width*0.05, width/2, height/2, width*0.95);
                vignette.addColorStop(0, 'transparent');
                vignette.addColorStop(1, `rgba(200, 0, 0, ${this.vignetteAlpha})`);
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, width, height);
            }

            ctx.save();
            const jitter = (this.state === 'struggle_open' || this.state === 'pause') ? (Math.random()-0.5)*20 : 0;
            ctx.translate(jitter, 0);

            // Void
            if (curRX > 0 && curRY > 0) {
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, curRX, curRY, 0, 0, Math.PI * 2);
                ctx.fillStyle = '#000000';
                ctx.fill();
                ctx.clip();

                for(let i=0; i<20; i++) {
                    ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() * 0.4})`;
                    ctx.fillRect(this.x - curRX, this.y - curRY + Math.random() * curRY * 2, curRX * 2, 1);
                }
            }
            ctx.restore();

            // Border Blocks
            this.blockPositions.forEach(b => {
                const bx = this.x + Math.cos(b.angle) * (curRX + b.offset);
                const by = this.y + Math.sin(b.angle) * (curRY + b.offset);
                const flick = Math.random() > 0.8 ? 1 : 0.6;
                ctx.fillStyle = `rgba(230, 0, 0, ${b.opacity * Math.max(this.progressX, this.progressY) * flick})`;
                ctx.fillRect(bx - b.size/2, by - b.size/2, b.size, b.size);
            });

            this.attacks.forEach(a => a.draw());
        }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());
    const gate = new BreachGate();
    let nextBreachTimer = 60; 

    const animate = () => {
      glitchTimer--;
      if (glitchTimer <= 0) {
        if (!globalGlitchActive && Math.random() > 0.997) {
            globalGlitchActive = true;
            glitchTimer = 2 + Math.random() * 2;
        } else {
            globalGlitchActive = false;
            glitchTimer = 300 + Math.random() * 400;
        }
      }

      if (globalGlitchActive) {
          ctx.filter = 'invert(1) contrast(1.4)';
          ctx.setTransform(1, 0, 0.1, 1, (Math.random()-0.5)*25, 0);
      } else {
          ctx.filter = 'none';
          ctx.setTransform(1, 0, 0, 1, 0, 0);
      }

      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = (p.isInfested || p2.isInfested) 
                ? `rgba(255, 0, 0, ${0.5 * (1 - distance / connectionDistance)})`
                : `rgba(100, 200, 255, ${0.12 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = (p.isInfested || p2.isInfested) ? 1.5 : 1;
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        });
      });

      if (!gate.active) {
        nextBreachTimer--;
        if (nextBreachTimer <= 0) {
            gate.start();
            nextBreachTimer = 600 + Math.random() * 600;
        }
      }
      gate.update();
      gate.draw();

      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouseDistance) {
          ctx.beginPath();
          ctx.strokeStyle = p.isInfested 
            ? `rgba(255, 50, 50, ${0.7 * (1 - distance / mouseDistance)})` 
            : `rgba(34, 211, 238, ${0.45 * (1 - distance / mouseDistance)})`; 
          ctx.lineWidth = 1.5;
          ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      });

      if (wakeUpFlash > 0) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.filter = 'none';
          ctx.fillStyle = `rgba(255, 255, 255, ${wakeUpFlash})`;
          ctx.fillRect(0, 0, width, height);
          wakeUpFlash -= 0.08; 
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none bg-[#050505]"
    />
  );
};

export default NetworkBackground;
