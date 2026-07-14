import { eq, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, photos, messages, songs, spotifyConfig, Photo, Message, Song, InsertPhoto, InsertMessage, InsertSong, SpotifyConfig, InsertSpotifyConfig } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Funciones para fotos
export async function getAllPhotos(): Promise<Photo[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(photos).orderBy(asc(photos.order));
}

export async function createPhoto(photo: InsertPhoto): Promise<Photo | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(photos).values(photo);
  const newPhoto = await db.select().from(photos).where(eq(photos.id, result[0].insertId as number)).limit(1);
  return newPhoto[0] || null;
}

export async function deletePhoto(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(photos).where(eq(photos.id, id));
  return true;
}

// Funciones para mensajes
export async function getAllMessages(): Promise<Message[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(messages).orderBy(asc(messages.order));
}

export async function createMessage(message: InsertMessage): Promise<Message | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(messages).values(message);
  const newMessage = await db.select().from(messages).where(eq(messages.id, result[0].insertId as number)).limit(1);
  return newMessage[0] || null;
}

export async function deleteMessage(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(messages).where(eq(messages.id, id));
  return true;
}

// Funciones para canciones
export async function getAllSongs(): Promise<Song[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(songs).orderBy(asc(songs.order));
}

export async function createSong(song: InsertSong): Promise<Song | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(songs).values(song);
  const newSong = await db.select().from(songs).where(eq(songs.id, result[0].insertId as number)).limit(1);
  return newSong[0] || null;
}

export async function deleteSong(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(songs).where(eq(songs.id, id));
  return true;
}
