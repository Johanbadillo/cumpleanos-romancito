import React, { useState } from 'react';
import RomanticButton from '@/components/RomanticButton';
import RomanticCard from '@/components/RomanticCard';
import FloatingElements from '@/components/FloatingElements';
import MusicPlayer from '@/components/MusicPlayer';
import Countdown from '@/components/Countdown';
import { Heart } from 'lucide-react';

/**
 * Página Principal - Cumpleaños Romántico
 * Diseño: Estilo "Animación Romancito" con paleta romántica
 * Elementos: Portada con imagen, navegación, música, animaciones
 */
export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  // Configura la fecha del cumpleaños aqui
  // Formato: new Date('YYYY-MM-DD')
  // Cumpleaños: 24 de agosto (Colombia - Zona Horaria: UTC-5)
  const birthdayDate = new Date('2025-08-24T00:00:00-05:00'); // 24 de agosto, zona horaria Colombia

  // Canciones de ejemplo (sin URLs reales)
  const songs = [
    {
      id: '1',
      title: 'Cancion de Amor',
      artist: 'Artista Romantico',
      url: 'https://example.com/song1.mp3',
    },
    {
      id: '2',
      title: 'Momentos Especiales',
      artist: 'Artista Romantico',
      url: 'https://example.com/song2.mp3',
    },
  ];

  return (
    <div className="min-h-screen bg-blanco-cremoso">
      {/* Elementos flotantes animados */}
      <FloatingElements count={6} />

      {/* Sección Hero con imagen de portada */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663692923675/guASUUg4cJC9WiZ2QEx5gQ/birthday-hero-WYK6oZ44cR3HBTEFc3K3x6.webp"
          alt="Portada Romantica"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay oscuro suave */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg fade-in-up">
            Feliz Cumpleanos
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md fade-in-up">
            Para la mujer mas especial de mi vida
          </p>
          <div className="flex justify-center gap-3 mb-8">
            <Heart className="text-red-400 animate-pulse" size={32} />
            <Heart className="text-red-400 animate-pulse" size={32} />
            <Heart className="text-red-400 animate-pulse" size={32} />
          </div>
          <RomanticButton
            size="lg"
            variant="primary"
            className="drop-shadow-lg"
          >
            Explorar la Sorpresa
          </RomanticButton>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Sección del Contador Regresivo */}
        <div className="mb-16">
          <Countdown targetDate={birthdayDate} title="Falta para tu cumpleanos" />
        </div>

        {/* Sección de Navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <RomanticCard
            title="Galeria de Fotos"
            subtitle="Nuestros momentos especiales"
            animated
          >
            <p className="mb-6 text-gray-600">
              Revive los momentos mas hermosos que hemos compartido juntos.
            </p>
            <RomanticButton
              onClick={() => setShowGallery(!showGallery)}
              variant="primary"
              size="md"
            >
              {showGallery ? 'Cerrar Galeria' : 'Ver Galeria'}
            </RomanticButton>
          </RomanticCard>

          <RomanticCard
            title="Mensajes de Amor"
            subtitle="Palabras del corazon"
            animated
          >
            <p className="mb-6 text-gray-600">
              Mensajes especiales y deseos para tu dia mas especial.
            </p>
            <RomanticButton
              onClick={() => setShowMessages(!showMessages)}
              variant="primary"
              size="md"
            >
              {showMessages ? 'Cerrar Mensajes' : 'Leer Mensajes'}
            </RomanticButton>
          </RomanticCard>
        </div>

        {/* Sección de Música */}
        <div className="mb-16">
          <RomanticCard
            title="Musica Romantica"
            subtitle="Soundtrack de nuestro amor"
            animated
          >
            <p className="mb-8 text-gray-600">
              Una seleccion especial de canciones para acompanar tu dia.
            </p>
            <div className="flex justify-center mb-8">
              <RomanticButton
                onClick={() => setShowMusic(!showMusic)}
                variant="secondary"
                size="md"
              >
                {showMusic ? 'Ocultar Reproductor' : 'Reproducir Musica'}
              </RomanticButton>
            </div>
            {showMusic && <MusicPlayer songs={songs} autoPlay={false} />}
          </RomanticCard>
        </div>

        {/* Galería (placeholder) */}
        {showGallery && (
          <div className="mb-16 slide-in-left">
            <RomanticCard title="Galeria de Fotos" animated>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-rosa-pastel to-celeste-romantic rounded-2xl h-48 flex items-center justify-center text-white text-3xl hover:shadow-romantic-lg transition-all duration-300 hover:scale-105"
                  >
                    Foto {i}
                  </div>
                ))}
              </div>
            </RomanticCard>
          </div>
        )}

        {/* Mensajes (placeholder) */}
        {showMessages && (
          <div className="mb-16 slide-in-right">
            <RomanticCard title="Mensajes Especiales" animated>
              <div className="space-y-6">
                <div className="border-l-4 border-rosa-pastel pl-6 py-3 hover:bg-gray-50 rounded transition-colors">
                  <p className="font-semibold text-rosa-pastel mb-2 text-lg">
                    Mensaje 1
                  </p>
                  <p className="text-gray-600">
                    Cada dia contigo es un regalo especial que atesoro en mi corazon...
                  </p>
                </div>
                <div className="border-l-4 border-celeste-romantic pl-6 py-3 hover:bg-gray-50 rounded transition-colors">
                  <p className="font-semibold text-celeste-romantic mb-2 text-lg">
                    Mensaje 2
                  </p>
                  <p className="text-gray-600">
                    Tu sonrisa ilumina mis dias mas oscuros y llena mi vida de alegria...
                  </p>
                </div>
                <div className="border-l-4 border-rosa-pastel pl-6 py-3 hover:bg-gray-50 rounded transition-colors">
                  <p className="font-semibold text-rosa-pastel mb-2 text-lg">
                    Mensaje 3
                  </p>
                  <p className="text-gray-600">
                    Te amo mas cada dia que pasa, eres mi mayor bendicion...
                  </p>
                </div>
              </div>
            </RomanticCard>
          </div>
        )}

        {/* Pie de página */}
        <div className="text-center py-12 fade-in-up border-t border-gray-200 mt-12">
          <p className="text-gray-600 mb-3 text-lg">
            Hecho con amor para ti en tu dia especial
          </p>
          <p className="text-sm text-gray-400">
            Cumpleanos Romantico 2026
          </p>
        </div>
      </div>
    </div>
  );
}
