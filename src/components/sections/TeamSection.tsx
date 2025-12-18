import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, PenTool, Monitor, Users, Clapperboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Ghost = ({ color, isScared = false }: { color: string, isScared?: boolean }) => (
  <div className={`w-6 h-6 relative ${isScared ? 'text-blue-300' : color} animate-bounce`} style={{ animationDuration: '0.5s' }}>
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M1 7a7 7 0 0 1 14 0v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1h-2v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1H4v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7z"/>
      <rect x="4" y="5" width="2" height="2" fill="white"/>
      <rect x="10" y="5" width="2" height="2" fill="white"/>
      <rect x="5" y="6" width="1" height="1" fill={isScared ? "transparent" : "blue"}/>
      <rect x="11" y="6" width="1" height="1" fill={isScared ? "transparent" : "blue"}/>
      {isScared && <path d="M3 10h2v1H3v-1zm4 0h2v1H7v-1zm4 0h2v1h-2v-1z" fill="white" />}
    </svg>
  </div>
);

const Pacman = ({ direction = 'right' }: { direction?: 'left' | 'right' }) => (
  <div className={`w-8 h-8 relative ${direction === 'left' ? 'scale-x-[-1]' : ''}`}>
    <div className="w-full h-full bg-yellow-400 rounded-full"></div>
    <div className="absolute top-0 right-0 w-full h-full bg-zinc-900" 
         style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)', animation: 'chomp 0.3s infinite alternate' }}>
    </div>
    <style>{`
      @keyframes chomp {
        0% { clip-path: polygon(50% 50%, 100% 20%, 100% 80%); }
        100% { clip-path: polygon(50% 50%, 100% 0, 100% 100%); }
      }
    `}</style>
  </div>
);

const Mushroom = () => (
  <div className="w-12 h-12 relative">
     <svg viewBox="0 0 16 16" className="w-full h-full">
       {/* Cap */}
       <path d="M5 2h6v1h2v2h2v3H1V5h2V3h2V2z" fill="#FF0000"/>
       {/* Spots */}
       <rect x="3" y="4" width="2" height="2" fill="white"/>
       <rect x="11" y="4" width="2" height="2" fill="white"/>
       <rect x="7" y="2" width="2" height="1" fill="white"/>
       {/* Stem */}
       <path d="M6 8h4v6H6V8z" fill="#FFD700"/>
       {/* Face */}
       <rect x="7" y="9" width="1" height="2" fill="black"/>
       <rect x="9" y="9" width="1" height="2" fill="black"/>
     </svg>
  </div>
);

const MysteryBlock = ({ onClick }: { onClick: () => void }) => (
  <div onClick={onClick} className="w-12 h-12 bg-yellow-500 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer hover:-translate-y-2 active:translate-y-1 transition-all group relative overflow-hidden">
    <span className="font-mono text-2xl font-bold text-black animate-pulse">?</span>
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
  </div>
);

const team = [
  {
    role: "CEO & CHIEF DESIGNER",
    name: "MARCIO",
    desc: "Visionary leader steering the brand's aesthetic direction.",
    icon: <PenTool size={24} />,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20portrait%20of%20a%20bald%20male%20CEO%20wearing%20a%20black%20suit%20and%20sunglasses%20with%20visible%20mouth%20and%20beard%20stubble%2016%20bit%20style%20retro%20game%20avatar&image_size=portrait_4_3"
  },
  {
    role: "FILMMAKER / CREATIVE",
    name: "GABRIEL",
    desc: "Capturing the essence of speed through lens and pixels.",
    icon: <Camera size={24} />,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20portrait%20of%20a%20filmmaker%20holding%20a%20camera%20cyberpunk%20colors%2016%20bit&image_size=portrait_4_3"
  },
  {
    role: "CONTENT ADMIN",
    name: "ANI",
    desc: "Orchestrating digital presence with precision.",
    icon: <Monitor size={24} />,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20portrait%20of%20a%20woman%20with%20futuristic%20headset%20hacker%20style%2016%20bit&image_size=portrait_4_3"
  },
  {
    role: "MASTER DESIGNER",
    name: "BOB",
    desc: "Crafting the intricate details of our wheels.",
    icon: <PenTool size={24} />,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20portrait%20of%20a%20young%20male%20designer%20streetwear%20style%2016%20bit%20retro%20game%20avatar&image_size=portrait_4_3"
  },
  {
    role: "FILMMAKER / CREATIVE",
    name: "KAHUÃ",
    desc: "Capturing cinematic moments with unique vision.",
    icon: <Camera size={24} />,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20portrait%20of%20a%20young%20filmmaker%20holding%20a%20professional%20video%20camera%20on%20shoulder%20with%20black%20power%20hairstyle%20and%20sunglasses%2016%20bit%20retro%20game%20avatar&image_size=portrait_4_3"
  },
  {
    role: "STORYMAKER / MODELO",
    name: "CAMILA",
    desc: "Weaving narratives and style into every frame.",
    icon: <Clapperboard size={24} />,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20portrait%20of%20a%20beautiful%20blonde%20woman%20model%20storymaker%20posing%20with%20elegant%20style%20long%20hair%2016%20bit%20retro%20game%20avatar&image_size=portrait_4_3"
  }
];

const MatrixText = () => {
  return (
    <p className="font-mono mt-6 md:mt-0 text-right max-w-md bg-black border-2 border-neon-green p-4 shadow-[4px_4px_0px_0px_#32CD32] min-h-[88px] text-neon-green">
      <span className="block">CHOOSE YOUR CHARACTER</span>
      <span className="block">LEVEL: EXPERT</span>
    </p>
  );
};

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chaseRef = useRef<HTMLDivElement>(null);
  const chaseReverseRef = useRef<HTMLDivElement>(null);
  const mushroomRef = useRef<HTMLDivElement>(null);

  const playMushroomAnimation = () => {
    if (mushroomRef.current) {
      // Reset position first
      gsap.set(mushroomRef.current, { y: 0, opacity: 0, scale: 0 });
      
      const tl = gsap.timeline();
      tl.to(mushroomRef.current, {
        y: -60,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
      .to(mushroomRef.current, {
        y: 60,
        opacity: 0,
        rotation: 180,
        duration: 0.6,
        ease: "power2.in",
        delay: 0.2
      });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    
    if (section) {
      // Team Cards Animation
      gsap.fromTo(itemsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // Pacman Chase Animation (Top)
      if (chaseRef.current) {
        gsap.fromTo(chaseRef.current,
          { x: "-20%" },
          {
            x: "120%",
            duration: 15,
            ease: "none",
            repeat: -1
          }
        );
      }

      // Pacman Chase Animation (Bottom - Reverse)
      if (chaseReverseRef.current) {
        gsap.fromTo(chaseReverseRef.current,
          { x: "120%" },
          {
            x: "-20%",
            duration: 12,
            ease: "none",
            repeat: -1,
            delay: 5
          }
        );
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-zinc-900 py-24 px-6 md:px-20 relative overflow-hidden">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#00D4FF 2px, transparent 2px), linear-gradient(90deg, #00D4FF 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* EASTER EGGS LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Lane 1: Classic Chase */}
        <div className="absolute top-[15%] left-0 w-full opacity-30">
          <div ref={chaseRef} className="flex items-center gap-12">
             <div className="flex gap-4">
                <Ghost color="text-blue-500" />
                <Ghost color="text-pink-500" />
                <Ghost color="text-orange-500" />
                <Ghost color="text-red-500" />
             </div>
             <Pacman direction="right" />
          </div>
        </div>

        {/* Lane 2: Reverse Chase (Powered Up) */}
        <div className="absolute bottom-[20%] left-0 w-full opacity-30">
          <div ref={chaseReverseRef} className="flex items-center gap-12 flex-row-reverse">
             <div className="flex gap-4 flex-row-reverse">
                <Ghost color="text-blue-500" isScared={true} />
                <Ghost color="text-pink-500" isScared={true} />
                <Ghost color="text-orange-500" isScared={true} />
                <Ghost color="text-red-500" isScared={true} />
             </div>
             <Pacman direction="left" />
          </div>
        </div>

        {/* Space Invader Removed */}
         
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-4 border-neon-blue pb-8">
          <div>
            <div className="flex items-center gap-4 mb-4 relative">
              <h2 className="font-display text-4xl md:text-6xl text-white leading-none text-shadow-neon animate-pulse">
                PLAYER SELECT
              </h2>
              
              {/* Mystery Block Container */}
              <div className="relative">
                {/* Hidden Mushroom */}
                <div ref={mushroomRef} className="absolute left-0 bottom-0 pointer-events-none opacity-0 z-0">
                  <Mushroom />
                </div>
                
                {/* Block */}
                <div className="relative z-10 transform hover:scale-110 transition-transform cursor-pointer pointer-events-auto">
                   <MysteryBlock onClick={playMushroomAnimation} />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-neon-green animate-pulse"></div>
              <div className="w-4 h-4 bg-neon-orange animate-pulse delay-75"></div>
              <div className="w-4 h-4 bg-neon-blue animate-pulse delay-150"></div>
            </div>
          </div>
          <MatrixText />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el}
              className="group relative bg-black border-4 border-zinc-700 hover:border-neon-orange transition-all duration-0 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF6B35]"
            >
              {/* Image Container */}
              <div className="relative h-[250px] overflow-hidden border-b-4 border-zinc-700 group-hover:border-neon-orange">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover pixelated" 
                  style={{ imageRendering: 'pixelated' }}
                />
                
                {/* Floating Icon */}
                <div className="absolute top-2 right-2 bg-black border-2 border-white p-1 text-white">
                  {member.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display text-xl text-white mb-2 group-hover:text-neon-orange">{member.name}</h3>
                <p className="font-mono text-[10px] text-neon-blue mb-2 tracking-widest uppercase">{member.role}</p>
                <p className="font-sans text-xs text-gray-400 leading-tight">
                  {member.desc}
                </p>
              </div>

              {/* Stat Bars (Decorative) */}
              <div className="px-4 pb-4">
                 <div className="flex items-center gap-2 mb-1">
                   <span className="text-[8px] font-mono text-gray-500 w-8">STR</span>
                   <div className="h-2 flex-1 bg-zinc-800">
                     <div className="h-full bg-neon-green" style={{ width: `${80 + Math.random() * 20}%` }}></div>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="text-[8px] font-mono text-gray-500 w-8">INT</span>
                   <div className="h-2 flex-1 bg-zinc-800">
                     <div className="h-full bg-neon-blue" style={{ width: `${80 + Math.random() * 20}%` }}></div>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
