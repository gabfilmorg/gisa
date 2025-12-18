import { ReactNode, useState } from 'react';
import { X, Minus, Square } from 'lucide-react';
import '../../styles/global.scss';

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  width?: string;
  height?: string;
  onClose?: () => void;
  zIndex?: number;
}

const RetroWindow = ({ 
  title, 
  children, 
  initialPosition = { x: 50, y: 50 }, 
  width = '300px', 
  height = 'auto',
  onClose,
  zIndex = 10
}: RetroWindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="absolute flex flex-col shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      style={{
        left: position.x,
        top: position.y,
        width: width,
        height: height,
        zIndex: zIndex,
        backgroundColor: '#ECECEC',
        borderTop: '2px solid #FFFFFF',
        borderLeft: '2px solid #FFFFFF',
        borderRight: '2px solid #404040',
        borderBottom: '2px solid #404040',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Title Bar */}
      <div 
        className="flex justify-between items-center px-2 py-1 select-none cursor-move"
        style={{
          background: 'linear-gradient(to right, #000080, #1084d0)',
          color: 'white',
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-sm"></div> {/* Icon placeholder */}
          <span className="font-bold font-sans text-[11px] tracking-wide">{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="w-4 h-4 bg-[#ECECEC] border border-gray-500 flex items-center justify-center hover:bg-white active:border-gray-800">
            <Minus size={8} color="black" />
          </button>
          <button className="w-4 h-4 bg-[#ECECEC] border border-gray-500 flex items-center justify-center hover:bg-white active:border-gray-800">
            <Square size={8} color="black" />
          </button>
          <button 
            onClick={onClose}
            className="w-4 h-4 bg-[#ECECEC] border border-gray-500 flex items-center justify-center hover:bg-red-500 active:border-gray-800 group"
          >
            <X size={10} className="text-black group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-2 overflow-auto font-sans text-[11px] text-black">
        {children}
      </div>
    </div>
  );
};

export default RetroWindow;
