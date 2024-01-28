import {AbsoluteFill} from 'remotion';
import React from 'react';
import {Explosion} from './Explosion';
import {YellowHeart} from './YellowHeart';
import {Shrinking} from './Shrinking';
import {Move} from './Move';

export const YellowHearts: React.FC<{delay: number}> = ({delay}) => {
	return (
		<AbsoluteFill
			style={{
				rotate: '0.3rad',
			}}
		>
			<Explosion>
				<Move delay={20 + delay}>
					<AbsoluteFill
						style={{
							transform: `translateY(-50px)`,
						}}
					>
						<Shrinking delay={delay}>
							<YellowHeart />
						</Shrinking>
					</AbsoluteFill>
				</Move>
			</Explosion>
		</AbsoluteFill>
	);
};
