import { Animated, Fade } from "remotion-animated";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { RewindSchema } from "./schemas";

interface SongHitStatsProps {
  songHitsOnDays: RewindSchema["songHitsOnDays"]
}

export const SongHitStats: React.FC<SongHitStatsProps> = ({ songHitsOnDays }) => {
  const startFrame = 90;
  const frame = useCurrentFrame()
  const config = useVideoConfig()
  const maxValue = songHitsOnDays.map(s => s.count).sort((a, b) => a - b).reduce((a, b) => a > b ? a : b)

  return <></>
}