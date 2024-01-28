import {Animated, Fade} from 'remotion-animated';
import {RewindSchema} from './schemas';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface SongHitTextProps {
	songHitsOnDays: RewindSchema['songHitsOnDays'];
}

export default function SongHitText({songHitsOnDays}: SongHitTextProps) {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const count = songHitsOnDays
		.map((s) => s.count)
		.reduce((prev, curr) => prev + curr, 0);
	const days = songHitsOnDays.length;

	const interpolatedCount = interpolate(frame - 30, [0, 60], [0, count], {
		extrapolateRight: 'clamp',
	});
	const interpolatedDays = interpolate(frame - 30, [0, 60], [0, days], {
		extrapolateRight: 'clamp',
	});

	const scale = spring({
		fps,
		frame,
		delay: 90,
		durationInFrames: 60,
		config: {stiffness: 50, overshootClamping: true, damping: 20},
	});
	const scale2 = interpolate(scale, [0, 1], [500, 0]);

	return (
		<Animated
			in={30}
			className="flex justify-center "
			animations={[Fade({initial: 0, to: 1, start: 30})]}
		>
			<p
				style={{transform: `translateY(${scale2}px)`}}
				className="text-6xl font-bold text-center w-4/5 leading-snug"
			>
				You've looked at {interpolatedCount.toFixed(0)} song entries on{' '}
				{interpolatedDays.toFixed(0)} days{' '}
			</p>
		</Animated>
	);
}
