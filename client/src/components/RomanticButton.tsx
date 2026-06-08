import React from 'react';

interface RomanticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Botón romántico con estilo pastel y animaciones suaves
 * Diseño: Paleta de colores romántica (rosa pastel, celeste)
 * Animaciones: Hover con elevación suave, transiciones fluidas
 */
export default function RomanticButton({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'md',
}: RomanticButtonProps) {
  const baseClasses = 'romantic-button font-semibold transition-all duration-300 rounded-full';
  
  const variantClasses = {
    primary: 'bg-rosa-pastel text-blanco-cremoso hover:bg-celeste-romantic',
    secondary: 'bg-celeste-romantic text-blanco-cremoso hover:bg-rosa-pastel',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}
