import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const images = [
    {
      src: "/assets/gallery/R8_GOLF.png",
      title: "R8 NO GOLFE",
      category: "PRODUCTION"
    },
    {
      src: "/assets/gallery/DRIFT.png",
      title: "DRIFT DAY",
      category: "EVENT"
    },
    {
      src: "/assets/gallery/GT3RS.png",
      title: "PORSCHE GT3 RS",
      category: "LIFESTYLE"
    },
    {
      src: "/assets/gallery/JOAO_CIMED.webp",
      title: "JOAO CIMED",
      category: "PROJECT"
    }
  ];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [modeText, setModeText] = useState("MODE");

  useEffect(() => {
    const interval = setInterval(() => {
      setModeText(prev => prev === "MODE" ? "NOW" : "MODE");
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    
    if (section) {
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="gallery-section" ref={sectionRef} className="w-full min-h-screen bg-black py-20 px-6 md:px-20 relative overflow-hidden">
      
      {/* Scanlines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
           style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px)' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Retro Header */}
        <div className={`mb-16 border-l-8 pl-6 ${modeText === "NOW" ? "border-neon-green" : "border-neon-pink"} transition-colors duration-300`}>
          <div className="relative">
             <h2 className="font-display text-5xl md:text-7xl text-white leading-none mb-2 text-shadow-neon">
               <span className="animate-pulse">REPLAY</span> <span className={`${modeText === "NOW" ? "text-neon-green" : "text-neon-pink"} transition-colors duration-300`}>{modeText}</span>
             </h2>
             {/* Glitch Effect Blocks */}
             <div className="absolute -top-4 -right-10 w-20 h-4 bg-neon-blue opacity-50 hidden md:block"></div>
             <div className="absolute top-10 -left-10 w-4 h-20 bg-neon-green opacity-50 hidden md:block"></div>
          </div>
          <p className="font-mono text-neon-blue mt-4 tracking-widest text-lg">
            INSERT COIN TO VIEW GALLERY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative h-[350px] border-4 border-gray-800 bg-black cursor-pointer hover:border-neon-pink transition-all duration-0 hover:shadow-[8px_8px_0px_0px_#FF1493]"
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 image-pixelated"
                style={{ imageRendering: 'pixelated' }}
              />
              
              {/* CRT Scanline on Image */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,6px_100%]"></div>
              
              {/* Content Box */}
              <div className="absolute bottom-4 left-4 bg-black border-2 border-white p-4 z-20 group-hover:bg-neon-pink group-hover:border-black transition-colors">
                <p className="text-neon-green font-mono text-xs mb-1 group-hover:text-black">{img.category}</p>
                <h3 className="font-display text-2xl text-white group-hover:text-black">{img.title}</h3>
              </div>

              {/* Play Icon */}
              <div className="absolute top-4 right-4 bg-black border-2 border-neon-blue w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Play size={24} className="text-neon-blue fill-neon-blue" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
