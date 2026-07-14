import { useState } from 'react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus, Music, Heart, Image as ImageIcon, Settings } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Página de Contenido - Formulario Simple para Subir Contenido
 * Accesible sin autenticación
 * Permite subir fotos, mensajes y canciones
 */
export default function Content() {
  const [loading, setLoading] = useState(false);

  // Queries
  const { data: photos = [], refetch: refetchPhotos } = trpc.photos.list.useQuery();
  const { data: messages = [], refetch: refetchMessages } = trpc.messages.list.useQuery();
  const { data: songs = [], refetch: refetchSongs } = trpc.songs.list.useQuery();

  // Mutations
  const createPhotoMutation = trpc.photos.create.useMutation();
  const deletePhotoMutation = trpc.photos.delete.useMutation();
  const createMessageMutation = trpc.messages.create.useMutation();
  const deleteMessageMutation = trpc.messages.delete.useMutation();
  const createSongMutation = trpc.songs.create.useMutation();
  const deleteSongMutation = trpc.songs.delete.useMutation();

  // Form states
  const [photoForm, setPhotoForm] = useState({ title: '', description: '', imageUrl: '', imageKey: '' });
  const [messageForm, setMessageForm] = useState({ title: '', content: '', emoji: '💕' });
  const [songForm, setSongForm] = useState({ title: '', artist: '', musicUrl: '', coverImageUrl: '' });

  // Handlers para fotos
  const handleAddPhoto = async () => {
    if (!photoForm.title || !photoForm.imageUrl) {
      toast.error('Por favor completa el título y la URL de la imagen');
      return;
    }

    setLoading(true);
    try {
      await createPhotoMutation.mutateAsync({
        title: photoForm.title,
        description: photoForm.description,
        imageUrl: photoForm.imageUrl,
        imageKey: photoForm.imageKey || `photo_${Date.now()}`,
      });
      toast.success('Foto agregada exitosamente');
      setPhotoForm({ title: '', description: '', imageUrl: '', imageKey: '' });
      refetchPhotos();
    } catch (error) {
      toast.error('Error al agregar la foto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    try {
      await deletePhotoMutation.mutateAsync({ id });
      toast.success('Foto eliminada');
      refetchPhotos();
    } catch (error) {
      toast.error('Error al eliminar la foto');
    }
  };

  // Handlers para mensajes
  const handleAddMessage = async () => {
    if (!messageForm.title || !messageForm.content) {
      toast.error('Por favor completa el título y el contenido del mensaje');
      return;
    }

    setLoading(true);
    try {
      await createMessageMutation.mutateAsync({
        title: messageForm.title,
        content: messageForm.content,
        emoji: messageForm.emoji,
      });
      toast.success('Mensaje agregado exitosamente');
      setMessageForm({ title: '', content: '', emoji: '💕' });
      refetchMessages();
    } catch (error) {
      toast.error('Error al agregar el mensaje');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await deleteMessageMutation.mutateAsync({ id });
      toast.success('Mensaje eliminado');
      refetchMessages();
    } catch (error) {
      toast.error('Error al eliminar el mensaje');
    }
  };

  // Handlers para canciones
  const handleAddSong = async () => {
    if (!songForm.title || !songForm.artist || !songForm.musicUrl) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      await createSongMutation.mutateAsync({
        title: songForm.title,
        artist: songForm.artist,
        musicUrl: songForm.musicUrl,
        coverImageUrl: songForm.coverImageUrl,
      });
      toast.success('Canción agregada exitosamente');
      setSongForm({ title: '', artist: '', musicUrl: '', coverImageUrl: '' });
      refetchSongs();
    } catch (error) {
      toast.error('Error al agregar la canción');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSong = async (id: number) => {
    try {
      await deleteSongMutation.mutateAsync({ id });
      toast.success('Canción eliminada');
      refetchSongs();
    } catch (error) {
      toast.error('Error al eliminar la canción');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celeste-romantic/10 via-white to-rosa-pastel/10 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-rosa-pastel mb-2">Gestor de Contenido</h1>
            <p className="text-gray-600">Agrega fotos, mensajes y música para el cumpleaños especial</p>
          </div>
          <Link href="/spotify">
            <Button className="gap-2 bg-green-500 hover:bg-green-600">
              <Settings size={18} />
              Spotify
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon size={18} />
              Fotos
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Heart size={18} />
              Mensajes
            </TabsTrigger>
            <TabsTrigger value="songs" className="flex items-center gap-2">
              <Music size={18} />
              Canciones
            </TabsTrigger>
          </TabsList>

          {/* Tab: Fotos */}
          <TabsContent value="photos" className="space-y-6">
            <Card className="p-6 border-rosa-pastel/20">
              <h2 className="text-2xl font-bold text-rosa-pastel mb-4">Agregar Foto</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título de la foto</label>
                  <Input
                    placeholder="Ej: Nuestro viaje a la playa"
                    value={photoForm.title}
                    onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción (opcional)</label>
                  <Textarea
                    placeholder="Ej: Verano 2024"
                    value={photoForm.description}
                    onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la imagen *</label>
                  <Input
                    placeholder="https://ejemplo.com/foto.jpg"
                    value={photoForm.imageUrl}
                    onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Usa manus-upload-file --webdev para subir tu imagen y obtener el URL
                  </p>
                </div>

                <Button
                  onClick={handleAddPhoto}
                  disabled={loading}
                  className="w-full bg-rosa-pastel hover:bg-rosa-pastel/90"
                >
                  <Plus size={18} className="mr-2" />
                  Agregar Foto
                </Button>
              </div>
            </Card>

            {/* Lista de fotos */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">Fotos Agregadas ({photos.length})</h3>
              {photos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay fotos aún. ¡Agrega la primera!</p>
              ) : (
                photos.map((photo: any) => (
                  <Card key={photo.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{photo.title}</p>
                        {photo.description && (
                          <p className="text-sm text-gray-600">{photo.description}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tab: Mensajes */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="p-6 border-rosa-pastel/20">
              <h2 className="text-2xl font-bold text-rosa-pastel mb-4">Agregar Mensaje</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título del mensaje</label>
                  <Input
                    placeholder="Ej: Mi razón favorita para amarte"
                    value={messageForm.title}
                    onChange={(e) => setMessageForm({ ...messageForm, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contenido del mensaje *</label>
                  <Textarea
                    placeholder="Escribe tu mensaje de amor aquí..."
                    value={messageForm.content}
                    onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emoji decorativo</label>
                  <Input
                    placeholder="💕"
                    value={messageForm.emoji}
                    onChange={(e) => setMessageForm({ ...messageForm, emoji: e.target.value })}
                    maxLength={2}
                  />
                </div>

                <Button
                  onClick={handleAddMessage}
                  disabled={loading}
                  className="w-full bg-rosa-pastel hover:bg-rosa-pastel/90"
                >
                  <Plus size={18} className="mr-2" />
                  Agregar Mensaje
                </Button>
              </div>
            </Card>

            {/* Lista de mensajes */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">Mensajes Agregados ({messages.length})</h3>
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay mensajes aún. ¡Agrega el primero!</p>
              ) : (
                messages.map((message: any) => (
                  <Card key={message.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{message.emoji}</span>
                          <p className="font-semibold text-gray-800">{message.title}</p>
                        </div>
                        <p className="text-gray-600 text-sm">{message.content}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tab: Canciones */}
          <TabsContent value="songs" className="space-y-6">
            <Card className="p-6 border-rosa-pastel/20">
              <h2 className="text-2xl font-bold text-rosa-pastel mb-4">Agregar Canción</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la canción *</label>
                  <Input
                    placeholder="Ej: Perfect"
                    value={songForm.title}
                    onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Artista *</label>
                  <Input
                    placeholder="Ej: Ed Sheeran"
                    value={songForm.artist}
                    onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la música *</label>
                  <Input
                    placeholder="https://open.spotify.com/track/..."
                    value={songForm.musicUrl}
                    onChange={(e) => setSongForm({ ...songForm, musicUrl: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Puedes usar URLs de Spotify, YouTube Music o cualquier plataforma
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la portada (opcional)</label>
                  <Input
                    placeholder="https://ejemplo.com/portada.jpg"
                    value={songForm.coverImageUrl}
                    onChange={(e) => setSongForm({ ...songForm, coverImageUrl: e.target.value })}
                  />
                </div>

                <Button
                  onClick={handleAddSong}
                  disabled={loading}
                  className="w-full bg-rosa-pastel hover:bg-rosa-pastel/90"
                >
                  <Plus size={18} className="mr-2" />
                  Agregar Canción
                </Button>
              </div>
            </Card>

            {/* Lista de canciones */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">Canciones Agregadas ({songs.length})</h3>
              {songs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay canciones aún. ¡Agrega la primera!</p>
              ) : (
                songs.map((song: any) => (
                  <Card key={song.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {song.coverImageUrl && (
                        <img
                          src={song.coverImageUrl}
                          alt={song.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{song.title}</p>
                        <p className="text-sm text-gray-600">{song.artist}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSong(song.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
