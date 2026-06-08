import React from 'react';

interface FloatingElement {
  id: string;
  emoji: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
  animation: 'float-tulip' | 'float-star' | 'twinkle';
}

interface FloatingElementsProps {
  elements?: FloatingElement[];
  count?: number;
}

/**
 * Componente de elementos flotantes animados
 * Diseño: Tulipanes, estrellas y otros elementos románticos flotando suavemente
 * Animaciones: Movimiento vertical suave, parpadeo, rotación
 */
export default function FloatingElements({
  elements,
  count = 8,
}: FloatingElementsProps) {
  // Elementos por defecto si no se proporcionan
  const defaultElements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
    id: `element-${i}`,
    emoji: ['🌷', '✨', '🌙', '💕', '🌸'][i % 5],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: i * 0.2,
    duration: 3 + Math.random() * 2,
    animation: ['float-tulip', 'float-star', 'twinkle'][i % 3] as any,
  }));

  const elementsToRender = elements || defaultElements;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elementsToRender.map((element) => (
        <div
          key={element.id}
          className={`absolute text-3xl ${element.animation}`}
          style={{
            left: element.left,
            top: element.top,
            animation: `${element.animation} ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.delay}s`,
            opacity: 0.6,
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  );
}
