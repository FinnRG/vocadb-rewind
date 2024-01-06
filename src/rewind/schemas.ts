import { z } from "zod"

export const rewindSchema = z.object({
  songHitsOnDays: z.array(z.object({
    date: z.string(),
    count: z.number()
  })),
  favoriteGenreTags: z.array(z.object({
    item1: z.string(),
    item2: z.number()
  })),
  favoriteSubjectiveTags: z.array(z.object({
    item1: z.string(),
    item2: z.number()
  }))
})

export type RewindSchema = z.infer<typeof rewindSchema>