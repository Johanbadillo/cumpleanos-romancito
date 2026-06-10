import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Panel de Administración
 * Solo accesible para el propietario (admin)
 * Permite subir fotos, mensajes y canciones
 */
export default function Admin() {
  const { user } = useAuth();
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

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-celeste-romantic to-rosa-pastel">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-rosa-pastel mb-4">Acceso Denegado</h1>
          <p className="text-gray-600">Solo los administradores pueden acceder a esta página.</p>
        </Card>
      </div>
    );
  }

  // Handle photo upload
  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPhotoMutation.mutateAsync({
        title: photoForm.title,
        description: photoForm.description,
        imageUrl: photoForm.imageUrl,
        imageKey: photoForm.imageKey,
      });
      setPhotoForm({ title: '', description: '', imageUrl: '', imageKey: '' });
      await refetchPhotos();
      toast.success('Foto agregada correctamente');
    } catch (error) {
      toast.error('Error al agregar la foto');
    } finally {
      setLoading(false);
    }
  };

  // Handle message submit
  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createMessageMutation.mutateAsync({
        title: messageForm.title,
        content: messageForm.content,
        emoji: messageForm.emoji,
      });
      setMessageForm({ title: '', content: '', emoji: '💕' });
      await refetchMessages();
      toast.success('Mensaje agregado correctamente');
    } catch (error) {
      toast.error('Error al agregar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  // Handle song submit
  const handleSongSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSongMutation.mutateAsync({
        title: songForm.title,
        artist: songForm.artist,
        musicUrl: songForm.musicUrl,
        coverImageUrl: songForm.coverImageUrl,
      });
      setSongForm({ title: '', artist: '', musicUrl: '', coverImageUrl: '' });
      await refetchSongs();
      toast.success('Canción agregada correctamente');
    } catch (error) {
      toast.error('Error al agregar la canción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blanco-cremoso via-celeste-romantic/10 to-rosa-pastel/10 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-rosa-pastel mb-8 text-center">
          Panel de Administración
        </h1>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photos">Fotos</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
            <TabsTrigger value="songs">Canciones</TabsTrigger>
          </TabsList>

          {/* FOTOS */}
          <TabsContent value="photos" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-rosa-pastel mb-4 flex items-center gap-2">
                <Plus size={24} /> Agregar Foto
              </h2>
              <form onSubmit={handlePhotoSubmit} className="space-y-4">
                <Input
                  placeholder="Título de la foto"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Descripción (opcional)"
                  value={photoForm.description}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                />
                <Input
                  placeholder="URL de la imagen (ej: https://...)"
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  required
                />
                <Input
                  placeholder="Clave de almacenamiento (ej: photo_abc123)"
                  value={photoForm.imageKey}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageKey: e.target.value })}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full bg-rosa-pastel hover:bg-rosa-pastel/90">
                  {loading ? 'Guardando...' : 'Agregar Foto'}
                </Button>
              </form>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-rosa-pastel">Fotos Agregadas ({photos.length})</h3>
              {photos.map((photo) => (
                <Card key={photo.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">{photo.title}</h4>
                    <p className="text-sm text-gray-600">{photo.description}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      await deletePhotoMutation.mutateAsync({ id: photo.id });
                      await refetchPhotos();
                      toast.success('Foto eliminada');
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* MENSAJES */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-rosa-pastel mb-4 flex items-center gap-2">
                <Plus size={24} /> Agregar Mensaje
              </h2>
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <Input
                  placeholder="Título del mensaje"
                  value={messageForm.title}
                  onChange={(e) => setMessageForm({ ...messageForm, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Contenido del mensaje (tu mensaje de amor)"
                  value={messageForm.content}
                  onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                  required
                  rows={4}
                />
                <Input
                  placeholder="Emoji decorativo (ej: 💕, 🌷, ✨)"
                  value={messageForm.emoji}
                  onChange={(e) => setMessageForm({ ...messageForm, emoji: e.target.value })}
                  maxLength={2}
                />
                <Button type="submit" disabled={loading} className="w-full bg-rosa-pastel hover:bg-rosa-pastel/90">
                  {loading ? 'Guardando...' : 'Agregar Mensaje'}
                </Button>
              </form>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-rosa-pastel">Mensajes Agregados ({messages.length})</h3>
              {messages.map((message) => (
                <Card key={message.id} className="p-4 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{message.emoji} {message.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">{message.content}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      await deleteMessageMutation.mutateAsync({ id: message.id });
                      await refetchMessages();
                      toast.success('Mensaje eliminado');
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* CANCIONES */}
          <TabsContent value="songs" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-rosa-pastel mb-4 flex items-center gap-2">
                <Plus size={24} /> Agregar Canción
              </h2>
              <form onSubmit={handleSongSubmit} className="space-y-4">
                <Input
                  placeholder="Nombre de la canción"
                  value={songForm.title}
                  onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="Artista"
                  value={songForm.artist}
                  onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                  required
                />
                <Input
                  placeholder="URL de la música (Spotify, YouTube, etc.)"
                  value={songForm.musicUrl}
                  onChange={(e) => setSongForm({ ...songForm, musicUrl: e.target.value })}
                  required
                />
                <Input
                  placeholder="URL de la portada del álbum (opcional)"
                  value={songForm.coverImageUrl}
                  onChange={(e) => setSongForm({ ...songForm, coverImageUrl: e.target.value })}
                />
                <Button type="submit" disabled={loading} className="w-full bg-rosa-pastel hover:bg-rosa-pastel/90">
                  {loading ? 'Guardando...' : 'Agregar Canción'}
                </Button>
              </form>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-rosa-pastel">Canciones Agregadas ({songs.length})</h3>
              {songs.map((song) => (
                <Card key={song.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">{song.title}</h4>
                    <p className="text-sm text-gray-600">por {song.artist}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      await deleteSongMutation.mutateAsync({ id: song.id });
                      await refetchSongs();
                      toast.success('Canción eliminada');
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
