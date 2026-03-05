import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ScrollPath() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const d = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="h-[200vh] flex items-center justify-center">
      <svg width="200" height="800" viewBox="0 0 200 800">
        <motion.path
          d="M100 0 C140 200 60 400 100 800"
          stroke="#ff6b00"
          strokeWidth={3}
          fill="none"
          style={{ pathLength: d }}
        />
      </svg>
    </div>
  )
}
