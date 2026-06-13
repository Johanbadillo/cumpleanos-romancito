/**
 * Componente PageLoadingScreen
 * Pantalla de carga con Cinnamoroll comiendo zanahoria
 * Se muestra mientras se cargan todos los elementos de la página
 * Mensajes románticos cambian aleatoriamente cada 1.5 segundos
 */

import { useEffect, useState } from 'react';

interface PageLoadingScreenProps {
  isLoading: boolean;
  minDuration?: number; // Duración mínima en ms (default: 5000ms = 5s)
}

const ROMANTIC_MESSAGES = [
  '💕 Preparando tu sorpresa especial...',
  '🌷 Cargando momentos mágicos...',
  '✨ Tu cumpleaños merece lo mejor...',
  '🌙 Reuniendo toda mi amor para ti...',
  '💫 Creando recuerdos inolvidables...',
  '🎀 Tu día especial está casi aquí...',
  '❤️ Cargando todo mi amor...',
  '🌸 Preparando la mejor sorpresa...',
  '💖 Cada segundo contigo es especial...',
  '⭐ Tu felicidad es mi prioridad...',
  '🎁 Sorpresas románticas en camino...',
  '💝 Cargando momentos de amor...',
  '🌺 Tú eres mi razón de sonreír...',
  '✨ Magia y amor en cada detalle...',
  '💕 Eternamente tuyo, siempre...',
];

export default function PageLoadingScreen({ isLoading, minDuration = 5000 }: PageLoadingScreenProps) {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentMessage, setCurrentMessage] = useState(ROMANTIC_MESSAGES[0]);

  // Cambiar mensaje cada 1.5 segundos
  useEffect(() => {
    if (!showLoading) return;

    const messageTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ROMANTIC_MESSAGES.length);
      setCurrentMessage(ROMANTIC_MESSAGES[randomIndex]);
    }, 1500);

    return () => clearInterval(messageTimer);
  }, [showLoading]);

  // Lógica de duración mínima y visibilidad
  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      setStartTime(Date.now());
      // Mostrar primer mensaje aleatorio
      const randomIndex = Math.floor(Math.random() * ROMANTIC_MESSAGES.length);
      setCurrentMessage(ROMANTIC_MESSAGES[randomIndex]);
    } else if (startTime) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minDuration) {
        // Espera a que se cumpla la duración mínima
        const remainingTime = minDuration - elapsedTime;
        const timer = setTimeout(() => {
          setShowLoading(false);
        }, remainingTime);
        return () => clearTimeout(timer);
      } else {
        // Ya pasó la duración mínima, oculta inmediatamente
        setShowLoading(false);
      }
    }
  }, [isLoading, startTime, minDuration]);

  if (!showLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-celeste-romantic/10 to-rosa-pastel/10 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        {/* Cinnamoroll comiendo zanahoria */}
        <div className="relative">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663692923675/guASUUg4cJC9WiZ2QEx5gQ/cinnamoroll-loading-3oLUisZhRmsx5RdaJxgfNH.webp"
            alt="Cinnamoroll cargando"
            className="w-48 h-48 object-contain animate-bounce"
            style={{
              animation: 'bounce 1.5s ease-in-out infinite',
            }}
          />
          
          {/* Partículas flotantes alrededor */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                {i % 2 === 0 ? '🌷' : '✨'}
              </div>
            ))}
          </div>
        </div>

        {/* Texto de carga con mensajes que cambian */}
        <div className="text-center">
          <p 
            className="text-lg font-semibold text-rosa-pastel mb-2 h-8 transition-all duration-500"
            style={{
              animation: 'fadeInOut 1.5s ease-in-out infinite',
            }}
          >
            {currentMessage}
          </p>
          
          {/* Animación de puntos */}
          <div className="flex items-center justify-center gap-1">
            <span className="text-celeste-romantic text-2xl" style={{
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0s',
            }}>
              •
            </span>
            <span className="text-celeste-romantic text-2xl" style={{
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.3s',
            }}>
              •
            </span>
            <span className="text-celeste-romantic text-2xl" style={{
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.6s',
            }}>
              •
            </span>
          </div>
        </div>

        {/* Barra de progreso suave */}
        <div className="w-64 h-1 bg-rosa-pastel/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rosa-pastel to-celeste-romantic rounded-full"
            style={{
              animation: 'slideProgress 2s ease-in-out infinite',
              width: '30%',
            }}
          ></div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes slideProgress {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 100%;
            transform: translateX(0);
          }
          100% {
            width: 0%;
            transform: translateX(100%);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
