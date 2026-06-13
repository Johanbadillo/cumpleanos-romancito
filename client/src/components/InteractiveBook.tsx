/**
 * Componente InteractiveBook
 * Libro interactivo con portada y páginas que se pueden pasar
 * Historia romántica inspirada en "El Principito y la Rosa"
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface InteractiveBookProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function InteractiveBook({ isOpen, onClose }: InteractiveBookProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = BOOK_PAGES[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < BOOK_PAGES.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleClose = () => {
    setCurrentPageIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Modal del Libro */}
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Botón Cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-rosa-pastel/20 rounded-full transition-all duration-300"
        >
          <X className="w-6 h-6 text-rosa-pastel" />
        </button>

        {/* Contenedor del Libro */}
        <div className="flex h-full">
          {/* Página Izquierda */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blanco-cremoso to-rosa-pastel/10 overflow-y-auto">
            {currentPage.isCover ? (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663692923675/guASUUg4cJC9WiZ2QEx5gQ/romantic-book-cover-LvMeXK2UMYt2GATzNhYBZF.webp"
                  alt="Portada del Libro"
                  className="w-64 h-80 object-cover rounded-lg shadow-lg"
                  style={{
                    animation: 'fadeInScale 0.8s ease-out',
                  }}
                />
              </div>
            ) : (
              <div className="w-full">
                <h2 className="text-2xl font-bold text-rosa-pastel mb-6 text-center">{currentPage.title}</h2>
                <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                  {currentPage.content}
                </p>
              </div>
            )}
          </div>

          {/* Página Derecha - Decorativa */}
          <div className="flex-1 hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-bl from-celeste-romantic/10 to-blanco-cremoso">
            {currentPageIndex === 0 ? (
              <div className="text-center">
                <p className="text-lg font-semibold text-celeste-romantic mb-4">
                  ✨ Haz clic en las flechas para explorar esta historia de amor ✨
                </p>
                <div className="text-6xl mb-4">📖</div>
                <p className="text-sm text-gray-600">
                  Una historia romántica inspirada en El Principito
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-5xl">💕</div>
                <p className="text-gray-700 italic">
                  "El verdadero amor es lo más valioso que existe"
                </p>
                <div className="text-4xl mt-6">🌹</div>
              </div>
            )}
          </div>
        </div>

        {/* Controles de Navegación */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10">
          {/* Botón Anterior */}
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="p-2 rounded-full bg-rosa-pastel/80 hover:bg-rosa-pastel disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Indicador de Página */}
          <div className="text-center min-w-[100px]">
            <p className="text-sm font-semibold text-gray-700">
              {currentPageIndex + 1} / {BOOK_PAGES.length}
            </p>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === BOOK_PAGES.length - 1}
            className="p-2 rounded-full bg-celeste-romantic/80 hover:bg-celeste-romantic disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
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

          @keyframes pageFlip {
            0% {
              opacity: 0;
              transform: rotateY(90deg);
            }
            100% {
              opacity: 1;
              transform: rotateY(0deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
