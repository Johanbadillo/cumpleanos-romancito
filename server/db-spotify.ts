import { getDb } from './db';
import { spotifyConfig } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export interface SpotifyConfigRecord {
  id: number;
  userId: number;
  spotifyUserId: string;
  spotifyEmail?: string;
  spotifyDisplayName?: string;
  accessToken: string;
  refreshToken?: string;
  selectedPlaylistId?: string;
  selectedPlaylistName?: string;
  tokenExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export async function getSpotifyConfig(userId: number): Promise<SpotifyConfigRecord | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(spotifyConfig).where(eq(spotifyConfig.userId, userId)).limit(1);
    return (result && result.length > 0 ? result[0] : null) as SpotifyConfigRecord | null;
  } catch (error) {
    console.error('Error fetching Spotify config:', error);
    return null;
  }
}

export async function saveSpotifyConfig(
  userId: number,
  data: {
    spotifyUserId: string;
    spotifyEmail?: string;
    spotifyDisplayName?: string;
    accessToken: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
  }
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  const existing = await getSpotifyConfig(userId);

  if (existing) {
    await db
      .update(spotifyConfig)
      .set({
        spotifyUserId: data.spotifyUserId,
        spotifyEmail: data.spotifyEmail,
        spotifyDisplayName: data.spotifyDisplayName,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        tokenExpiresAt: data.tokenExpiresAt,
        updatedAt: new Date(),
      })
      .where(eq(spotifyConfig.userId, userId));
  } else {
    await db.insert(spotifyConfig).values({
      userId,
      spotifyUserId: data.spotifyUserId,
      spotifyEmail: data.spotifyEmail,
      spotifyDisplayName: data.spotifyDisplayName,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenExpiresAt: data.tokenExpiresAt,
    });
  }
}

export async function updateSelectedPlaylist(
  userId: number,
  playlistId: string,
  playlistName: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db
    .update(spotifyConfig)
    .set({
      selectedPlaylistId: playlistId,
      selectedPlaylistName: playlistName,
      updatedAt: new Date(),
    })
    .where(eq(spotifyConfig.userId, userId));
}

export async function updateAccessToken(
  userId: number,
  accessToken: string,
  expiresIn: number
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  const tokenExpiresAt = new Date(Date.now() + expiresIn * 1000);

  await db
    .update(spotifyConfig)
    .set({
      accessToken,
      tokenExpiresAt,
      updatedAt: new Date(),
    })
    .where(eq(spotifyConfig.userId, userId));
}
