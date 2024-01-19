import { RewindSchema } from "./schemas"
import { spring, useCurrentFrame, useVideoConfig } from "remotion"
import { nivoTheme, renderTick } from "./nivo_utils"
import { Bar } from "@nivo/bar"
import { Animated, Fade } from "remotion-animated"
import { maxByKey } from "./utils"

interface GenreStatsProps {
  favoriteGenreTags: RewindSchema["favoriteGenreTags"],
  favoriteSubjectiveTags: RewindSchema["favoriteSubjectiveTags"]
}

export default function GenreStats({ favoriteGenreTags, favoriteSubjectiveTags }: GenreStatsProps) {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  const genreMax = maxByKey(favoriteGenreTags, (g) => g.item2) ?? 1
  const subjectiveMax = maxByKey(favoriteSubjectiveTags, g => g.item2) ?? 1

  const baseData = frame > 150 ? favoriteSubjectiveTags : favoriteGenreTags;
  const data = baseData.filter((_, ind) => ind < 6).filter(g => g.item1 !== "Other genres")
    .map((g, ind) => {
      if (frame < 150) {
        return { id: g.item1, value: spring({ fps, frame, durationInFrames: 60, delay: 30, from: 0, to: g.item2, config: { stiffness: 50 } }) }
      }
      const scale = genreMax / subjectiveMax;
      const prev = favoriteGenreTags.length > ind ? favoriteGenreTags[ind].item2 : 0;
      return { id: g.item1, value: spring({ fps, frame, durationInFrames: 90, delay: 150, from: prev, to: g.item2 * scale, config: { stiffness: 50 } }) }
    })


  data.reverse()

  return <Animated in={30} animations={[Fade({ initial: 0, to: 1, duration: 15, start: 30 })]}>
    <Bar
      data={data}
      maxValue={genreMax * 1.2}
      theme={nivoTheme}
      height={height * 5 / 6}
      width={width - 100}
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
      animate={false}
    />
  </Animated>
}