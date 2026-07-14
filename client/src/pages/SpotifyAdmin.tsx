import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackCount: number;
}

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  uri: string;
}

export default function SpotifyAdmin() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Queries y mutations
  // Usar siempre la URL de producción para Spotify
  const spotifyRedirectUri = 'https://cumple-roman-guasuug4.manus.space/spotify-callback';
  const getAuthUrl = trpc.spotify.getAuthUrl.useQuery({ redirectUri: spotifyRedirectUri });
  const handleCallback = trpc.spotify.handleCallback.useMutation();
  const getPlaylistsQuery = trpc.spotify.getPlaylists.useQuery();
  const getPlaylistTracksQuery = trpc.spotify.getPlaylistTracks.useQuery(
    { playlistId: selectedPlaylist?.id || '' },
    { enabled: !!selectedPlaylist?.id }
  );
  const selectPlaylistMutation = trpc.spotify.selectPlaylist.useMutation();
  const getConfig = trpc.spotify.getConfig.useQuery();

  // Cargar playlists cuando la query esté lista
  useEffect(() => {
    if (getPlaylistsQuery.data?.playlists) {
      setPlaylists(getPlaylistsQuery.data.playlists);
      
      // Si hay una playlist seleccionada previamente, cargarla
      if (getConfig.data?.selectedPlaylistId) {
        const selected = getPlaylistsQuery.data.playlists.find(
          (p) => p.id === getConfig.data?.selectedPlaylistId
        );
        if (selected) {
          setSelectedPlaylist(selected);
        }
      }
      
      setError(null);
      setLoading(false);
    }
  }, [getPlaylistsQuery.data, getConfig.data]);

  // Cargar canciones cuando cambia la playlist seleccionada
  useEffect(() => {
    if (getPlaylistTracksQuery.data?.tracks) {
      setTracks(getPlaylistTracksQuery.data.tracks);
    }
  }, [getPlaylistTracksQuery.data]);

  // Manejar errores de carga de playlists
  useEffect(() => {
    if (getPlaylistsQuery.error) {
      const errorMsg = (getPlaylistsQuery.error as any).message || 'Error al cargar playlists';
      if (errorMsg.includes('Not authenticated')) {
        setError('Necesitas conectarte con Spotify primero');
      } else {
        setError(errorMsg);
      }
      setLoading(false);
    }
  }, [getPlaylistsQuery.error]);

  // Procesar callback de Spotify
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      handleCallback.mutate(
        { code, redirectUri: spotifyRedirectUri },
        {
          onSuccess: async () => {
            window.history.replaceState({}, document.title, window.location.pathname);
            // Recargar playlists después de autenticarse
            await getPlaylistsQuery.refetch();
          },
          onError: (error) => {
            setError(`Error de autenticación: ${(error as any).message}`);
          },
        }
      );
    }
  }, []);

  const handleSelectPlaylist = async (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    try {
      await selectPlaylistMutation.mutateAsync({
        playlistId: playlist.id,
        playlistName: playlist.name,
      });
    } catch (err) {
      setError('Error al seleccionar playlist');
    }
  };

  const handleConnect = () => {
    if (getAuthUrl.data?.authUrl) {
      // Guardar la URL actual para redirigir después de autenticarse
      sessionStorage.setItem('spotify_return_url', window.location.href);
      window.location.href = getAuthUrl.data.authUrl;
    }
  };

  const handleRefresh = async () => {
    setLoadingPlaylists(true);
    try {
      await getPlaylistsQuery.refetch();
    } catch (err) {
      setError('Error al refrescar playlists');
    } finally {
      setLoadingPlaylists(false);
    }
  };

  // Si hay error de autenticación, mostrar botón de conectar
  if (error?.includes('Necesitas conectarte')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rosa-pastel to-celeste-romantic">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <CardTitle>Conectar Spotify</CardTitle>
            <CardDescription>Necesitas conectarte con tu cuenta de Spotify Premium</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleConnect}
              disabled={getAuthUrl.isLoading}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              {getAuthUrl.isLoading ? 'Cargando...' : 'Conectar con Spotify'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosa-pastel to-celeste-romantic p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🎵 Selecciona tu Playlist</h1>
            <p className="text-white/80">Elige la playlist que deseas usar en tu libro de cumpleaños</p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={loadingPlaylists || getPlaylistsQuery.isLoading}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loadingPlaylists ? 'animate-spin' : ''}`} />
            Refrescar
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-red-500 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Playlists */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tus Playlists</CardTitle>
                <CardDescription>{playlists.length} playlists encontradas</CardDescription>
              </CardHeader>
              <CardContent>
                {loading || getPlaylistsQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                  </div>
                ) : playlists.length === 0 ? (
                  <div className="text-center py-8">
                    <Music className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No se encontraron playlists</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playlists.map((playlist) => (
                      <button
                        key={playlist.id}
                        onClick={() => handleSelectPlaylist(playlist)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedPlaylist?.id === playlist.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex gap-4">
                          {playlist.imageUrl && (
                            <img
                              src={playlist.imageUrl}
                              alt={playlist.name}
                              className="w-16 h-16 rounded object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{playlist.name}</h3>
                              {selectedPlaylist?.id === playlist.id && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{playlist.trackCount} canciones</p>
                            {playlist.description && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{playlist.description}</p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Canciones de la playlist seleccionada */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedPlaylist ? `${selectedPlaylist.name}` : 'Selecciona una playlist'}
                </CardTitle>
                <CardDescription>{tracks.length} canciones</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPlaylist && getPlaylistTracksQuery.isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-green-500" />
                  </div>
                ) : selectedPlaylist && tracks.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {tracks.map((track, index) => (
                      <div key={track.id} className="text-sm p-2 rounded bg-gray-50 hover:bg-gray-100">
                        <p className="font-medium text-gray-900 line-clamp-1">{index + 1}. {track.name}</p>
                        <p className="text-xs text-gray-600 line-clamp-1">{track.artist}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Selecciona una playlist para ver sus canciones</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
