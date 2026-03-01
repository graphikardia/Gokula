import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function HorizontalScroll() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"])

  return (
    <section ref={ref} className="h-[300vh] relative">
      <motion.div
        style={{ x }}
        className="sticky top-0 left-0 flex h-screen w-[300vw] items-center"
      >
        <div className="w-screen flex items-center justify-center text-6xl">Strategy</div>
        <div className="w-screen flex items-center justify-center text-6xl">Design</div>
        <div className="w-screen flex items-center justify-center text-6xl">Performance</div>
      </motion.div>
    </section>
  )
}
