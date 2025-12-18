import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';
import { WHEELS } from '../../constants/wheels';
import '../../styles/global.scss';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const wheelInnerRef = useRef<HTMLDivElement>(null);
  const { currentWheel, cursorColor } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  
  const activeWheel = WHEELS[currentWheel];
  
  // Physics state
  const lastPos = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const isFirstMove = useRef(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const wheelInner = wheelInnerRef.current;
    
    if (!cursor || !follower || !wheelInner) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Initialize position immediately on first move
      if (isFirstMove.current) {
         lastPos.current = { x: e.clientX, y: e.clientY };
         isFirstMove.current = false;
         gsap.set([cursor, follower], { x: e.clientX, y: e.clientY });
      }

      // Calculate Distance & Rotation
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Accumulate rotation (distance * multiplier)
      // 0.8 is a good speed for "rolling" feel
      rotation.current += distance * 0.8;
      
      lastPos.current = { x: e.clientX, y: e.clientY };

      // Main cursor (immediate)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'none'
      });
      
      // Follower (laggy wheel position)
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'back.out(1.2)'
      });

      // Wheel Rotation (independent of position lag)
      gsap.to(wheelInner, {
        rotation: rotation.current,
        duration: 0.1, // Quick response to rotation
        ease: 'none',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isVisible]); // Re-bind if isVisible changes (though mostly stable)

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Don't render on touch devices
  }

  return (
    <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      {/* Tiny crosshair center */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1 h-1 bg-white pointer-events-none z-[10000] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Wheel Cursor */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{ 
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px'
        }}
      >
        {/* Inner rotating container */}
        <div ref={wheelInnerRef} className="relative w-full h-full flex items-center justify-center">
           {/* Outer Rim */}
           <div 
             className="absolute inset-0 rounded-full border-[3px] shadow-[0_0_10px_currentColor]"
             style={{ borderColor: cursorColor, color: cursorColor }}
           />
           
           {/* Inner Spokes */}
           <activeWheel.icon 
             className="w-3/5 h-3/5 drop-shadow-[0_0_5px_currentColor]"
             style={{ color: cursorColor }}
             strokeWidth={2.5}
           />
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;