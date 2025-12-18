import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PricingCard = ({ plan }: { plan: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`pricing-card bg-black border-4 ${plan.borderColor} p-8 relative overflow-hidden group transition-all duration-300 ${plan.bgHover} flex flex-col`}
      style={{
        boxShadow: isHovered ? `12px 12px 0 ${plan.shadowColor}` : `8px 8px 0 ${plan.shadowColor}`,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-neon-blue text-black font-display text-xs px-2 py-1 transform translate-x-2 -translate-y-0">
          BEST VALUE
        </div>
      )}
      
      <div className="mb-6 border-b-2 border-dashed border-gray-800 pb-4">
        <h3 className={`font-display text-3xl ${plan.color} mb-2`}>{plan.name}</h3>
        <div className="flex items-end justify-center gap-2">
          <span className="font-display text-4xl text-white">{plan.price}</span>
          <span className="font-mono text-xs text-gray-500 mb-2">{plan.currency}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-1 text-left">
        {plan.features.map((feature: string, i: number) => (
          <li key={i} className="font-mono text-sm text-gray-300 flex items-center gap-2">
            <div className={`w-2 h-2 ${plan.color.replace('text-', 'bg-')} rounded-none`}></div>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full bg-transparent border-2 ${plan.borderColor} ${plan.color} font-display py-3 hover:${plan.color.replace('text-', 'bg-')} hover:text-black transition-colors flex items-center justify-center gap-2 group/btn`}>
        <span>SELECT</span>
        <Send size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showRays, setShowRays] = useState(false);

  const handleLogoClick = () => {
    setShowRays(true);
    setTimeout(() => setShowRays(false), 800);
  };

  const plans = [
    {
      name: "STARTER",
      price: "$1000",
      currency: "USD",
      features: ["1 Player Profile", "Basic Wheels", "Standard Speed", "No Turbo"],
      color: "text-white",
      borderColor: "border-zinc-700",
      shadowColor: "#333",
      bgHover: "hover:bg-zinc-900"
    },
    {
      name: "PRO RACER",
      price: "$1500",
      currency: "USD",
      features: ["Multiplayer Mode", "All Wheels Unlocked", "Nitro Boost", "Custom Skins"],
      color: "text-neon-blue",
      borderColor: "border-neon-blue",
      shadowColor: "#00D4FF",
      bgHover: "hover:bg-blue-900/20",
      popular: true
    },
    {
      name: "LEGEND",
      price: "$2000",
      currency: "USD",
      features: ["Unlimited Access", "Dev Tools", "God Mode", "Priority Support"],
      color: "text-neon-orange",
      borderColor: "border-neon-orange",
      shadowColor: "#FF6B35",
      bgHover: "hover:bg-orange-900/20"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    
    if (section) {
      gsap.fromTo(".pricing-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Background Particles (Simulated with dots) */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
         style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10 w-full max-w-6xl text-center">
        <h2 className="display-font text-5xl md:text-7xl text-white mb-4 drop-shadow-[6px_6px_0_#FF0000]">
          SELECT <span className="text-neon-green">MODE</span>
        </h2>
        <p className="font-mono text-xl text-gray-400 mb-12">CHOOSE YOUR DIFFICULTY LEVEL</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="mt-20 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 font-mono text-xs gap-4">
            <p>© 2024 GISA WHEELS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neon-blue">INSTAGRAM</a>
              <a href="#" className="hover:text-neon-blue">LINKEDIN</a>
              <a href="#" className="hover:text-neon-blue">TWITTER</a>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center pb-8 relative">
            <div 
              className="relative inline-block cursor-pointer group"
              onClick={handleLogoClick}
            >
              {/* Rays Effect */}
              {showRays && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 h-[4px] bg-gradient-to-r from-neon-blue via-neon-pink to-transparent origin-left rounded-full"
                      style={{
                        width: '0px',
                        transform: `translateY(-50%) rotate(${i * 30}deg)`,
                        animation: 'ray-burst 0.8s ease-out forwards'
                      }}
                    />
                  ))}
                  <style>{`
                    @keyframes ray-burst {
                      0% { width: 0px; opacity: 1; }
                      50% { width: 200px; opacity: 0.8; }
                      100% { width: 300px; opacity: 0; }
                    }
                  `}</style>
                </div>
              )}

              <img 
                src="/assets/logo/logo.png" 
                alt="GISA WHEELS" 
                className="relative z-10 h-24 md:h-32 w-auto opacity-80 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] active:scale-95"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
