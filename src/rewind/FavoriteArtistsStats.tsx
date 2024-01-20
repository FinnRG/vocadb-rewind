import {Animated, Fade} from 'remotion-animated';
import {RewindSchema} from './schemas';
import {Img} from 'remotion';

interface FavoriteArtistsStatsProps {
	favoriteVoicebanks: RewindSchema['favoriteVoicebanks'];
	favoriteProducers: RewindSchema['favoriteProducers'];
}

export default function FavoriteArtistsStats({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	favoriteProducers,
	favoriteVoicebanks,
}: FavoriteArtistsStatsProps) {
	// TODO: Check if image just returns default ? image
	return (
		<>
			{favoriteVoicebanks.map((v, ind) => (
				<Animated
					key={ind}
					in={ind * 60}
					animations={[
						Fade({start: ind * 60, duration: 30, initial: 0, to: 1}),
						Fade({start: (ind + 1) * 60, duration: 30, initial: 1, to: 0}),
					]}
				>
					<p className="absolute text-4xl w-full text-center z-10">
						{`${ind + 1}. ${v.defaultName}`}
					</p>
					<Img
						src={`https://vocadb.net/Artist/Picture/${v.id}`}
						placeholder=""
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  opacity-40 h-5/6 object-contain"
					/>
				</Animated>
			))}
		</>
	);
}
