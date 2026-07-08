import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Cinnamoroll3DProps {
  onKeyPress?: (key: string) => void;
}

function CinnamorollModel({ onKeyPress }: Cinnamoroll3DProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/scene.gltf');
  const [model, setModel] = useState<THREE.Group | null>(null);
  const positionRef = useRef({ x: 0, y: 0, z: 0 });
  const velocityRef = useRef({ x: 0, y: 0, z: 0 });
  const rotationRef = useRef(0);
  const timeRef = useRef(0);
  const [animation, setAnimation] = useState<'float' | 'jump' | 'spin' | 'orbit'>('float');
  const [isJumping, setIsJumping] = useState(false);
  const jumpVelocityRef = useRef(0);

  useEffect(() => {
    if (scene) {
      const clonedScene = scene.clone();
      setModel(clonedScene as THREE.Group);
    }
  }, [scene]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === ' ') {
        e.preventDefault();
        // Salto
        if (!isJumping) {
          setIsJumping(true);
          jumpVelocityRef.current = 0.15;
          setAnimation('jump');
        }
      } else if (key === 'f') {
        // Giros flotando libremente
        e.preventDefault();
        setAnimation('orbit');
        // Velocidad aleatoria
        velocityRef.current.x = (Math.random() - 0.5) * 0.05;
        velocityRef.current.y = (Math.random() - 0.5) * 0.05;
      } else if (key === 'c') {
        // Vueltas de ballet
        e.preventDefault();
        setAnimation('spin');
      }
      
      onKeyPress?.(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, onKeyPress]);

  useFrame(() => {
    if (!group.current) return;

    timeRef.current += 0.016; // ~60fps

    // Aplicar gravedad y movimiento
    if (animation === 'orbit') {
      // Movimiento libre flotante
      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;
      positionRef.current.z += velocityRef.current.z;

      // Rebotar en los bordes
      const boundary = 2;
      if (Math.abs(positionRef.current.x) > boundary) {
        velocityRef.current.x *= -1;
        positionRef.current.x = Math.max(-boundary, Math.min(boundary, positionRef.current.x));
      }
      if (Math.abs(positionRef.current.y) > boundary) {
        velocityRef.current.y *= -1;
        positionRef.current.y = Math.max(-boundary, Math.min(boundary, positionRef.current.y));
      }
    } else if (animation === 'jump') {
      // Salto
      jumpVelocityRef.current -= 0.008; // Gravedad
      positionRef.current.y += jumpVelocityRef.current;

      if (positionRef.current.y <= 0) {
        positionRef.current.y = 0;
        setIsJumping(false);
        setAnimation('float');
      }
    } else {
      // Flotación normal
      positionRef.current.y = Math.sin(timeRef.current * 2) * 0.1;
    }

    group.current.position.set(positionRef.current.x, positionRef.current.y, positionRef.current.z);

    // Aplicar animaciones
    switch (animation) {
      case 'float':
        group.current.rotation.z = Math.sin(timeRef.current * 1) * 0.05;
        break;

      case 'jump':
        group.current.rotation.z = Math.sin(timeRef.current * 8) * 0.2;
        group.current.scale.y = 0.9 + Math.abs(Math.sin(timeRef.current * 8)) * 0.1;
        break;

      case 'spin':
        // Vuelta de ballet - rotación alrededor del eje Y
        group.current.rotation.y += 0.1;
        break;

      case 'orbit':
        // Giros mientras flota
        group.current.rotation.z += 0.08;
        group.current.rotation.x = Math.sin(timeRef.current * 2) * 0.3;
        break;
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {model && <primitive object={model} scale={0.15} />}
    </group>
  );
}

export default function Cinnamoroll3D(props: Cinnamoroll3DProps) {
  return (
    <Canvas
      style={{ width: '200px', height: '200px' }}
      camera={{ position: [0, 0, 2], fov: 50 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ffb6c1" />
      
      <CinnamorollModel {...props} />
    </Canvas>
  );
}
