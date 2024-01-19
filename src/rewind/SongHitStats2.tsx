import { interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { RewindSchema } from "./schemas";
import { mean, range } from "d3";
import { dayInYear } from "./utils";
import { useEffect, useState } from "react";

interface SongHitStatsProps {
  songHitsOnDays: RewindSchema["songHitsOnDays"]
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const SongHitStats2: React.FC<SongHitStatsProps> = ({ songHitsOnDays }) => {
  // TODO: Check if these defaults make sense
  const meanHits = mean(songHitsOnDays.map(h => h.count)) ?? 1

  const [cache, setCache] = useState<string[]>([])

  const frame = useCurrentFrame()
  const startFrame = 90;
  const { width, height } = useVideoConfig()

  const rowLength = 14
  const rows = Math.ceil(365 / rowLength)
  const baseHeight = height * 1 / 5
  const itemHeight = Math.floor((height - baseHeight) / (365 / rowLength))

  const baseLeft = (width - itemHeight * rowLength) / 2

  const row = (day: number) => Math.floor(day / rowLength)

  useEffect(() => {
    console.log("Setting cache")
    setCache(
      range(365).map(x => {
        const hitsOnDay = songHitsOnDays.find(h => dayInYear(new Date(h.date)) === x)?.count
        const color = hitsOnDay === undefined ? "gray" : interpolateColors(hitsOnDay / meanHits, [0, 1], ["gray", "green"]);
        return color
      })
    )
  }, [meanHits, songHitsOnDays])

  if (frame < startFrame) return <></>

  return <div className="block">
    {cache.length > 0 && range(364).map(x => {
      const color = cache[x]
      const rowOfX = row(x)
      const colOfX = x - rowLength * rowOfX
      const progr = ((rowOfX * colOfX) / (rows * rowLength)) * 30;
      const scale = interpolate(frame - startFrame - progr, [0, 60], [0, 1], { extrapolateRight: "clamp" })
      return <div
        key={x}
        style={{
          left: baseLeft + colOfX * itemHeight,
          top: baseHeight + rowOfX * itemHeight,
          width: itemHeight - 2,
          height: itemHeight - 2,
          backgroundColor: color,
          opacity: scale,
        }}
        className="absolute" />
    })}
    {months.map((month, index) => {
      const progr = index / 11 * 30;
      const scale = interpolate(frame - startFrame - progr, [0, 60], [0, 1], { extrapolateRight: "clamp" })
      return <div
        key={month}
        style={{
          top: 40 + baseHeight + 2.15 * index * itemHeight,
          left: 25,
          fontSize: 25,
          transform: 'scale(-1) translate(-50%, 50%)',
          writingMode: 'vertical-lr',
          opacity: scale
        }}
        className="absolute">
        {month}
      </div>
    })}
  </div>
}