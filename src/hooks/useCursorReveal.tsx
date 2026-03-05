import { useState, useEffect, useRef, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorRevealProps {
  children: ReactNode
  className?: string
}

export function CursorReveal({ children, className = "" }: CursorRevealProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const element = ref.current
    if (element) {
      element.addEventListener("mouseenter", () => setIsHovered(true))
      element.addEventListener("mouseleave", () => setIsHovered(false))
      element.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", () => setIsHovered(true))
        element.removeEventListener("mouseleave", () => setIsHovered(false))
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ cursor: "none" }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,107,0,0.15) 0%, transparent 60%)`
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block ${className}`}
      style={{ cursor: "none" }}
    >
      <AnimatePresence>
        {isInView && (
          <>
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: isHovered ? "0%" : "100%",
                opacity: 1
              }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2 }
              }}
              className="absolute left-0 top-0 text-[#ff6b00]"
              style={{ pointerEvents: "none" }}
            >
              {children}
            </motion.span>
            <motion.span
              initial={{ y: "0%", opacity: 1 }}
              animate={{
                y: isHovered ? "-100%" : "0%",
                opacity: isHovered ? 0 : 1
              }}
              transition={{
                y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2 }
              }}
              className="block"
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
      {!isInView && <span className="opacity-0">{children}</span>}
    </span>
  )
}

interface CursorFollowerProps {
  children: ReactNode
  className?: string
}

export function CursorFollower({ children, className = "" }: CursorFollowerProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const element = ref.current
    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
      element.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none z-50"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              x: "-50%",
              y: "-50%"
            }}
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#ff6b00] opacity-60" />
            <div
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-[#ff6b00] -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function useCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "active">("default")
  const [cursorText, setCursorText] = useState<string | null>(null)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return { cursorType, setCursorType, cursorText, setCursorText, pos }
}
