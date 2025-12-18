import { useState } from 'react';
import RetroWindow from '../common/RetroWindow';
import GalleryWindowContent from '../sections/GallerySection';
import TeamWindowContent from '../sections/TeamSection';
import { MessageSquare, Users, Image, Volume2, VolumeX, Grid } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const HabboUI = () => {
  const { isAudioMuted, toggleAudio } = useAppStore();
  
  const [windows, setWindows] = useState({
    gallery: false,
    concepts: false,
    team: true, // Open by default
    chat: false
  });

  const toggleWindow = (key: keyof typeof windows) => {
    setWindows(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Enable pointer events only for windows */}
        <div className="w-full h-full pointer-events-auto relative">
          
          {windows.gallery && (
            <RetroWindow 
              title="Gallery" 
              initialPosition={{ x: 100, y: 100 }} 
              width="320px" 
              height="400px"
              onClose={() => toggleWindow('gallery')}
            >
              <GalleryWindowContent />
            </RetroWindow>
          )}

          {windows.team && (
            <RetroWindow 
              title="Room Info" 
              initialPosition={{ x: window.innerWidth - 220, y: 80 }} 
              width="200px" 
              height="auto"
              onClose={() => toggleWindow('team')}
            >
              <TeamWindowContent />
            </RetroWindow>
          )}

        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[#D4D4D4] border-t-2 border-white flex items-center px-4 justify-between shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2">
           <button 
             onClick={() => toggleWindow('chat')}
             className="bg-white border-2 border-gray-600 p-2 hover:bg-[#E6F4FF] active:border-inset"
           >
             <MessageSquare size={16} />
           </button>
           <div className="h-8 w-[2px] bg-gray-400 mx-1"></div>
           <input 
             type="text" 
             placeholder="Type here to chat..." 
             className="h-8 w-64 px-2 border-2 border-gray-600 font-sans text-xs outline-none focus:bg-white bg-[#EEE]"
           />
           <button className="pixel-btn h-8">SAY</button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => toggleWindow('gallery')} className="flex flex-col items-center group">
            <Image size={18} className={`group-hover:text-blue-600 ${windows.gallery ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className="text-[9px] font-bold text-gray-600">PHOTOS</span>
          </button>
          
          <button onClick={() => toggleWindow('concepts')} className="flex flex-col items-center group">
            <Grid size={18} className={`group-hover:text-blue-600 ${windows.concepts ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className="text-[9px] font-bold text-gray-600">ITEMS</span>
          </button>

          <button onClick={() => toggleWindow('team')} className="flex flex-col items-center group">
            <Users size={18} className={`group-hover:text-blue-600 ${windows.team ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className="text-[9px] font-bold text-gray-600">FRIENDS</span>
          </button>

          <div className="h-8 w-[2px] bg-gray-400 mx-1"></div>

          <button onClick={toggleAudio} className="text-gray-600 hover:text-black">
            {isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default HabboUI;
