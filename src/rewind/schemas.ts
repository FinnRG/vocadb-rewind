import {z} from 'zod';

const artistSchema = z.object({
	id: z.number(),
	artistType: z.string(),
	defaultName: z.string(),
	mainPicture: z
		.object({
			urlOriginal: z.string(),
		})
		.optional(),
});

const tagSchema = z.object({
	item1: z.string(),
	item2: z.number(),
});

const songSchema = z.object({
	pvs: z.array(
		z.object({
			url: z.string(),
			service: z.enum(['Youtube', 'NicoNicoDouga']),
			disabled: z.boolean(),
			pvId: z.string(),
		})
	),
});

export const rewindSchema = z.object({
	accountName: z.string(),
	userRank: z.number(),
	userRankPercentage: z.number(),
	songHitsOnDays: z.array(
		z.object({
			date: z.string(),
			count: z.number(),
		})
	),
	favoriteGenreTags: z.array(tagSchema),
	favoriteSubjectiveTags: z.array(tagSchema),
	favoriteProducers: z.array(artistSchema),
	favoriteVoicebanks: z.array(artistSchema),
	favoriteSongs: z.array(songSchema),
	baseUrl: z.string().optional(),
});

export type Song = z.infer<typeof songSchema>;
export type RewindSchema = z.infer<typeof rewindSchema>;
