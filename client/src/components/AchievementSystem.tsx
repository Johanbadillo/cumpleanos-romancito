import { useState, useEffect, useCallback } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementNotification {
  id: string;
  achievement: Achievement;
  createdAt: Date;
}

interface AchievementSystemProps {
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'all_functions',
    title: 'Maestro de Cinnamoroll',
    description: 'Usa todas las funciones de Cinnamoroll',
    icon: '🌟',
    unlocked: false,
  },
  {
    id: 'last_page',
    title: 'Lector Romántico',
    description: 'Llega a la última página del libro',
    icon: '📖',
    unlocked: false,
  },
  {
    id: 'all_songs',
    title: 'Melómano del Amor',
    description: 'Escucha todas las canciones',
    icon: '🎵',
    unlocked: false,
  },
];

export function useAchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);
  const [usedFunctions, setUsedFunctions] = useState<Set<string>>(new Set());
  const [songsHeard, setSongsHeard] = useState<Set<string>>(new Set());

  const playNotificationSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;

    // Crear una melodía de notificación
    const notes = [523.25, 659.25, 783.99]; // Do, Mi, Sol

    notes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.value = freq;
      osc.type = 'sine';

      gain.gain.setValueAtTime(0.3, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.15);

      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.15);
    });
  }, []);

  const unlockAchievement = useCallback(
    (achievementId: string) => {
      setAchievements((prev) => {
        const updated = prev.map((ach) =>
          ach.id === achievementId && !ach.unlocked
            ? { ...ach, unlocked: true, unlockedAt: new Date() }
            : ach
        );

        const unlockedAch = updated.find((a) => a.id === achievementId);
        if (unlockedAch && !achievements.find((a) => a.id === achievementId)?.unlocked) {
          playNotificationSound();

          const notification: AchievementNotification = {
            id: `${achievementId}-${Date.now()}`,
            achievement: unlockedAch,
            createdAt: new Date(),
          };

          setNotifications((prev) => [...prev, notification]);

          setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
          }, 4000);
        }

        return updated;
      });
    },
    [achievements, playNotificationSound]
  );

  const trackFunctionUsed = useCallback(
    (functionName: string) => {
      const newUsedFunctions = new Set(usedFunctions);
      newUsedFunctions.add(functionName);
      setUsedFunctions(newUsedFunctions);

      // Verificar si se han usado todas las funciones
      if (newUsedFunctions.size === 6) {
        // 6 funciones: jump, spin, orbit, bow, dance, eat
        unlockAchievement('all_functions');
      }
    },
    [usedFunctions, unlockAchievement]
  );

  const trackSongHeard = useCallback(
    (songId: string) => {
      const newSongsHeard = new Set(songsHeard);
      newSongsHeard.add(songId);
      setSongsHeard(newSongsHeard);

      // Verificar si se han escuchado todas las canciones
      if (newSongsHeard.size >= 1) {
        // Al menos una canción
        unlockAchievement('all_songs');
      }
    },
    [songsHeard, unlockAchievement]
  );

  const trackLastPageReached = useCallback(() => {
    unlockAchievement('last_page');
  }, [unlockAchievement]);

  return {
    achievements,
    notifications,
    trackFunctionUsed,
    trackSongHeard,
    trackLastPageReached,
    usedFunctions,
    songsHeard,
  };
}

export function AchievementNotifications({ notifications }: { notifications: AchievementNotification[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gradient-to-r from-rosa-pastel to-celeste-romantic rounded-lg shadow-lg p-4 text-white max-w-xs animate-in slide-in-from-right-4 fade-in"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">{notification.achievement.icon}</div>
            <div>
              <h3 className="font-bold text-sm">{notification.achievement.title}</h3>
              <p className="text-xs opacity-90">{notification.achievement.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
