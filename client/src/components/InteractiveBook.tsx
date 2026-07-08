import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Cinnamoroll3D from './Cinnamoroll3D';

interface InteractiveBookProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl?: string;
  dedication?: string;
}

const BOOK_PAGES = [
  {
    id: 'page1',
    title: 'El Principito y la Rosa',
    subtitle: 'Una Historia de Amor Eterno',
    content: `Érase una vez un pequeño príncipe que viajaba por el universo en busca de respuestas. En su planeta encontró una rosa única, diferente a todas las demás.

La rosa era hermosa, pero también frágil. El principito la cuidaba cada día, protegiéndola del viento y dándole agua con su corazón.

"Eres mi rosa especial", le decía cada mañana, y ella sonreía en silencio.`,
  },
  {
    id: 'page2',
    title: 'El Viaje',
    content: `El principito decidió viajar por otros planetas para entender mejor el universo. Pero cada noche, miraba hacia su planeta y pensaba en su rosa.

"¿Estará bien sin mí?", se preguntaba.

Conoció a muchas personas, visitó lugares maravillosos, pero nada comparaba con el brillo de los ojos de su rosa cuando lo veía regresar.`,
  },
  {
    id: 'page3',
    title: 'El Descubrimiento',
    content: `Un día, el principito comprendió algo importante: no es la belleza de la rosa lo que la hace especial, sino el amor que le dedica.

"Lo que hace importante a mi rosa es el tiempo que pasé cuidándola", pensó.

Esa verdad cambió su forma de ver el mundo. Cada momento con ella era un tesoro infinito.`,
  },
  {
    id: 'page4',
    title: 'El Regreso',
    content: `El principito regresó a su planeta con el corazón lleno de alegría. La rosa lo esperaba, más hermosa que nunca.

Se abrazaron bajo las estrellas, y en ese momento, ambos comprendieron que el amor verdadero trasciende el tiempo y el espacio.

"Te amo", susurró el principito.
"Y yo te amo a ti", respondió la rosa con toda su esencia.`,
  },
  {
    id: 'page5',
    title: 'Epílogo: Para Siempre',
    content: `Así es como termina esta historia, pero no es un final, sino un comienzo.

Porque el verdadero amor no termina, solo se transforma. Se convierte en cada amanecer compartido, en cada mirada cómplice, en cada momento que pasan juntos.

El principito y su rosa siguen viajando por el universo, recordando a todos que el amor verdadero es lo más valioso que existe.

Y si miras al cielo en las noches claras, podrás ver su luz brillando entre las estrellas, recordándote que el amor eterno es posible.`,
  },
];

export default function InteractiveBook({ isOpen, onClose, photoUrl, dedication }: InteractiveBookProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const bookPages = photoUrl ? [
    ...BOOK_PAGES,
    {
      id: 'page6',
      title: 'Nuestra Historia',
      subtitle: 'Dedicatoria Final',
      isPhotoPage: true,
      content: '',
    },
  ] : BOOK_PAGES;

  const currentPage = bookPages[currentPageIndex];

  const playPageTurnSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < bookPages.length - 1) {
      playPageTurnSound();
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      playPageTurnSound();
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleClose = () => {
    setCurrentPageIndex(0);
    onClose();
  };

  const handleKeyPress = (key: string) => {
    // Manejo de teclas para Cinnamoroll
    // Las animaciones se manejan dentro del componente Cinnamoroll3D
  };

  if (!isOpen) return null;

  const floatingHearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {floatingHearts.map((heart) => (
        <div
          key={`heart-${heart.id}`}
          className="fixed text-2xl pointer-events-none"
          style={{
            left: `${heart.left}%`,
            top: '-30px',
            animation: `floatUp ${heart.duration}s ease-in forwards`,
            animationDelay: `${heart.delay}s`,
            opacity: 0.6,
          }}
        >
          💕
        </div>
      ))}

      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3"
        preload="auto"
      />

      <div className="relative w-full max-w-5xl h-[600px] rounded-2xl shadow-2xl overflow-hidden" style={{
        animation: 'bookOpen 0.8s ease-out',
      }}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-rosa-pastel/30 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-white drop-shadow-lg" />
        </button>

        <div className="flex h-full">
          {/* Página Izquierda - Blanca */}
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center border-r-2 border-rosa-pastel/30 overflow-y-auto relative">
            {(currentPage as any)?.isPhotoPage ? (
              <div className="flex flex-col items-center justify-center h-full">
                {photoUrl && (
                  <div className="relative mb-6" style={{
                    animation: 'floatingFrame 3s ease-in-out infinite',
                  }}>
                    <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-rosa-pastel"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(173,216,230,0.3) 100%)',
                        boxShadow: '0 0 40px rgba(255,182,193,0.4)',
                      }}
                    >
                      <img src={photoUrl} alt="Nuestra foto" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
                <p className="text-center text-rosa-pastel text-lg font-allura mt-6 max-w-md">
                  {dedication || 'Para la mujer que hace mi vida completa. Eres mi luz, mi inspiración y mi razón de sonreír cada día. Te amo infinitamente. 💕✨'}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-tangerine text-rosa-pastel mb-2">{currentPage?.title}</h2>
                {currentPage?.subtitle && (
                  <p className="text-lg font-allura text-celeste-romantic mb-6">{currentPage.subtitle}</p>
                )}
                <p className="text-sm leading-relaxed font-allura text-gray-700 whitespace-pre-wrap">
                  {currentPage?.content}
                </p>
              </>
            )}
          </div>

          {/* Página Derecha - Blanca con Cinnamoroll */}
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center border-l-2 border-celeste-romantic/30 overflow-y-auto relative">
            <Cinnamoroll3D onKeyPress={handleKeyPress} />
          </div>
        </div>

        {/* Controles de Navegación */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="p-2 rounded-full bg-rosa-pastel/80 hover:bg-rosa-pastel disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === bookPages.length - 1}
            className="p-2 rounded-full bg-celeste-romantic/80 hover:bg-celeste-romantic disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <style>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes floatingFrame {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          
          @keyframes glowEffect {
            0%, 100% {
              box-shadow: 0 0 20px rgba(255, 182, 193, 0.4);
            }
            50% {
              box-shadow: 0 0 40px rgba(255, 182, 193, 0.8);
            }
          }
          
          @keyframes bookOpen {
            0% {
              transform: scaleX(0) rotateY(90deg);
              opacity: 0;
            }
            50% {
              transform: scaleX(0.5) rotateY(45deg);
            }
            100% {
              transform: scaleX(1) rotateY(0deg);
              opacity: 1;
            }
          }
          
          @keyframes floatUp {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-200px) rotate(10deg);
              opacity: 0.8;
            }
            100% {
              transform: translateY(-400px) rotate(20deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
