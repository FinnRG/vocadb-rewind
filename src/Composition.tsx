import { AbsoluteFill, staticFile, Audio, interpolate } from 'remotion';
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { Logo } from './Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor: zColor(),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	logoColor: propThree,
}) => {
	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={5 * 30}>
				<AbsoluteFill className="bg-gray-100 items-center justify-center">
					<Audio startFrom={60 * 30} volume={(f) => interpolate(f, [0, 30, 5 * 30 - 2 * 30, 5 * 30], [0, 1, 1, 0], { extrapolateLeft: "clamp" })} src={staticFile("/hibikase.mp3")} placeholder="" />
					<div className="m-10" />
					<Logo logoColor={propThree} />
					<div className="m-3" />
					<Title titleText={propOne} titleColor={propTwo} />
					<Subtitle />
				</AbsoluteFill>
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition timing={linearTiming({ durationInFrames: 30 })} />
			<TransitionSeries.Sequence durationInFrames={60}>
				<Audio src={staticFile("/rabbit_hole.mp3")} />
				<AbsoluteFill className='bg-gray-100 items-center justify-center' >
					<Title titleText='Test Slide 2' titleColor='red' />
				</AbsoluteFill>
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
