import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const SplashScreen = () => {
  const { startExperience, isAudioMuted, toggleAudio } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(containerRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
    .fromTo(textRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
    .to(subtextRef.current, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        gsap.to(subtextRef.current, {
          opacity: 0.2,
          yoyo: true,
          repeat: -1,
          duration: 0.8,
          ease: "steps(1)" // Blink effect
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleStart = () => {
    if (containerRef.current) {
      // Explosive transition
      gsap.to(containerRef.current, {
        scale: 2,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: startExperience
      });
    } else {
      startExperience();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-[9000] bg-black text-white"
      style={{
        background: 'radial-gradient(circle, #1a1a1a 0%, #000000 100%)'
      }}
    >
      <div className="absolute top-8 right-8 z-50 cursor-pointer pointer-events-auto" onClick={toggleAudio}>
        {isAudioMuted ? <VolumeX size={32} color="#00D4FF" /> : <Volume2 size={32} color="#00D4FF" />}
      </div>

      <div className="text-center relative">
        <h1 
          ref={textRef}
          className="display-font text-6xl md:text-8xl font-bold mb-8 relative tracking-tighter"
          style={{ 
            color: 'white',
            textShadow: '6px 6px 0px #00D4FF, -6px -6px 0px #FF6B35'
          }}
        >
          GISA <br /> <span className="text-neon-green">EVOLUTION</span>
        </h1>
        
        <div ref={subtextRef} className="flex flex-col items-center gap-4" style={{ opacity: 0 }}>
          <p 
            onClick={handleStart}
            className="text-2xl md:text-3xl font-mono cursor-pointer text-yellow-400 hover:text-white transition-none animate-pulse"
            style={{ letterSpacing: '4px' }}
          >
            INSERT COIN
          </p>
          <p className="text-xs text-gray-500 font-mono mt-12">
            © 2002-2008 GISA CORP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 w-full h-1 bg-neon-blue shadow-[0_0_20px_#00D4FF]"></div>
      <div className="absolute top-0 w-full h-1 bg-neon-orange shadow-[0_0_20px_#FF6B35]"></div>
    </div>
  );
};

export default SplashScreen;
