import {Audio} from 'remotion';
import {RewindSchema, Song} from './schemas';

type Songs = RewindSchema['favoriteSongs'];

interface LikedAudioProps {
	favoriteSongs: Songs;
}

const selectFirstSong = (favoriteSongs: Songs): Song => {
	return favoriteSongs.find(
		(s) => s.pvs.filter((pv) => pv.service === 'Youtube').length > 0
	)!;
};

export default function LikedAudio({favoriteSongs}: LikedAudioProps) {
	const song = selectFirstSong(favoriteSongs);
	const pv = song.pvs.find((pv) => pv.service === 'Youtube')!.pvId;

	return (
		<Audio
			// StartFrom={15 * 60}
			src={`https://invidious.fdn.fr/latest_version?id=${pv}&itag=140`}
		/>
	);
}
