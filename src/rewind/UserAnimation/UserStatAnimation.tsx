import React from 'react';
import {Dots} from './Dots';
import {RedHearts} from './RedHearts';
import {Slowed} from './SlowedTrail';
import {Stars} from './Stars';
import {YellowHearts} from './YellowHearts';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Animated, Fade, Move} from 'remotion-animated';

interface UserStatAnimationProps {
	userRank: number;
	userRankPercentage: number;
}

const Countdown: React.FC<{userRankPercentage: number}> = ({
	userRankPercentage,
}) => {
	const frame = useCurrentFrame() - 130;
	const curr = interpolate(frame, [0, 30], [100, userRankPercentage], {
		extrapolateRight: 'clamp',
	});

	if (frame < 0) return <></>;

	return (
		<div className="absolute text-4xl w-full text-center leading-normal">
			You are in the top
			<br />
			{curr.toFixed(2)}% <br />
			of all editors
		</div>
	);
};

export default function UserStatAnimation({
	userRank,
	userRankPercentage,
}: UserStatAnimationProps) {
	const {height} = useVideoConfig();
	const animationDelay = 160;

	return (
		<>
			<AbsoluteFill
				style={{
					background: 'linear-gradient(to bottom, #000021, #110024)',
				}}
			/>
			<Animated
				className="text-[2rem] font-bold flex justify-center"
				animations={[
					Fade({initial: 0, to: 1}),
					Move({initialY: 0, y: -40, duration: 40}),
					Move({
						initialY: 0,
						y: -height / 6,
						start: 120,
						duration: 40,
					}),
					Fade({initial: 1, to: 0, start: 120, duration: 20}),
				]}
			>
				<p className="w-3/4 text-center">
					VocaDB only exists thanks to the contributions of users like you!
				</p>
			</Animated>
			<Slowed delay={animationDelay}>
				<Dots delay={0} />
				<RedHearts delay={0} />
				<YellowHearts delay={0} />
				<Stars delay={0} />
			</Slowed>
			<Countdown userRankPercentage={userRankPercentage} />
		</>
	);
}
