import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const CarModel = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      {/* Car Body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.8, 2]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[1, 0, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1, 0, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1, 0, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1, 0, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};

export default CarModel;
