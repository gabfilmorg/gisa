import React from 'react';

const CRTOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden h-full w-full">
      {/* Scanlines */}
      <div 
        className="absolute inset-0 z-10 opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%'
        }}
      />
      
      {/* Flicker Animation */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] animate-flicker bg-white"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)'
        }}
      />
      
      {/* Screen Curvature (Subtle) */}
      <div className="absolute inset-0 z-40 pointer-events-none border-[1px] border-white/5 rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
    </div>
  );
};

export default CRTOverlay;
