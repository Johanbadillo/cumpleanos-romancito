import React from 'react';

interface RomanticCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  animated?: boolean;
}

/**
 * Tarjeta romántica con sombra suave y animaciones
 * Diseño: Fondo blanco cremoso, sombra celeste, bordes redondeados
 * Animaciones: Hover con elevación suave, fade-in en carga
 */
export default function RomanticCard({
  children,
  className = '',
  title,
  subtitle,
  animated = true,
}: RomanticCardProps) {
  const animationClass = animated ? 'fade-in-up' : '';

  return (
    <div className={`romantic-card ${animationClass} ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-rosa-pastel mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
