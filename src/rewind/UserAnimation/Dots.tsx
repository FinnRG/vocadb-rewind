import React from 'react';
import {Sequence} from 'remotion';
import {Dot} from './Dot';
import {Explosion} from './Explosion';
import {Shrinking} from './Shrinking';
import {Trail} from './Trail';

export const Dots: React.FC<{delay: number}> = ({delay}) => {
	return (
		<Explosion>
			<Trail amount={4} extraOffset={0} delay={delay}>
				<Shrinking delay={delay}>
					<Sequence from={5}>
						<Dot />
					</Sequence>
				</Shrinking>
			</Trail>
		</Explosion>
	);
};
