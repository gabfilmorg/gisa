import React from 'react';

const PixelEarth = () => {
  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.2)] border-4 border-black bg-[#1a1a2e]">
      {/* World Map Texture Animation */}
      <div 
        className="absolute inset-0 w-[200%] h-full opacity-90"
        style={{
          backgroundImage: `url('https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20world%20map%20equirectangular%20projection%20flat%20texture%20green%20continents%20blue%20ocean%20retro%20game%20style%20seamless&image_size=landscape_16_9')`,
          backgroundSize: '50% 100%',
          backgroundRepeat: 'repeat-x',
          animation: 'earth-spin 8s linear infinite',
          imageRendering: 'pixelated'
        }}
      />
      
      {/* Atmosphere/Shading Overlay */}
      <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),inset_5px_5px_10px_rgba(255,255,255,0.2)] pointer-events-none mix-blend-multiply"></div>
      
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
      
      <style>{`
        @keyframes earth-spin {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default PixelEarth;
