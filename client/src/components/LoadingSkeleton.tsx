/**
 * Componente LoadingSkeleton
 * Animación de carga suave y romántica para fotos y Spotify
 * Estilo: Animación Romancito
 */

interface LoadingSkeletonProps {
  type: 'photo' | 'spotify' | 'message';
  count?: number;
}

export default function LoadingSkeleton({ type, count = 1 }: LoadingSkeletonProps) {
  if (type === 'photo') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="relative rounded-2xl h-48 overflow-hidden bg-gradient-to-r from-rosa-pastel/20 via-celeste-romantic/20 to-rosa-pastel/20 animate-pulse"
            style={{
              animation: `shimmer 2s infinite`,
              animationDelay: `${i * 0.1}s`,
              backgroundSize: '200% 100%',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'spotify') {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="border border-rosa-pastel/20 rounded-lg p-4"
            style={{
              animation: `fadeInOut 2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded bg-gradient-to-br from-rosa-pastel/30 to-celeste-romantic/30 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-rosa-pastel/20 to-celeste-romantic/20 rounded w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-rosa-pastel/10 to-celeste-romantic/10 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-20 bg-gradient-to-r from-rosa-pastel/15 to-celeste-romantic/15 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'message') {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="border-l-4 border-rosa-pastel/30 pl-6 py-3"
            style={{
              animation: `slideInFromLeft 1.5s ease-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                ✨
              </div>
              <div className="h-5 bg-gradient-to-r from-rosa-pastel/20 to-celeste-romantic/20 rounded w-32"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-rosa-pastel/15 to-celeste-romantic/15 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-rosa-pastel/15 to-celeste-romantic/15 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
