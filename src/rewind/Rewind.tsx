import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {wipe} from '@remotion/transitions/wipe';
import React, {useEffect} from 'react';
import {
	AbsoluteFill,
	Audio,
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Animated, Fade, Move, Scale} from 'remotion-animated';
import {RewindSchema} from './schemas';
import {fontFamily} from './font';
// Import { SongHitStats } from "./SongHitStats"
import SongHitText from './SongHitText';
import GenreStats from './GenreStats';
import GenreText from './GenreText';
import {SongHitStats2} from './SongHitStats2';
import FavoriteArtistsStats from './FavoriteArtistsStats';
import {preloadImage} from '@remotion/preload';

export const RewindVideo: React.FC<RewindSchema> = ({
	accountName,
	userRank,
	userRankPercentage,
	songHitsOnDays,
	favoriteGenreTags,
	favoriteSubjectiveTags,
	favoriteProducers,
	favoriteVoicebanks,
}) => {
	const config = useVideoConfig();
	const frame = useCurrentFrame();

	useEffect(() => {
		favoriteProducers.forEach((a) => {
			preloadImage(`https://vocadb.net/Artist/Picture/${a.id}`);
		});
		favoriteVoicebanks.forEach((a) => {
			preloadImage(`https://vocadb.net/Artist/Picture/${a.id}`);
		});
	}, []);

	return (
		<>
			<Audio
				name="Hibikase"
				placeholder=""
				volume={(f) =>
					interpolate(f, [0, 30], [0, 1], {extrapolateLeft: 'clamp'})
				}
				startFrom={15 * 60}
				src="https://dream-traveler.fly.dev/youtube/audio/ddl?url=https://youtu.be/lMEt3RdqB9Y"
			/>
			<TransitionSeries style={{fontFamily}}>
				<TransitionSeries.Sequence durationInFrames={5 * 60}>
					<AbsoluteFill className="bg-[#86cecb] justify-center">
						<Animated
							className="text-[6rem] font-bold text-center"
							animations={[
								Fade({initial: 0, to: 1, duration: 0.45 * 60, start: 0}),
								Scale({initial: 0.8, by: 1}),
								Move({
									initialY: 0,
									y: -config.height / 6,
									start: 60,
									duration: 40,
								}),
								Fade({initial: 1, to: 0, start: 60, duration: 20}),
							]}
						>
							<div>2023 Wrapped</div>
							<Img
								placeholder=""
								className="w-1/2 mx-auto"
								src={staticFile('/logo.png')}
							/>
						</Animated>
						<Animated
							className="text-[3rem] font-bold text-center"
							animations={[
								Fade({initial: 0, to: 1, start: 70}),
								Move({initialY: 0, y: -200, start: 70, duration: 40}),
							]}
						>
							<p style={{opacity: frame < 70 ? 0 : undefined}}>
								Hello, {accountName}!
							</p>
						</Animated>
						<Animated
							className="text-[2rem] font-bold text-center"
							animations={[
								Fade({initial: 0, to: 1, start: 110}),
								Move({initialY: 0, y: -200, start: 110, duration: 40}),
							]}
						>
							<p style={{opacity: frame < 110 ? 0 : undefined}}>What a year!</p>
						</Animated>
					</AbsoluteFill>
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					presentation={wipe()}
					timing={linearTiming({durationInFrames: 30})}
				/>
				<TransitionSeries.Sequence durationInFrames={4 * 60 + 30}>
					<AbsoluteFill className="bg-[#F2B3BD] items-center justify-center ">
						<SongHitText songHitsOnDays={songHitsOnDays} />
						<div className="h-4/5 w-full">
							<SongHitStats2 songHitsOnDays={songHitsOnDays} />
						</div>
					</AbsoluteFill>
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					presentation={wipe({direction: 'from-bottom'})}
					timing={linearTiming({durationInFrames: 20})}
				/>
				<TransitionSeries.Sequence durationInFrames={4 * 60 + 30}>
					<AbsoluteFill className="bg-[#b51403] justify-center items-center text-white fill-white">
						<GenreText />
						<div className="h-5/6 flex items-center">
							<GenreStats
								favoriteGenreTags={favoriteGenreTags}
								favoriteSubjectiveTags={favoriteSubjectiveTags}
							/>
						</div>
					</AbsoluteFill>
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					presentation={wipe({direction: 'from-top-left'})}
					timing={linearTiming({durationInFrames: 20})}
				/>
				<TransitionSeries.Sequence
					durationInFrames={
						(favoriteProducers.length + favoriteVoicebanks.length) * 60 + 30
					}
				>
					<AbsoluteFill className="bg-[#2209c3] flex justify-center text-white">
						<FavoriteArtistsStats
							favoriteProducers={favoriteProducers}
							favoriteVoicebanks={favoriteVoicebanks}
						/>
					</AbsoluteFill>
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					presentation={wipe({direction: 'from-bottom-right'})}
					timing={linearTiming({durationInFrames: 20})}
				/>
				<TransitionSeries.Sequence durationInFrames={5 * 60}>
					<AbsoluteFill className="bg-black text-white flex justify-center">
						<p className="text-6xl">
							User Rank: {userRank}
							<br />
							User Rank Percentage: {userRankPercentage.toFixed(2)}
							<br />
							Thank you text here
						</p>
					</AbsoluteFill>
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</>
	);
};
