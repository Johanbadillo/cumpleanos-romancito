/**
 * Componente InteractiveBook - Con Sonido y Fuente Elegante
 * Sonido realista de página girada + Fuente cursiva elegante
 * Última página con marco para foto y dedicatoria
 */

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface InteractiveBookProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl?: string;
  dedication?: string;
}

const BOOK_PAGES = [
  {
    id: 'cover',
    title: 'El Principito y la Rosa',
    subtitle: 'Una Historia de Amor Eterno',
    isCover: true,
    content: '',
  },
  {
    id: 'page1',
    title: 'Capítulo I: El Encuentro',
    content: `En un pequeño planeta lejano, bajo un cielo de estrellas infinitas, vivía un principito que buscaba el verdadero significado del amor. Un día, descubrió una rosa extraordinaria que brillaba con luz propia.

"¿Quién eres?", preguntó el principito con admiración.

"Soy la rosa que ha estado esperando por ti", respondió ella con dulzura. "He esperado mil años para que llegaras."

En ese momento, el principito supo que había encontrado lo que su corazón buscaba.`,
  },
  {
    id: 'page2',
    title: 'Capítulo II: El Cuidado',
    content: `Cada día, el principito cuidaba a su rosa con infinito amor. Le traía agua de las fuentes más puras, la protegía del viento frío y le susurraba historias de mundos lejanos.

La rosa, a su vez, lo amaba con toda la profundidad de su ser. Sus pétalos se abrían cada mañana solo para verlo, y su fragancia era la más dulce del universo.

"Tu amor me hace florecer cada día", decía la rosa. "Eres mi razón de existir."`,
  },
  {
    id: 'page3',
    title: 'Capítulo III: El Viaje',
    content: `Juntos, viajaron por galaxias desconocidas, visitando planetas mágicos y conociendo criaturas maravillosas. En cada lugar, su amor crecía más fuerte.

Bajo lunas plateadas y soles de fuego, bailaban entre las estrellas. El principito llevaba a la rosa en sus brazos, protegiéndola, amándola con cada latido de su corazón.

"Contigo, cualquier lugar es un paraíso", susurraba el principito.`,
  },
  {
    id: 'page4',
    title: 'Capítulo IV: La Promesa Eterna',
    content: `Llegó el momento en que el principito hizo una promesa bajo la lluvia de estrellas:

"Te amaré por toda la eternidad. Cuando el universo se desvanezca, cuando las estrellas se apaguen, mi amor por ti seguirá brillando. Eres mi razón de ser, mi inspiración, mi hogar."

La rosa respondió: "Y yo te amaré en cada vida, en cada universo, en cada momento. Tú eres mi principito, mi amor infinito."

Se besaron bajo el cielo estrellado, y en ese instante, el universo entero se iluminó con su amor.`,
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
  const [clickedCinnamorrolls, setClickedCinnamorrolls] = useState<Set<number>>(new Set());
  const [smokeParticles, setSmokeParticles] = useState<Array<{ id: number; x: number; y: number }>([]);
  const smokeIdRef = useRef(0);
  
  // Agregar página de foto dinámicamente si se proporciona
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
      audioRef.current.play().catch(() => {
        // Silenciar error si el navegador no permite reproducción automática
      });
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

  // Mostrar pétalos solo en la última página
  const isPhotoPage = currentPageIndex === bookPages.length - 1;



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">

      {/* Audio para sonido de página */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3"
        preload="auto"
      />

      {/* Mini Cinnamorrolls en los bordes */}
      {Array.from({ length: 4 }, (_, i) => {
        const positions = [
          { top: '10%', left: '-40px' },
          { top: '50%', right: '-40px', transform: 'translateY(-50%)' },
          { bottom: '10%', left: '-40px' },
          { bottom: '10%', right: '-40px' },
        ];
        const isClicked = clickedCinnamorrolls.has(i);
        
        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          
          // Crear partículas de humo
          const newParticles: Array<{ id: number; x: number; y: number }> = Array.from({ length: 8 }, () => ({
            id: smokeIdRef.current++,
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
          }));
          setSmokeParticles((prev: any) => [...prev, ...newParticles]);
          
          // Eliminar partículas después de la animación
          setTimeout(() => {
            setSmokeParticles((prev: any) => prev.filter((p: any) => !newParticles.some((np) => np.id === p.id)));
          }, 600);
          
          const newSet = new Set(clickedCinnamorrolls);
          newSet.add(i);
          setClickedCinnamorrolls(newSet);
          // Reproducir audio de feliz cumpleaños
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
          audio.play().catch(() => {});
        };
        
        return (
          <div
            key={`cinnamoroll-${i}`}
            onClick={handleClick}
            className="fixed text-5xl cursor-pointer transition-all duration-500 z-40"
            style={{
              ...positions[i],
              opacity: isClicked ? 0 : 1,
              transform: isClicked ? `${positions[i].transform || ''} scale(0)` : positions[i].transform || 'scale(1)',
              pointerEvents: isClicked ? 'none' : 'auto',
            }}
          >
            {!isClicked && '🐰'}
          </div>
        );
      })}

      {/* Partículas de humo */}
      {smokeParticles.map((particle: any) => (
        <div
          key={particle.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: '30px',
            height: '30px',
            background: 'radial-gradient(circle, rgba(200,200,200,0.8) 0%, rgba(200,200,200,0) 70%)',
            animation: 'smokeRise 0.6s ease-out forwards',
            zIndex: 35,
          }}
        />
      ))}

      {/* Modal del Libro */}
      <div className="relative w-full max-w-5xl h-[600px] rounded-2xl shadow-2xl overflow-hidden" style={{
        animation: 'bookOpen 0.8s ease-out',
      }}>
        {/* Botón Cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-rosa-pastel/30 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-white drop-shadow-lg" />
        </button>

        {/* Contenedor del Libro - Dos columnas */}
        <div className="flex h-full">
          {/* Página Izquierda */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-celeste-romantic/5 to-rosa-pastel/5 overflow-y-auto">
            {(currentPage as any).isCover ? (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663692923675/guASUUg4cJC9WiZ2QEx5gQ/stitch-angel-book-cover-Y7shvXVdK9WUeupBTChuGd.webp"
                  alt="Portada del Libro"
                  className="w-64 h-80 object-cover rounded-lg shadow-lg"
                  style={{
                    animation: 'fadeInScale 0.8s ease-out',
                  }}
                />
              </div>
            ) : (currentPage as any).isPhotoPage ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                {/* Marco elegante para la foto */}
                <div className="relative" style={{
                  animation: 'floatingFrame 3s ease-in-out infinite',
                }}>
                  {/* Efecto de brillo mágico */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-2xl" style={{
                    animation: 'magicGlow 3s ease-in-out infinite',
                    filter: 'blur(8px)',
                  }} />
                  
                  {/* Marco decorativo exterior */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rosa-pastel to-celeste-romantic rounded-2xl p-6 shadow-lg" style={{ 
                    transform: 'rotate(0deg)',
                    boxShadow: '0 0 30px rgba(255, 182, 193, 0.5), 0 0 60px rgba(173, 216, 230, 0.3)',
                  }}>
                    {/* Marco interior blanco */}
                    <div className="bg-white rounded-xl p-4 h-full flex items-center justify-center">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Foto especial"
                          className="w-full h-64 object-cover rounded-lg shadow-md"
                          style={{
                            animation: 'fadeInScale 0.8s ease-out',
                          }}
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <p className="text-sm">Sube tu foto especial</p>
                          <p className="text-xs mt-2">desde /content</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Placeholder para la foto */}
                  <div className="w-80 h-72 rounded-2xl" />
                </div>

                {/* Dedicatoria final */}
                <div className="text-center mt-4 px-4">
                  <p
                    className="text-lg text-rosa-pastel leading-relaxed"
                    style={{ fontFamily: 'Allura, cursive', fontSize: '1.3rem', letterSpacing: '0.5px' }}
                  >
                    {dedication || 'Para la mujer que hace mi vida completa. Te amo hoy, mañana y siempre. 💕'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <h2 className="text-3xl font-bold text-rosa-pastel mb-6 text-center" style={{ fontFamily: 'Tangerine, cursive', fontWeight: 700 }}>
                  {(currentPage as any).title}
                </h2>
                <p
                  className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap text-base md:text-lg"
                  style={{ fontFamily: 'Allura, cursive', letterSpacing: '0.5px', lineHeight: '1.8' }}
                >
                  {(currentPage as any).content}
                </p>
              </div>
            )}
          </div>

          {/* Página Derecha - Decorativa */}
          <div className="flex-1 hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-bl from-rosa-pastel/5 to-celeste-romantic/5">
            {currentPageIndex === 0 ? (
              <div className="text-center space-y-6">
                <div className="text-7xl animate-bounce">💕</div>
                <p className="text-lg font-semibold text-celeste-romantic" style={{ fontFamily: 'Tangerine, cursive', fontSize: '2rem' }}>
                  Una historia de amor eterno
                </p>
              </div>
            ) : (currentPage as any).isPhotoPage ? (
              <div className="text-center space-y-4">
                <div className="text-6xl">💑</div>
                <p className="text-gray-700 italic text-sm md:text-base" style={{ fontFamily: 'Allura, cursive', fontSize: '1.1rem' }}>
                  "Nuestro amor es la más hermosa historia jamás contada"
                </p>
                <div className="text-5xl mt-6">✨</div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-6xl">✨</div>
                <p className="text-gray-700 italic text-sm md:text-base" style={{ fontFamily: 'Allura, cursive', fontSize: '1.1rem' }}>
                  "El verdadero amor es lo más valioso que existe"
                </p>
                <div className="text-5xl mt-6">🌹</div>
              </div>
            )}
          </div>
        </div>

        {/* Controles de Navegación */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
          {/* Botón Anterior */}
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="p-2 rounded-full bg-rosa-pastel/80 hover:bg-rosa-pastel disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Indicador de Página */}
          <div className="text-center min-w-[100px] bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-sm font-semibold text-white drop-shadow-lg">
              {currentPageIndex + 1} / {bookPages.length}
            </p>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === bookPages.length - 1}
            className="p-2 rounded-full bg-celeste-romantic/80 hover:bg-celeste-romantic disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Estilos de Animación */}
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
          
          @keyframes magicGlow {
            0%, 100% {
              opacity: 0;
              transform: translateX(-100%);
            }
            50% {
              opacity: 0.6;
              transform: translateX(100%);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
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
          
          @keyframes smokeRise {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-80px) scale(1.5);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
