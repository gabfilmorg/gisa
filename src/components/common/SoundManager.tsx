import { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Volume2, VolumeX } from 'lucide-react';

const SoundManager = () => {
  const { isAudioMuted, toggleAudio, hasStarted } = useAppStore();
  const audioContextRef = useRef<AudioContext | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize Audio Context and BGM
  useEffect(() => {
    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }

    // Setup BGM
    const audio = new Audio('/assets/audio/theme.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Lower volume for background
    bgmRef.current = audio;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Retro SFX Synthesizer
  const playRetroSound = (type: 'hover' | 'click' | 'coin' | 'engine') => {
    if (isAudioMuted || !audioContextRef.current) return;
    
    // Resume context if suspended (browser policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'hover') {
      // Quick high blip
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);

    } else if (type === 'click') {
      // Low confirm zap
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);

    } else if (type === 'coin') {
      // Classic Coin Sound (Two tones: B5 -> E6)
      osc.type = 'square';
      osc.frequency.setValueAtTime(987, ctx.currentTime); 
      osc.frequency.setValueAtTime(1318, ctx.currentTime + 0.08); 
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'engine') {
      // Engine Start Rumble
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4); // Rev up
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.2); // Rev down
      
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.5);
      
      // Secondary low rumble for depth
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(50, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);
      osc2.frequency.linearRampToValueAtTime(40, ctx.currentTime + 1.5);
      
      gain2.gain.setValueAtTime(0.2, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 1.5);
    }
  };

  // Handle Play/Pause and Coin Sound
  useEffect(() => {
    // Expose play function to global window for easier access from other components without complex context refactoring
    (window as any).playRetroSound = playRetroSound;
    
    if (!bgmRef.current) return;

    if (hasStarted && !isAudioMuted) {
      // Play Start/Coin sound
      playRetroSound('coin');

      // Try to play BGM
      const playPromise = bgmRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play failed (interaction needed):", error);
        });
      }
    } else {
      bgmRef.current.pause();
    }
  }, [hasStarted, isAudioMuted]);

  // Global Event Listeners for SFX
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Play sound for buttons, links, or interactive elements
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.classList.contains('cursor-pointer')) {
        playRetroSound('hover');
      }
    };

    const handleClick = () => {
      playRetroSound('click');
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isAudioMuted]);

  // Render Toggle Button (only if started, since Splash has its own)
  if (!hasStarted) return null;

  return (
    <button 
      onClick={toggleAudio}
      className="fixed bottom-8 right-8 z-[9999] bg-black border-2 border-neon-blue p-3 text-neon-blue hover:bg-neon-blue hover:text-black transition-colors shadow-[4px_4px_0_#00D4FF]"
      title={isAudioMuted ? "Unmute Sound" : "Mute Sound"}
    >
      {isAudioMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default SoundManager;
