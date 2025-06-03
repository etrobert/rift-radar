import { z } from 'zod';

export const ChampionSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  title: z.string(),
  image: z.object({
    full: z.string(),
    sprite: z.string(),
    group: z.string(),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
  }),
  stats: z.record(z.number()),
  partype: z.string(),
  info: z.object({
    attack: z.number(),
    defense: z.number(),
    magic: z.number(),
    difficulty: z.number(),
  }),
  tags: z.array(z.string()),
  blurb: z.string(),
});

export const ChampionDataSchema = z.object({
  type: z.string(),
  format: z.string(),
  version: z.string(),
  data: z.record(ChampionSchema),
});

export type Champion = z.infer<typeof ChampionSchema>;
export type ChampionData = z.infer<typeof ChampionDataSchema>;