import { Composition } from 'remotion';
import { MyComposition, myCompSchema } from './Composition';
import './style.css';
import data from "../shiro.json"
import { RewindVideo } from './rewind/Rewind';
import { rewindSchema } from './rewind/schemas';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={240}
				fps={30}
				width={1280}
				height={720}
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion with Tailwind CSS',
					titleColor: '#000000',
					logoColor: '#00bfff',
				}}
			/>
			<Composition
				id="rewind"
				component={RewindVideo}
				durationInFrames={40 * 30}
				fps={30}
				width={750}
				height={1334}
				schema={rewindSchema}
				defaultProps={data} />
		</>
	);
};
