import {Animated, Fade} from 'remotion-animated';
import {RewindSchema} from './schemas';
import {Img, useVideoConfig} from 'remotion';

interface FavoriteArtistsStatsProps {
	favoriteVoicebanks: RewindSchema['favoriteVoicebanks'];
	favoriteProducers: RewindSchema['favoriteProducers'];
}

export default function FavoriteArtistsStats({
	favoriteProducers,
	favoriteVoicebanks,
}: FavoriteArtistsStatsProps) {
	// TODO: Check if image just returns default ? image
	const vb = [...favoriteVoicebanks].reverse();
	const pr = [...favoriteProducers].reverse();
	const {fps} = useVideoConfig();

	const animation = (
		artists: RewindSchema['favoriteProducers'],
		startFrame: number = 0
	) => (
		<>
			{artists.map((v, ind) => (
				<Animated
					key={ind}
					in={ind * 60 + startFrame}
					animations={[
						Fade({
							start: ind * 60 + startFrame,
							duration: 30,
							initial: 0,
							to: 1,
						}),
						Fade({
							start: (ind + 1) * 60 + startFrame,
							duration: 30,
							initial: 1,
							to: 0,
						}),
					]}
				>
					<p className="absolute text-4xl w-full text-center z-10">
						{`${vb.length - ind}. ${v.defaultName}`}
					</p>
					{v.mainPicture !== undefined && (
						<Img
							src={v.mainPicture.urlOriginal}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  opacity-40 h-5/6 object-contain"
						/>
					)}
				</Animated>
			))}
		</>
	);

	const TitleText = ({
		text,
		start,
		length,
	}: {
		text: string;
		start: number;
		length: number;
	}) => (
		<Animated
			in={start}
			animations={[
				Fade({start, initial: 0, to: 1}),
				Fade({start: start + length * fps * 2, to: 0}),
			]}
		>
			<div className="absolute top-10 w-full text-center text-6xl font-bold">
				{text}
			</div>
		</Animated>
	);

	const vbStart = fps / 2;
	const prStart = fps / 2 + vb.length * 2 * fps;

	let artistType = 'Voicebanks';
	if (vb.find((v) => v.artistType === 'Character') !== undefined) {
		artistType = 'Characters';
	}
	if (vb.find((v) => v.artistType === 'Utaite') !== undefined) {
		artistType = 'Utaite';
	}

	return (
		<>
			<TitleText
				start={vbStart}
				text={`Favorite ${artistType}`}
				length={vb.length}
			/>
			<TitleText start={prStart} text="Favorite Producers" length={pr.length} />
			{animation(vb, vbStart)}
			{animation(pr, prStart)}
		</>
	);
}
