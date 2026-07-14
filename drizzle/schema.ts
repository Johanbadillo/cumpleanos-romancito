import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabla para fotos de la galería
 */
export const photos = mysqlTable("photos", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(), // URL de la imagen en S3
  imageKey: varchar("imageKey", { length: 255 }).notNull(), // Clave de S3
  order: int("order").default(0), // Para ordenar las fotos
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = typeof photos.$inferInsert;

/**
 * Tabla para mensajes especiales
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(), // Mensaje de amor
  emoji: varchar("emoji", { length: 10 }).default("💕"), // Emoji decorativo
  order: int("order").default(0), // Para ordenar los mensajes
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Tabla para canciones de la playlist
 */
export const songs = mysqlTable("songs", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  artist: varchar("artist", { length: 255 }).notNull(),
  musicUrl: text("musicUrl").notNull(), // URL de Spotify, YouTube, etc.
  coverImageUrl: text("coverImageUrl"), // Portada del álbum
  order: int("order").default(0), // Para ordenar la playlist
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Song = typeof songs.$inferSelect;
export type InsertSong = typeof songs.$inferInsert;

/**
 * Tabla para almacenar configuración de Spotify
 */
export const spotifyConfig = mysqlTable("spotifyConfig", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  spotifyUserId: varchar("spotifyUserId", { length: 255 }).notNull(),
  spotifyEmail: varchar("spotifyEmail", { length: 320 }),
  spotifyDisplayName: varchar("spotifyDisplayName", { length: 255 }),
  accessToken: text("accessToken").notNull(),
  refreshToken: text("refreshToken"),
  selectedPlaylistId: varchar("selectedPlaylistId", { length: 255 }),
  selectedPlaylistName: varchar("selectedPlaylistName", { length: 255 }),
  tokenExpiresAt: timestamp("tokenExpiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SpotifyConfig = typeof spotifyConfig.$inferSelect;
export type InsertSpotifyConfig = typeof spotifyConfig.$inferInsert;
