import { z } from "zod"

const artistSchema = z.object({
  id: z.number(),
  artistType: z.string(),
  defaultName: z.string()
})

const tagSchema = z.object({
  item1: z.string(),
  item2: z.number()
})

export const rewindSchema = z.object({
  songHitsOnDays: z.array(z.object({
    date: z.string(),
    count: z.number()
  })),
  favoriteGenreTags: z.array(tagSchema),
  favoriteSubjectiveTags: z.array(tagSchema),
  favoriteProducers: z.array(artistSchema),
  favoriteVoicebanks: z.array(artistSchema)
})

export type RewindSchema = z.infer<typeof rewindSchema>