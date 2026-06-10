import { Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  birthdayDate: Date;
  romanticMessage?: string;
}

/**
 * Componente Footer - Pie de página romántico
 * Diseño: Estilo "Animación Romancito" con paleta romántica
 * Incluye: Mensaje romántico final y fecha del cumpleaños
 */
export default function Footer({ birthdayDate, romanticMessage }: FooterProps) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Bogota',
    };
    return date.toLocaleDateString('es-CO', options);
  };

  const defaultMessage = 'Cada día contigo es un regalo que atesoro. Te amo más cada mañana. 💕';

  return (
    <footer className="relative mt-20 bg-gradient-to-t from-rosa-pastel/20 via-celeste-romantic/10 to-transparent pt-16 pb-8 overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-32 h-32 bg-rosa-pastel/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-10 w-40 h-40 bg-celeste-romantic/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-rosa-pastel/5 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Divisor decorativo */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-rosa-pastel to-transparent flex-1"></div>
          <Heart className="text-rosa-pastel" size={20} />
          <div className="h-px bg-gradient-to-r from-transparent via-rosa-pastel to-transparent flex-1"></div>
        </div>

        {/* Mensaje romántico */}
        <div className="text-center mb-12 fade-in-up">
          <div className="flex justify-center mb-4">
            <Sparkles className="text-celeste-romantic" size={24} />
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light italic">
            {romanticMessage || defaultMessage}
          </p>
        </div>

        {/* Fecha del cumpleaños */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 uppercase tracking-widest mb-2">Tu cumpleaños</p>
          <p className="text-2xl md:text-3xl font-bold text-rosa-pastel capitalize">
            {formatDate(birthdayDate)}
          </p>
        </div>

        {/* Decoración con emojis */}
        <div className="flex justify-center gap-6 mb-12">
          <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🌷</span>
          <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite 0.3s' }}>💕</span>
          <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite 0.6s' }}>✨</span>
        </div>

        {/* Crédito y cierre */}
        <div className="text-center border-t border-rosa-pastel/20 pt-8">
          <p className="text-sm text-gray-600">
            Hecho con <Heart className="inline text-rosa-pastel" size={14} /> para el cumpleaños más especial
          </p>
          <p className="text-xs text-gray-500 mt-2">
            © {new Date().getFullYear()} • Cumpleaños Romántico
          </p>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </footer>
  );
}
