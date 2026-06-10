import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
  title?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

/**
 * Componente Countdown - Contador regresivo animado
 * Diseño: Estilo romántico con paleta pastel
 * Animaciones: Pulseo suave, cambios de color dinámicos
 * Zona Horaria: Colombia (UTC-5)
 */
export default function Countdown({ targetDate, title = 'Falta para el cumpleaños' }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Obtener la hora actual en zona horaria de Colombia (UTC-5)
      const now = new Date();
      const colombiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
      const nowTime = colombiaTime.getTime();
      const target = targetDate.getTime();
      const difference = target - nowTime;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOver: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isOver: false,
      });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative mb-3">
        {/* Círculo de fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-rosa-pastel to-celeste-romantic rounded-full blur-md opacity-30 animate-pulse"></div>
        
        {/* Caja del número */}
        <div className="relative bg-white rounded-2xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-romantic-lg border-2 border-rosa-pastel">
          <span className="text-3xl md:text-4xl font-bold text-rosa-pastel">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <p className="text-sm md:text-base font-semibold text-celeste-romantic uppercase tracking-wider">
        {label}
      </p>
    </div>
  );

  if (timeRemaining.isOver) {
    return (
      <div className="romantic-card text-center py-12 fade-in-up">
        <h3 className="text-3xl md:text-4xl font-bold text-rosa-pastel mb-4">
          ¡Feliz Cumpleanos!
        </h3>
        <p className="text-lg text-gray-600">
          Hoy es tu dia especial. Que sea maravilloso!
        </p>
        <div className="mt-6 text-4xl animate-bounce">
          🎉 💕 🎂
        </div>
      </div>
    );
  }

  return (
    <div className="romantic-card text-center py-8 md:py-12 fade-in-up">
      <h3 className="text-2xl md:text-3xl font-bold text-rosa-pastel mb-2">
        {title}
      </h3>
      <p className="text-gray-500 mb-8 md:mb-12">
        Cada segundo nos acerca a tu dia especial
      </p>

      {/* Grid de contadores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
        <TimeUnit value={timeRemaining.days} label="Dias" />
        <TimeUnit value={timeRemaining.hours} label="Horas" />
        <TimeUnit value={timeRemaining.minutes} label="Minutos" />
        <TimeUnit value={timeRemaining.seconds} label="Segundos" />
      </div>

      {/* Decoración inferior */}
      <div className="mt-8 md:mt-12 flex justify-center gap-4">
        <span className="text-2xl" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>🌷</span>
        <span className="text-2xl" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s' }}>
          ✨
        </span>
        <span className="text-2xl" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.4s' }}>
          🌙
        </span>
      </div>
    </div>
  );
}
