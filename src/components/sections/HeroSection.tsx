import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import RetroWindow from '../common/RetroWindow';
import PixelEarth from '../common/PixelEarth';
import { Globe } from 'lucide-react';

const HeroSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [showGaragePopup, setShowGaragePopup] = useState(false);

  useEffect(() => {
    // Text entrance
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" }
      );
    }

    // Loading bar animation - Fixed and smooth
    if (loadingBarRef.current) {
      gsap.killTweensOf(loadingBarRef.current); // Kill any existing tweens
      gsap.fromTo(loadingBarRef.current, 
        { width: "0%" },
        {
          width: "100%",
          duration: 4,
          ease: "steps(10)", // Distinct retro steps
          repeat: -1,
          repeatDelay: 0.5,
          yoyo: false // Reset to 0 instantly after filling
        }
      );
    }
  }, []);

  const handleStartEngine = () => {
    // Play engine sound
    if ((window as any).playRetroSound) {
      (window as any).playRetroSound('engine');
    }

    // Scroll to gallery
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGarageClick = () => {
    setShowGaragePopup(true);
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Street Fighter Style Stage Composition */}
      <div className="absolute inset-0 z-10">
        <div className="w-full h-full relative overflow-hidden">
          
          {/* LAYER 1: Main Scene (Single Cohesive Image) */}
          <img 
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wide%20angle%20panoramic%20pixel%20art%20scene%20white%20audi%20r8%20tuned%20with%20white%20wheels%20parked%20on%20luxury%20golf%20course%20grass%20with%20blonde%20woman%20golfer%20and%20cameraman%20filming%20nearby%20sunny%20blue%20sky%20far%20view%2016%20bit%20retro%20style%20seamless&image_size=landscape_16_9"
            alt="Gisa Wheels Scene"
            className="absolute inset-0 w-full h-full object-cover pixelated opacity-80"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Scanline/Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-30 background-size-[100%_2px,3px_100%] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20"></div>
        </div>
      </div>

      {/* Popup Layer */}
      {showGaragePopup && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-auto bg-black/50 backdrop-blur-sm">
          <RetroWindow 
            title="GLOBAL GARAGE" 
            width="400px" 
            height="auto" 
            onClose={() => setShowGaragePopup(false)}
            initialPosition={{ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 200 }}
          >
            <div className="p-6 flex flex-col items-center text-center gap-4 bg-[#ECECEC]">
              <div className="mb-2">
                <PixelEarth />
              </div>
              <h3 className="font-display text-xl text-black">WORLDWIDE GARAGE</h3>
              <p className="font-mono text-sm text-gray-600 leading-relaxed">
                NOSSA GARAGEM VAI SER NO MUNDO INTEIRO, ESPERANDO NOVOS CARROS CHEGAREM.
              </p>
              <div className="flex gap-2 mt-2">
                <Globe size={16} className="text-blue-600 animate-pulse" />
                <span className="font-mono text-xs text-blue-600 font-bold">CONNECTING...</span>
              </div>
            </div>
          </RetroWindow>
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-20">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="text-white border-2 border-neon-blue bg-black/80 p-4 shadow-[4px_4px_0_#00D4FF]">
            <h3 className="text-xl md:text-2xl font-bold tracking-widest text-white font-display drop-shadow-md">GISA WHEELS</h3>
            <p className="text-sm text-neon-orange font-mono animate-pulse mt-1">INSERT COIN</p>
          </div>
          <div className="text-right hidden md:block border-2 border-zinc-700 bg-black/80 p-4 shadow-[4px_4px_0_#333]">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-neon-green font-mono">SCORE: <span className="text-white">000000</span></p>
              <p className="text-xs text-neon-pink font-mono">HIGH SCORE: <span className="text-white">999999</span></p>
              <p className="text-xs text-neon-blue font-mono mt-2">WORLD: <span className="text-white">1-1</span></p>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div ref={textRef} className="relative">
          <h2 className="display-font text-5xl md:text-7xl lg:text-8xl text-white leading-none drop-shadow-[6px_6px_0_#FF6B35] transform -skew-x-6">
            HYPER<br />
            <span className="text-neon-blue drop-shadow-[6px_6px_0_#fff]">MARKETING</span>
          </h2>
          
          <div className="flex items-center gap-4 mt-6">
            <div className="w-64 h-6 bg-gray-900 border-4 border-white relative overflow-hidden skew-x-[-10deg]">
               <div ref={loadingBarRef} className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-green to-green-400 w-0"></div>
            </div>
            <p className="font-mono text-neon-green text-lg animate-pulse">READY</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-end">
           <div className="font-mono text-xs text-gray-500 bg-black/80 p-2 border border-gray-800">
             CREDITS: 02
           </div>
           <div className="flex gap-4 pointer-events-auto">
             <button 
               onClick={handleStartEngine}
               className="group relative px-6 py-3 bg-black border-4 border-white text-white font-display text-sm hover:border-neon-orange hover:text-neon-orange transition-none shadow-[4px_4px_0_#000] hover:shadow-[4px_4px_0_#FF6B35] hover:-translate-y-1 active:translate-y-0 active:shadow-none"
             >
                START ENGINE
             </button>
             <button 
               onClick={handleGarageClick}
               className="group relative px-6 py-3 bg-black border-4 border-zinc-600 text-gray-400 font-display text-sm hover:border-neon-blue hover:text-neon-blue transition-none shadow-[4px_4px_0_#000] hover:shadow-[4px_4px_0_#00D4FF] hover:-translate-y-1 pointer-events-auto"
             >
                GARAGE
             </button>
           </div>
        </div>
      </div>
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-15 pointer-events-none opacity-80"></div>
    </section>
  );
};

export default HeroSection;
