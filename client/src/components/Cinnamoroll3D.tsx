import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Cinnamoroll3DProps {
  onClick: () => void;
  animation: 'walk' | 'float' | 'eat' | 'spin' | 'ears';
  targetPosition?: { x: number; y: number };
  isMoving?: boolean;
}

function CinnamorollModel({ onClick, animation, targetPosition, isMoving }: Cinnamoroll3DProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/scene.gltf');
  const [model, setModel] = useState<THREE.Group | null>(null);
  const positionRef = useRef({ x: 0, y: 0, z: 0 });
  const targetPosRef = useRef({ x: 0, y: 0, z: 0 });
  const rotationRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    if (scene) {
      const clonedScene = scene.clone();
      setModel(clonedScene as THREE.Group);
    }
  }, [scene]);

  useEffect(() => {
    if (targetPosition) {
      // Convertir posición de pantalla (0-100%) a coordenadas 3D
      targetPosRef.current.x = (targetPosition.x / 100 - 0.5) * 4;
      targetPosRef.current.y = (0.5 - targetPosition.y / 100) * 3;
    }
  }, [targetPosition]);

  useFrame(() => {
    if (!group.current) return;

    timeRef.current += 0.016; // ~60fps

    // Movimiento suave hacia la posición objetivo
    if (isMoving) {
      const speed = 0.1;
      positionRef.current.x += (targetPosRef.current.x - positionRef.current.x) * speed;
      positionRef.current.y += (targetPosRef.current.y - positionRef.current.y) * speed;
    }

    group.current.position.set(positionRef.current.x, positionRef.current.y, positionRef.current.z);

    // Aplicar animaciones
    switch (animation) {
      case 'float':
        group.current.position.y += Math.sin(timeRef.current * 2) * 0.01;
        group.current.rotation.z = Math.sin(timeRef.current * 1) * 0.1;
        break;

      case 'walk':
        group.current.position.x += Math.sin(timeRef.current * 4) * 0.01;
        group.current.rotation.z = Math.sin(timeRef.current * 4) * 0.15;
        group.current.scale.x = Math.cos(timeRef.current * 4) > 0 ? 1 : -1;
        break;

      case 'eat':
        group.current.scale.y = 0.95 + Math.sin(timeRef.current * 6) * 0.05;
        group.current.rotation.x = Math.sin(timeRef.current * 6) * 0.2;
        break;

      case 'spin':
        // Vuelta de ballet - rotación alrededor del eje Y (vertical)
        group.current.rotation.y += 0.08;
        break;

      case 'ears':
        group.current.rotation.x = Math.sin(timeRef.current * 10) * 0.3;
        break;
    }
  });

  return (
    <group
      ref={group}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {model && <primitive object={model} scale={0.25} />}
    </group>
  );
}

export default function Cinnamoroll3D(props: Cinnamoroll3DProps) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 2], fov: 50 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ffb6c1" />
      
      <CinnamorollModel {...props} />
    </Canvas>
  );
}
