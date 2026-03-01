import { useEffect, useRef } from "react"
import { useSpring, motion } from "framer-motion"

export default function Cursor() {
  const pos = useRef({ x: 0, y: 0 })
  const springX = useSpring(0, { stiffness: 350, damping: 20 })
  const springY = useSpring(0, { stiffness: 350, damping: 20 })
  const dotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function move(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
      springX.set(e.clientX)
      springY.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [springX, springY])

  return (
    <>
      <motion.div
        ref={dotRef}
        style={{
          translateX: springX,
          translateY: springY
        }}
        className="fixed w-5 h-5 rounded-full bg-accent pointer-events-none z-50 mix-blend-difference"
      />
    </>
  )
}
