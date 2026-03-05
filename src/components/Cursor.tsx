import { useEffect, useRef, useState } from "react"
import { useSpring, motion } from "framer-motion"

export default function Cursor() {
  const pos = useRef({ x: 0, y: 0 })
  const springX = useSpring(0, { stiffness: 350, damping: 20 })
  const springY = useSpring(0, { stiffness: 350, damping: 20 })
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(!document.body.classList.contains("light"))
    }
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function move(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
      springX.set(e.clientX)
      springY.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [springX, springY])

  if (!isDark) return null

  return (
    <motion.div
      style={{
        translateX: springX,
        translateY: springY
      }}
      className="fixed w-5 h-5 rounded-full bg-[#ff6b00] pointer-events-none z-50 mix-blend-difference"
    />
  )
}
