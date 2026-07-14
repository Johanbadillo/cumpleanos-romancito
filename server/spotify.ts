import { Router } from 'express';
import axios from 'axios';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  uri: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackCount: number;
}

// Get Spotify authorization URL
export function getSpotifyAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: process.env.VITE_SPOTIFY_CLIENT_ID || '',
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'playlist-read-private playlist-read-collaborative',
  });

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

// Exchange authorization code for access token
export async function getSpotifyAccessToken(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
  const response = await axios.post(SPOTIFY_TOKEN_URL, null, {
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: process.env.VITE_SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  });

  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    expiresIn: response.data.expires_in,
  };
}

// Refresh access token
export async function refreshSpotifyAccessToken(
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const response = await axios.post(SPOTIFY_TOKEN_URL, null, {
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.VITE_SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  });

  return {
    accessToken: response.data.access_token,
    expiresIn: response.data.expires_in,
  };
}

// Get user's playlists
export async function getUserPlaylists(accessToken: string): Promise<SpotifyPlaylist[]> {
  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 50,
      },
    });

    if (!response.data || !response.data.items) {
      console.error('Invalid Spotify response:', response.data);
      return [];
    }

    return response.data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description || '',
      imageUrl: playlist.images[0]?.url || '',
      trackCount: playlist.tracks?.total || 0,
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
}

// Get playlist tracks
export async function getPlaylistTracks(
  playlistId: string,
  accessToken: string
): Promise<SpotifyTrack[]> {
  const response = await axios.get(`${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      limit: 50,
    },
  });

  return response.data.items
    .filter((item: any) => item.track)
    .map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists[0]?.name || 'Unknown',
      album: item.track.album?.name || 'Unknown',
      imageUrl: item.track.album?.images[0]?.url || '',
      uri: item.track.uri,
    }));
}

// Get current user info
export async function getCurrentUser(accessToken: string): Promise<{ id: string; email: string; displayName: string }> {
  const response = await axios.get(`${SPOTIFY_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    id: response.data.id,
    email: response.data.email,
    displayName: response.data.display_name,
  };
}
