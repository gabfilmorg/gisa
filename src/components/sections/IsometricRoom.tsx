import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import CarModel from '../3d/CarModel';
import { Suspense } from 'react';

const IsometricFloor = () => {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <mesh receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      <gridHelper args={[20, 20, 0x555555, 0xCCCCCC]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
};

const IsometricRoom = () => {
  return (
    <div className="w-full h-full relative bg-[#1a213e]">
      <Canvas shadows dpr={[1, 2]}>
        {/* Isometric Camera Setup */}
        <OrthographicCamera 
          makeDefault 
          position={[20, 20, 20]} 
          zoom={40} 
          near={-50} 
          far={200}
          onUpdate={c => c.lookAt(0, 0, 0)}
        />
        
        <OrbitControls 
          enableZoom={true} 
          enableRotate={true} // Allow rotation to see around, but default is iso
          minZoom={20}
          maxZoom={100}
        />

        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[10, 20, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />

        <Suspense fallback={null}>
          <CarModel />
          <IsometricFloor />
        </Suspense>

      </Canvas>
      
      {/* UI Overlay - Room Name */}
      <div className="absolute top-4 left-4 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
        <h3 className="font-pixel text-sm font-bold">THE_SHOWROOM</h3>
        <p className="text-[10px] text-gray-600">Public Room • 24 Users</p>
      </div>
    </div>
  );
};

export default IsometricRoom;
