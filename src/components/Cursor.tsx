import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringReveal, setIsHoveringReveal] = useState(false)
  
  const springConfig = { stiffness: 500, damping: 28 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleRevealEnter = () => setIsHoveringReveal(true)
    const handleRevealLeave = () => setIsHoveringReveal(false)

    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.addEventListener('mouseenter', handleRevealEnter)
      el.addEventListener('mouseleave', handleRevealLeave)
    })

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.removeEventListener('mouseenter', handleRevealEnter)
        el.removeEventListener('mouseleave', handleRevealLeave)
      })
    }
  }, [x, y, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      ref={cursorRef}
      style={{
        translateX: x,
        translateY: y,
        x: "-50%",
        y: "-50%",
        zIndex: 99999
      }}
      className="fixed top-0 left-0 pointer-events-none mix-blend-difference bg-[#ff1493]"
      animate={{
        width: isHoveringReveal ? 80 : 19,
        height: isHoveringReveal ? 80 : 19,
        borderRadius: "50%"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}
