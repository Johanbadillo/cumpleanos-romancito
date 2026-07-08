import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Particle {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
  life: number;
  maxLife: number;
}

interface Cinnamoroll3DProps {
  onKeyPress?: (key: string) => void;
}

function ParticleSystem({ particles }: { particles: Particle[] }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      positions[i * 3] = p.position[0];
      positions[i * 3 + 1] = p.position[1];
      positions[i * 3 + 2] = p.position[2];
    });

    if (pointsRef.current.geometry) {
      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length} array={new Float32Array(particles.length * 3)} itemSize={3} args={[new Float32Array(particles.length * 3), 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#FFD700" sizeAttenuation />
    </points>
  );
}

function CinnamorollModel({ onKeyPress }: Cinnamoroll3DProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/scene.gltf');
  const [model, setModel] = useState<THREE.Group | null>(null);
  const positionRef = useRef({ x: 0, y: 0, z: 0 });
  const velocityRef = useRef({ x: 0, y: 0, z: 0 });
  const timeRef = useRef(0);
  const [animation, setAnimation] = useState<'float' | 'jump' | 'spin' | 'orbit' | 'walk' | 'bow' | 'dance' | 'eat'>('float');
  const [isJumping, setIsJumping] = useState(false);
  const jumpVelocityRef = useRef(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const soundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (scene) {
      const clonedScene = scene.clone();
      setModel(clonedScene as THREE.Group);
    }
  }, [scene]);

  const playSound = (type: 'jump' | 'spin' | 'float' | 'bow' | 'dance' | 'eat') => {
    if (!soundRef.current) return;

    const frequencies: Record<string, number> = {
      jump: 800,
      spin: 600,
      float: 400,
      bow: 500,
      dance: 700,
      eat: 900,
    };

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequencies[type];
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const createConfetti = () => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = 0.05 + Math.random() * 0.05;
      newParticles.push({
        id: particleIdRef.current++,
        position: [positionRef.current.x, positionRef.current.y, positionRef.current.z],
        velocity: [Math.cos(angle) * speed, Math.sin(angle) * speed + 0.02, Math.random() * 0.02],
        life: 1,
        maxLife: 1,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === ' ') {
        e.preventDefault();
        if (!isJumping) {
          setIsJumping(true);
          jumpVelocityRef.current = 0.15;
          setAnimation('jump');
          playSound('jump');
        }
      } else if (key === 'f') {
        e.preventDefault();
        setAnimation('orbit');
        velocityRef.current.x = (Math.random() - 0.5) * 0.05;
        velocityRef.current.y = (Math.random() - 0.5) * 0.05;
        playSound('spin');
        createConfetti();
      } else if (key === 'c') {
        e.preventDefault();
        setAnimation('spin');
        playSound('spin');
        createConfetti();
      } else if (key === 'r') {
        e.preventDefault();
        setAnimation('bow');
        playSound('bow');
      } else if (key === 'd') {
        e.preventDefault();
        setAnimation('dance');
        playSound('dance');
        createConfetti();
      } else if (key === 'm') {
        e.preventDefault();
        setAnimation('eat');
        playSound('eat');
      }

      onKeyPress?.(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, onKeyPress]);

  useFrame(() => {
    if (!group.current) return;

    timeRef.current += 0.016;

    // Actualizar partículas
    setParticles((prev) =>
      prev
        .map((p) => ({
          ...p,
          position: [
            p.position[0] + p.velocity[0],
            p.position[1] + p.velocity[1],
            p.position[2] + p.velocity[2],
          ] as [number, number, number],
          velocity: [p.velocity[0], p.velocity[1] - 0.001, p.velocity[2]] as [number, number, number],
          life: p.life - 0.016,
        }))
        .filter((p) => p.life > 0)
    );

    // Aplicar movimiento
    if (animation === 'orbit') {
      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;

      const boundary = 1.5;
      if (Math.abs(positionRef.current.x) > boundary) {
        velocityRef.current.x *= -1;
        positionRef.current.x = Math.max(-boundary, Math.min(boundary, positionRef.current.x));
      }
      if (Math.abs(positionRef.current.y) > boundary) {
        velocityRef.current.y *= -1;
        positionRef.current.y = Math.max(-boundary, Math.min(boundary, positionRef.current.y));
      }
    } else if (animation === 'jump') {
      jumpVelocityRef.current -= 0.008;
      positionRef.current.y += jumpVelocityRef.current;

      if (positionRef.current.y <= 0) {
        positionRef.current.y = 0;
        setIsJumping(false);
        setAnimation('float');
      }
    } else {
      positionRef.current.y = Math.sin(timeRef.current * 2) * 0.08;
    }

    group.current.position.set(positionRef.current.x, positionRef.current.y, positionRef.current.z);

    // Animaciones
    switch (animation) {
      case 'float':
        group.current.rotation.z = Math.sin(timeRef.current * 1) * 0.05;
        break;

      case 'jump':
        group.current.rotation.z = Math.sin(timeRef.current * 8) * 0.2;
        group.current.scale.y = 0.9 + Math.abs(Math.sin(timeRef.current * 8)) * 0.1;
        break;

      case 'spin':
        group.current.rotation.y += 0.1;
        break;

      case 'orbit':
        group.current.rotation.z += 0.08;
        group.current.rotation.x = Math.sin(timeRef.current * 2) * 0.3;
        break;

      case 'walk':
        group.current.rotation.z = Math.sin(timeRef.current * 8) * 0.15;
        break;

      case 'bow':
        group.current.rotation.x = Math.sin(timeRef.current * 3) * 0.3;
        group.current.scale.y = 0.8 + Math.abs(Math.sin(timeRef.current * 3)) * 0.2;
        break;

      case 'dance':
        group.current.rotation.z = Math.sin(timeRef.current * 6) * 0.3;
        group.current.position.x = positionRef.current.x + Math.sin(timeRef.current * 8) * 0.1;
        break;

      case 'eat':
        group.current.rotation.x = Math.sin(timeRef.current * 5) * 0.15;
        group.current.scale.y = 0.95 + Math.abs(Math.sin(timeRef.current * 5)) * 0.05;
        break;
    }
  });

  return (
    <group ref={group}>
      {model && <primitive object={model} scale={0.25} />}
    </group>
  );
}

export default function Cinnamoroll3D(props: Cinnamoroll3DProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 2.5], fov: 50 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ffb6c1" />

      <CinnamorollModel {...props} />
      <ParticleSystem particles={particles} />
    </Canvas>
  );
}
