import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Explosion} from './Explosion';
import {Move} from './Move';
import {RedHeart} from './RedHeart';
import {Shrinking} from './Shrinking';

export const RedHearts: React.FC<{delay: number}> = ({delay}) => {
	return (
		<Explosion>
			<Move delay={5 + delay}>
				<AbsoluteFill style={{transform: `translateY(-100px)`}}>
					<Shrinking delay={delay}>
						<RedHeart />
					</Shrinking>
				</AbsoluteFill>
			</Move>
		</Explosion>
	);
};
