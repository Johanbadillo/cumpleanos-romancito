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
        animation: `fadeInOut 8s ease-in-out forwards`,
      }}
    >
      {/* Fondo con gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-rosa-pastel/10 via-transparent to-celeste-romantic/10" />

      {/* Contenido principal */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Corazones que se llenan */}
        <div className="flex gap-8 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-20 h-20">
              {/* Corazón vacío */}
              <div className="absolute inset-0 text-5xl opacity-20">💕</div>
              {/* Corazón lleno con animación */}
              {hearts >= i && (
                <div
                  className="absolute inset-0 text-5xl"
                  style={{
                    animation: `fillHeart 0.8s ease-out forwards`,
                    animationDelay: `${(i - 1) * 0.8}s`,
                  }}
                >
                  💕
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Texto cinematográfico */}
        {hearts >= 3 && (
          <div
            className="text-center"
            style={{
              animation: `fadeInScale 1.5s ease-out forwards`,
              animationDelay: '2.4s',
            }}
          >
            <h1
              className="text-6xl font-bold text-rosa-pastel mb-4"
              style={{
                textShadow: '0 4px 20px rgba(255, 182, 193, 0.8), 0 0 40px rgba(255, 182, 193, 0.4)',
                letterSpacing: '0.1em',
              }}
            >
              GRACIAS LUDY
            </h1>
            <p
              className="text-3xl text-celeste-romantic font-allura"
              style={{
                textShadow: '0 2px 10px rgba(173, 216, 230, 0.8), 0 0 30px rgba(173, 216, 230, 0.4)',
              }}
            >
              Eres una gran mujer y persona
            </p>
          </div>
        )}

        {/* Pétalos cayendo */}
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.left}%`,
              top: '-30px',
              animation: `fallPetal 4s linear forwards`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            <div
              style={{
                animation: `rotatePetal 3s linear infinite`,
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

        @keyframes fillHeart {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
