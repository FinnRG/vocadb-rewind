import { animated, useSpring, useTransition } from "@react-spring/web"
import { spring, useCurrentFrame, useVideoConfig } from "remotion"

export default function GenreText() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = spring({ fps, frame, delay: 150, durationInFrames: 60 })
  const revScale = 1 - scale;

  return <div className="h-1/6 w-3/4 flex flex-col justify-center items-center">
    <div className="grid">

      <animated.div style={{ opacity: revScale, gridRow: 1, gridColumn: 1 }} className="text-6xl font-bold text-center w-full">Genre Tags</animated.div>
      <animated.div style={{ opacity: scale, gridRow: 1, gridColumn: 1 }} className="text-6xl font-bold text-center w-full">Subjective Tags</animated.div>
    </div>
    <p className="mt-1 text-6xl font-bold text-center w-full">Stat Text</p>
  </div>
}