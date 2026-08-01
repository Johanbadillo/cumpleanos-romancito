import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurpriseModal({ isOpen, onClose }: SurpriseModalProps) {
  const [hearts, setHearts] = useState(0);
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    if (!isOpen) {
      setHearts(0);
      setPetals([]);
      return;
    }

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

    return () => clearInterval(heartInterval);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full h-[600px] p-0 bg-gradient-to-b from-rosa-pastel/20 via-white to-celeste-romantic/20 border-0 overflow-hidden">
        {/* Fondo con ramo de flores */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="text-9xl">💐</div>
        </div>

        {/* Contenido principal */}
        <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
          {/* Corazones que se llenan */}
          <div className="flex gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-16 h-16">
                {/* Corazón vacío */}
                <div className="absolute inset-0 text-4xl opacity-30">💕</div>
                {/* Corazón lleno con animación */}
                {hearts >= i && (
                  <div
                    className="absolute inset-0 text-4xl animate-pulse"
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
              <h1 className="text-5xl font-bold text-rosa-pastel mb-4" style={{
                textShadow: '0 4px 20px rgba(255, 182, 193, 0.5)',
                letterSpacing: '0.1em',
              }}>
                GRACIAS LUDY
              </h1>
              <p className="text-2xl text-celeste-romantic font-allura" style={{
                textShadow: '0 2px 10px rgba(173, 216, 230, 0.5)',
              }}>
                Eres una gran mujer y persona
              </p>
            </div>
          )}

          {/* Pétalos cayendo */}
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute pointer-events-none"
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
              transform: translateY(600px);
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
      </DialogContent>
    </Dialog>
  );
}
