import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Explosion} from './Explosion';
import {Shrinking} from './Shrinking';
import {Star} from './Star';
import {Trail} from './Trail';

export const Stars: React.FC<{delay: number}> = ({delay}) => {
	return (
		<AbsoluteFill
			style={{
				rotate: '0.3rad',
			}}
		>
			<Explosion>
				<Trail extraOffset={100} amount={4} delay={delay}>
					<Shrinking delay={delay}>
						<Star />
					</Shrinking>
				</Trail>
			</Explosion>
		</AbsoluteFill>
	);
};
