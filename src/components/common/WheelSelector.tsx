import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { WHEELS, CURSOR_COLORS } from '../../constants/wheels';
import '../../styles/global.scss';

const WheelSelector = () => {
  const { currentWheel, setWheel, hasStarted, cursorColor, setCursorColor } = useAppStore();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '6') {
        setWheel(parseInt(e.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setWheel]);

  // Removed (!hasStarted) check so the menu is always visible
  // if (!hasStarted) return null;

  return (
    <div className="absolute top-0 left-0 w-full z-[9999] flex justify-center pt-4 pointer-events-none">
      <div className="bg-black/90 backdrop-blur-sm border-2 border-zinc-700 p-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col gap-2 rounded-lg scale-[0.6] origin-top translate-y-2">
        
        {/* ROW 1: RIM STYLE */}
        <div className="flex gap-2 items-center">
          <div className="mr-2 border-r border-zinc-700 pr-2">
             <span className="font-display text-[10px] text-zinc-500 tracking-widest block text-right">RIM</span>
             <span className="font-display text-[10px] text-white tracking-widest block text-right">STYLE</span>
          </div>
          
          <div className="flex gap-1">
            {WHEELS.map((wheel, index) => (
              <div 
                key={wheel.id}
                onClick={() => setWheel(index)}
                className={`
                  relative w-10 h-10 cursor-pointer transition-all duration-200 group rounded-md flex items-center justify-center
                  ${currentWheel === index 
                    ? 'bg-zinc-800 ring-1 ring-white' 
                    : 'bg-transparent hover:bg-zinc-800'
                  }
                `}
              >
                {/* Rim Container */}
                <div 
                  className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${currentWheel === index ? 'scale-110' : 'opacity-50 group-hover:opacity-100 group-hover:scale-105'}
                  `}
                  style={{ 
                    borderColor: currentWheel === index ? cursorColor : '#666',
                    color: currentWheel === index ? cursorColor : '#666',
                    boxShadow: currentWheel === index ? `0 0 8px ${cursorColor}` : 'none'
                  }}
                >
                  <wheel.icon 
                    className="w-3/5 h-3/5"
                    strokeWidth={2.5}
                  />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-black border border-zinc-700 px-2 py-1 z-50 rounded">
                  <p className="font-mono text-[8px] text-white uppercase">{wheel.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] w-full bg-zinc-800"></div>

        {/* ROW 2: COLOR */}
        <div className="flex gap-2 items-center">
          <div className="mr-2 border-r border-zinc-700 pr-2">
             <span className="font-display text-[10px] text-zinc-500 tracking-widest block text-right">NEON</span>
             <span className="font-display text-[10px] text-white tracking-widest block text-right">COLOR</span>
          </div>
          
          <div className="flex gap-1">
            {CURSOR_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setCursorColor(color.value)}
                className={`
                  w-6 h-6 rounded-full border-2 transition-all duration-200 relative group
                  ${cursorColor === color.value ? 'scale-110 border-white shadow-[0_0_10px_currentColor]' : 'border-transparent hover:scale-110 hover:border-white/50'}
                `}
                style={{ backgroundColor: color.value, color: color.value }}
                aria-label={color.name}
              >
                 {/* Tooltip */}
                 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-black border border-zinc-700 px-2 py-1 z-50 rounded">
                  <p className="font-mono text-[8px] text-white uppercase">{color.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WheelSelector;
