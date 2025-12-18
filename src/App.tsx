import CustomCursor from './components/common/CustomCursor';
import CRTOverlay from './components/common/CRTOverlay';
import WheelSelector from './components/common/WheelSelector';
import SoundManager from './components/common/SoundManager';
import SplashScreen from './components/sections/SplashScreen';
import HeroSection from './components/sections/HeroSection';
import GallerySection from './components/sections/GallerySection';
import TeamSection from './components/sections/TeamSection';
import CTASection from './components/sections/CTASection';
import { useAppStore } from './store/useAppStore';

function App() {
  const { hasStarted } = useAppStore();

  return (
    <>
      <CustomCursor />
      <CRTOverlay />
      <WheelSelector />
      <SoundManager />
      
      {!hasStarted && <SplashScreen />}
      
      {hasStarted && (
        <main className="w-full min-h-screen bg-black text-white overflow-hidden">
          <HeroSection />
          <GallerySection />
          <TeamSection />
          <CTASection />
        </main>
      )}
    </>
  );
}

export default App;
