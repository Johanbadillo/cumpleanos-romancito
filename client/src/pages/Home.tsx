import { useState } from 'react';
import RomanticButton from '@/components/RomanticButton';
import RomanticCard from '@/components/RomanticCard';
import FloatingElements from '@/components/FloatingElements';
import Countdown from '@/components/Countdown';
import Footer from '@/components/Footer';
import { Heart } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';

/**
 * Página Principal - Cumpleaños Romántico
 * Diseño: Estilo "Animación Romancito" con paleta romántica
 * Elementos: Portada con imagen, navegación, música, animaciones
 */
export default function Home() {
  const { user } = useAuth();
  const [showGallery, setShowGallery] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  // Cargar datos de la base de datos
  const { data: dbPhotos = [] } = trpc.photos.list.useQuery();
  const { data: dbMessages = [] } = trpc.messages.list.useQuery();
  const { data: dbSongs = [] } = trpc.songs.list.useQuery();

  // Configura la fecha del cumpleaños aqui
  // Formato: new Date('YYYY-MM-DD')
  // Cumpleaños: 24 de agosto (Colombia - Zona Horaria: UTC-5)
  const birthdayDate = new Date('2026-08-24T00:00:00-05:00'); // 24 de agosto 2026, zona horaria Colombia

  // Extraer ID de Spotify de una URL
  const getSpotifyTrackId = (url: string): string | null => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  // Extraer ID de YouTube de una URL
  const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

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
            <Heart className="text-red-400" size={32} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <Heart className="text-red-400" size={32} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s' }} />
            <Heart className="text-red-400" size={32} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.4s' }} />
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
              {showGallery ? 'Cerrar Galeria' : 'Ver Galeria'} ({dbPhotos.length})
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
              {showMessages ? 'Cerrar Mensajes' : 'Leer Mensajes'} ({dbMessages.length})
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
                {showMusic ? 'Ocultar Musica' : 'Reproducir Musica'} ({dbSongs.length})
              </RomanticButton>
            </div>
          </RomanticCard>
        </div>

        {/* Galería de Fotos */}
        {showGallery && (
          <div className="mb-16 slide-in-left">
            <RomanticCard title="Galeria de Fotos" animated>
              {dbPhotos.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No hay fotos aún. ¡Agrega las primeras desde <a href="/content" className="text-rosa-pastel font-semibold">/content</a>!</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {dbPhotos.map((photo: any) => (
                    <div
                      key={photo.id}
                      className="relative rounded-2xl h-48 overflow-hidden hover:shadow-romantic-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end">
                        <p className="text-white text-sm font-semibold p-3 bg-gradient-to-t from-black/60 w-full">
                          {photo.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </RomanticCard>
          </div>
        )}

        {/* Mensajes desde la base de datos */}
        {showMessages && (
          <div className="mb-16 slide-in-right">
            <RomanticCard title="Mensajes Especiales" animated>
              {dbMessages.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No hay mensajes aún. ¡Agrega los primeros desde <a href="/content" className="text-rosa-pastel font-semibold">/content</a>!</p>
              ) : (
                <div className="space-y-6">
                  {dbMessages.map((msg: any, idx: number) => (
                    <div
                      key={msg.id}
                      className={`border-l-4 ${idx % 2 === 0 ? 'border-rosa-pastel' : 'border-celeste-romantic'} pl-6 py-3 hover:bg-gray-50 rounded transition-colors`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{msg.emoji || '💕'}</span>
                        <p className={`font-semibold ${idx % 2 === 0 ? 'text-rosa-pastel' : 'text-celeste-romantic'} text-lg`}>
                          {msg.title}
                        </p>
                      </div>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </RomanticCard>
          </div>
        )}

        {/* Música desde la base de datos */}
        {showMusic && (
          <div className="mb-16 slide-in-up">
            <RomanticCard title="Playlist Romantica" animated>
              {dbSongs.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No hay canciones aún. ¡Agrega las primeras desde <a href="/content" className="text-rosa-pastel font-semibold">/content</a>!</p>
              ) : (
                <div className="space-y-6">
                  {dbSongs.map((song: any, idx: number) => {
                    const spotifyId = getSpotifyTrackId(song.musicUrl);
                    const youtubeId = getYouTubeVideoId(song.musicUrl);

                    return (
                      <div key={song.id} className="border border-rosa-pastel/20 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-start gap-4 mb-4">
                          {song.coverImageUrl && (
                            <img
                              src={song.coverImageUrl}
                              alt={song.title}
                              className="w-16 h-16 rounded object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-lg text-rosa-pastel">{idx + 1}. {song.title}</p>
                            <p className="text-sm text-gray-600">{song.artist}</p>
                          </div>
                        </div>

                        {/* Spotify Embed */}
                        {spotifyId && (
                          <div className="mb-4">
                            <iframe
                              src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
                              width="100%"
                              height="80"
                              frameBorder="0"
                              allowFullScreen
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                              loading="lazy"
                              className="rounded"
                            ></iframe>
                          </div>
                        )}

                        {/* YouTube Embed */}
                        {youtubeId && !spotifyId && (
                          <div className="mb-4 aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${youtubeId}`}
                              title={song.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="rounded"
                            ></iframe>
                          </div>
                        )}

                        {/* Link directo si no es Spotify ni YouTube */}
                        {!spotifyId && !youtubeId && (
                          <a
                            href={song.musicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-rosa-pastel text-white px-4 py-2 rounded-lg hover:bg-rosa-pastel/90 transition-colors text-sm"
                          >
                            Escuchar en {song.musicUrl.includes('spotify') ? 'Spotify' : 'otra plataforma'}
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </RomanticCard>
          </div>
        )}

      </div>

      {/* Pie de página elegante */}
      <Footer 
        birthdayDate={birthdayDate}
        romanticMessage="Cada día contigo es un regalo que atesoro. Te amo más cada mañana y cada noche. Feliz cumpleaños a la mujer que hace mi vida completa. 💕"
      />
    </div>
  );
}
