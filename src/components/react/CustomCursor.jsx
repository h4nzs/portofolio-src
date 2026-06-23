import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.translate = `${e.clientX - 8}px ${e.clientY - 8}px`;
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const handleHover = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    document.querySelectorAll('a, button, .cursor-pointer').forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    let animId;
    const lerp = () => {
      const target = mouseRef.current;
      const cur = ringPosRef.current;

      ringPosRef.current = {
        x: cur.x + (target.x - cur.x) * 0.35,
        y: cur.y + (target.y - cur.y) * 0.35,
      };

      if (ringRef.current) {
        ringRef.current.style.translate = `${ringPosRef.current.x - 24}px ${ringPosRef.current.y - 24}px`;
      }

      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scale = clicked ? 0.8 : hovered ? 1.5 : 1;
  const ringScale = clicked ? 0.8 : hovered ? 1.2 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference" style={{ willChange: 'transform' }}>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 bg-white rounded-full"
        style={{
          width: 16,
          height: 16,
          translate: '-108px -108px',
          scale: `${scale}`,
          transition: 'scale 0.1s ease-out',
          willChange: 'translate',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 border-2 border-white rounded-full"
        style={{
          width: 48,
          height: 48,
          translate: '-124px -124px',
          scale: `${ringScale}`,
          opacity: hovered ? 1 : 0.5,
          transition: 'scale 0.1s ease-out, opacity 0.15s ease-out',
          willChange: 'translate',
        }}
      />
    </div>
  );
};

export default CustomCursor;
