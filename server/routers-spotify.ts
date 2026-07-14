import { router, protectedProcedure } from './_core/trpc';
import { z } from 'zod';
import {
  getSpotifyAuthUrl,
  getSpotifyAccessToken,
  refreshSpotifyAccessToken,
  getUserPlaylists,
  getPlaylistTracks,
  getCurrentUser,
} from './spotify';
import {
  getSpotifyConfig,
  saveSpotifyConfig,
  updateSelectedPlaylist,
  updateAccessToken,
} from './db-spotify';

export const spotifyRouter = router({
  // Obtener URL de autenticación de Spotify
  getAuthUrl: protectedProcedure
    .input(z.object({ redirectUri: z.string() }))
    .query(({ input }) => {
      const authUrl = getSpotifyAuthUrl(input.redirectUri);
      return { authUrl };
    }),

  // Procesar callback de Spotify
  handleCallback: protectedProcedure
    .input(z.object({ code: z.string(), redirectUri: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { accessToken, refreshToken, expiresIn } = await getSpotifyAccessToken(
        input.code,
        input.redirectUri
      );

      const user = await getCurrentUser(accessToken);

      await saveSpotifyConfig(ctx.user.id, {
        spotifyUserId: user.id,
        spotifyEmail: user.email,
        spotifyDisplayName: user.displayName,
        accessToken,
        refreshToken,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
      });

      return { success: true, user };
    }),

  // Obtener playlists del usuario
  getPlaylists: protectedProcedure.query(async ({ ctx }) => {
    const config = await getSpotifyConfig(ctx.user.id);
    if (!config) {
      throw new Error('Not authenticated with Spotify');
    }

    let accessToken = config.accessToken;

    // Verificar si el token expiró
    if (config.tokenExpiresAt && new Date() > config.tokenExpiresAt) {
      if (!config.refreshToken) {
        throw new Error('Token expired and no refresh token available');
      }

      const { accessToken: newToken, expiresIn } = await refreshSpotifyAccessToken(
        config.refreshToken
      );
      accessToken = newToken;
      await updateAccessToken(ctx.user.id, newToken, expiresIn);
    }

    const playlists = await getUserPlaylists(accessToken);
    return { playlists };
  }),

  // Obtener canciones de una playlist
  getPlaylistTracks: protectedProcedure
    .input(z.object({ playlistId: z.string() }))
    .query(async ({ ctx, input }) => {
      const config = await getSpotifyConfig(ctx.user.id);
      if (!config) {
        throw new Error('Not authenticated with Spotify');
      }

      let accessToken = config.accessToken;

      // Verificar si el token expiró
      if (config.tokenExpiresAt && new Date() > config.tokenExpiresAt) {
        if (!config.refreshToken) {
          throw new Error('Token expired and no refresh token available');
        }

        const { accessToken: newToken, expiresIn } = await refreshSpotifyAccessToken(
          config.refreshToken
        );
        accessToken = newToken;
        await updateAccessToken(ctx.user.id, newToken, expiresIn);
      }

      const tracks = await getPlaylistTracks(input.playlistId, accessToken);
      return { tracks };
    }),

  // Seleccionar playlist
  selectPlaylist: protectedProcedure
    .input(z.object({ playlistId: z.string(), playlistName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await updateSelectedPlaylist(ctx.user.id, input.playlistId, input.playlistName);
      return { success: true };
    }),

  // Obtener configuración actual de Spotify
  getConfig: protectedProcedure.query(async ({ ctx }) => {
    const config = await getSpotifyConfig(ctx.user.id);
    return config || null;
  }),
});
