import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface MusicPlayerProps {
  songs?: Song[];
  autoPlay?: boolean;
}

/**
 * Reproductor de música romántico
 * Diseño: Controles intuitivos, visualizador de progreso, paleta romántica
 * Funcionalidad: Play/Pause, siguiente/anterior, control de volumen
 */
export default function MusicPlayer({
  songs = [],
  autoPlay = false,
}: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // Autoplay puede estar bloqueado por el navegador
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return (
      <div className="romantic-card text-center">
        <p className="text-gray-500">No hay canciones disponibles</p>
      </div>
    );
  }

  return (
    <div className="romantic-card w-full max-w-md mx-auto">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextSong}
      />

      {/* Información de la canción */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-rosa-pastel mb-1">
          {currentSong.title}
        </h3>
        <p className="text-sm text-gray-500">{currentSong.artist}</p>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rosa-pastel"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={handlePrevSong}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Canción anterior"
        >
          <SkipBack size={20} className="text-celeste-romantic" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-rosa-pastel text-white rounded-full hover:bg-celeste-romantic transition-colors"
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={handleNextSong}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Siguiente canción"
        >
          <SkipForward size={20} className="text-celeste-romantic" />
        </button>
      </div>

      {/* Control de volumen */}
      <div className="flex items-center gap-3">
        <Volume2 size={18} className="text-celeste-romantic" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rosa-pastel"
          title="Volumen"
        />
      </div>
    </div>
  );
}
