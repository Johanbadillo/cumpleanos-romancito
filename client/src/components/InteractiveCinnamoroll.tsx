import { useEffect, useRef, useState } from 'react';
import Cinnamoroll3D from './Cinnamoroll3D';

interface InteractiveCinnamorollProps {
  isVisible?: boolean;
}

/**
 * Componente InteractiveCinnamoroll
 * Cinnamoroll flotante en la pantalla que reacciona a clics/toques
 * Funciona en desktop y móvil
 * Animaciones: salto, giro, flotación, danza, reverencia, comer
 */
export default function InteractiveCinnamoroll({ isVisible = true }: InteractiveCinnamorollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Animaciones disponibles
  const animations = ['jump', 'spin', 'dance', 'bow', 'eat', 'orbit'];

  const triggerRandomAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setClickCount((prev) => prev + 1);

    // Limpiar timeout anterior si existe
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Simular presión de tecla al contenedor
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    const keyMap: Record<string, string> = {
      jump: ' ',
      spin: 'c',
      dance: 'd',
      bow: 'r',
      eat: 'm',
      orbit: 'f',
    };

    const key = keyMap[randomAnimation];
    const event = new KeyboardEvent('keydown', {
      key: key,
      code: key === ' ' ? 'Space' : key.toUpperCase(),
      bubbles: true,
    });

    window.dispatchEvent(event);

    // Duración de la animación (en ms)
    const animationDuration = 2000;
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  // Manejar clics en la pantalla
  useEffect(() => {
    if (!isVisible) return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      // No disparar si es clic en un botón o elemento interactivo
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="dialog"]') ||
        target.closest('.dialog') ||
        target.closest('[role="button"]')
      ) {
        return;
      }

      triggerRandomAnimation();
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchend', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchend', handleClick);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isVisible, isAnimating]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 w-48 h-48 z-30 pointer-events-none"
      style={{
        animation: 'fadeIn 0.5s ease-out',
      }}
    >
      {/* Contenedor del Canvas 3D */}
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-rosa-pastel/20 to-celeste-romantic/20 border-2 border-rosa-pastel/30">
        <Cinnamoroll3D onKeyPress={() => {}} />
      </div>

      {/* Indicador de clics */}
      {clickCount > 0 && (
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-semibold text-rosa-pastel bg-white/90 px-3 py-1 rounded-full shadow-lg"
          style={{
            animation: 'fadeInOut 1s ease-in-out',
          }}
        >
          ¡{clickCount} interacciones! 💕
        </div>
      )}

      {/* Instrucciones en móvil */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-gray-600 text-center whitespace-nowrap opacity-60">
        Toca para animar
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
