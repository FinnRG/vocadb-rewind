import { Calendar } from "@nivo/calendar";
import { Animated, Fade } from "remotion-animated";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { RewindSchema } from "./schemas";
import { nivoTheme } from "./nivo_utils";

interface SongHitStatsProps {
  songHitsOnDays: RewindSchema["songHitsOnDays"]
}

export const SongHitStats: React.FC<SongHitStatsProps> = ({ songHitsOnDays }) => {
  const startFrame = 90;
  const frame = useCurrentFrame()
  const config = useVideoConfig()
  const maxValue = songHitsOnDays.map(s => s.count).sort((a, b) => a - b).reduce((a, b) => a > b ? a : b)

  return <Animated in={startFrame} animations={[Fade({ initial: 0, to: 1, start: startFrame })]}>
    <Calendar
      width={config.width}
      height={config.height * 4 / 5}
      data={songHitsOnDays.map(h => {
        const date = new Date(h.date)
        const res = date.getDate() + 12 * (date.getMonth() + 1);
        const day = interpolate(frame - startFrame, [0, 60], [0, 365], { extrapolateRight: "clamp" })
        if (day > res) {
          return { day: h.date.split("T")[0], value: h.count }
        }

        return { day: h.date, value: 0 };
      })} from="2023-01-01" to="2023-12-31"
      emptyColor="#eeeeee"
      maxValue={maxValue}
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      direction="vertical"
      theme={nivoTheme}
    />
  </Animated>
}