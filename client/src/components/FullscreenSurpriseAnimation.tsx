import { useState, useEffect } from 'react';

interface FullscreenSurpriseAnimationProps {
  trigger: boolean;
  onComplete: () => void;
}

export default function FullscreenSurpriseAnimation({ trigger, onComplete }: FullscreenSurpriseAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    if (!trigger) return;

    setIsVisible(true);
    setHearts(0);
    setPetals([]);

    // Animar los corazones llenándose
    let heartInterval: NodeJS.Timeout;
    let currentHearts = 0;

    heartInterval = setInterval(() => {
      currentHearts += 1;
      setHearts(currentHearts);
      if (currentHearts >= 3) {
        clearInterval(heartInterval);
        // Generar pétalos después de llenar los corazones
        setTimeout(() => {
          const newPetals = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
          }));
          setPetals(newPetals);
        }, 500);
      }
    }, 800);

    // Desaparecer después de 8 segundos
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 8000);

    return () => {
      clearInterval(heartInterval);
      clearTimeout(hideTimeout);
    };
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        animationName: 'fadeInOut',
        animationDuration: '8s',
        animationTimingFunction: 'ease-in-out',
        animationFillMode: 'forwards',
      }}
    >
      {/* Fondo con gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-rosa-pastel/10 via-transparent to-celeste-romantic/10" />

      {/* Contenido principal */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
  

        {/* Texto cinematográfico */}
        <div
          className="text-center"
          style={{
            animationName: 'fadeInScale',
            animationDuration: '1.5s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            animationDelay: '0.5s',
          }}
        >
          <h1
            className="text-7xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 25%, #FFB6C1 50%, #FF1493 75%, #FF69B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
              letterSpacing: '0.15em',
              filter: 'drop-shadow(0 0 20px rgba(255, 20, 147, 0.6))',
            }}
          >
            GRACIAS LUDY
          </h1>
          <p
            className="text-4xl font-allura"
            style={{
              background: 'linear-gradient(135deg, #00CED1 0%, #00BFFF 50%, #87CEEB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 25px rgba(0, 206, 209, 0.8)',
              filter: 'drop-shadow(0 0 15px rgba(0, 206, 209, 0.6))',
            }}
          >
            Eres una gran mujer y persona
          </p>
        </div>

        {/* Pétalos cayendo */}
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.left}%`,
              top: '-30px',
              animationName: 'fallPetal',
              animationDuration: '4s',
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationDelay: `${petal.delay}s`,
            }}
          >
            <div
              style={{
                animationName: 'rotatePetal',
                animationDuration: '3s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                fontSize: '1.5rem',
              }}
            >
              {['🌹', '🌸', '🌺', '🌻', '💐'][Math.floor(Math.random() * 5)]}
            </div>
          </div>
        ))}
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fallPetal {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes rotatePetal {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }
      `}</style>
    </div>
  );
}
