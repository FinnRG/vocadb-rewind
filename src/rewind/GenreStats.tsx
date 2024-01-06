import { RewindSchema } from "./schemas"
import { useCurrentFrame, useVideoConfig } from "remotion"
import { nivoTheme, renderTick } from "./nivo_utils"
import { Bar } from "@nivo/bar"
import { Animated, Fade } from "remotion-animated"

interface GenreStatsProps {
  favoriteGenreTags: RewindSchema["favoriteGenreTags"],
  favoriteSubjectiveTags: RewindSchema["favoriteSubjectiveTags"]
}

export default function GenreStats({ favoriteGenreTags, favoriteSubjectiveTags }: GenreStatsProps) {
  const frame = useCurrentFrame()
  const config = useVideoConfig()

  const baseData = frame > 150 ? favoriteSubjectiveTags : favoriteGenreTags;
  const data = baseData.filter(g => g.item1 !== "Other genres").map(g => ({ id: g.item1, value: g.item2 }))
  data.sort((a, b) => a.value - b.value)

  return <Animated in={30} animations={[Fade({ initial: 0, to: 1, duration: 15, start: 30 })]}>
    <Bar
      data={data}
      theme={nivoTheme}
      height={config.height * 5 / 6}
      width={config.width - 100}
      layout="horizontal"
      label=""
      colors={{ scheme: "nivo" }}
      colorBy="indexValue"
      margin={{
        left: 200,
        bottom: 50
      }}
      enableGridY={false}
      axisLeft={{
        renderTick,
      }}
      axisBottom={{
        renderTick: () => <></>
      }}
      motionConfig="slow"
    />
  </Animated>
}