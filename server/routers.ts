import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllPhotos, createPhoto, deletePhoto, getAllMessages, createMessage, deleteMessage, getAllSongs, createSong, deleteSong } from "./db";
import { z } from "zod";
import { InsertPhoto, InsertMessage, InsertSong } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Router para fotos
  photos: router({
    list: publicProcedure.query(() => getAllPhotos()),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().url(),
        imageKey: z.string(),
        order: z.number().optional(),
      }))
      .mutation(({ input }) => createPhoto(input as InsertPhoto)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deletePhoto(input.id)),
  }),

  // Router para mensajes
  messages: router({
    list: publicProcedure.query(() => getAllMessages()),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        emoji: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(({ input }) => createMessage(input as InsertMessage)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteMessage(input.id)),
  }),

  // Router para canciones
  songs: router({
    list: publicProcedure.query(() => getAllSongs()),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        artist: z.string().min(1),
        musicUrl: z.string().url(),
        coverImageUrl: z.string().url().optional(),
        order: z.number().optional(),
      }))
      .mutation(({ input }) => createSong(input as InsertSong)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteSong(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
