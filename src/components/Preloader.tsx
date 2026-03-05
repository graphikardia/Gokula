import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
  onComplete: () => void
}

function InkSplatter({ delay }: { delay: number }) {
  const shapes = [
    { width: 60, height: 40, x: 10, y: 20 },
    { width: 80, height: 50, x: 70, y: 60 },
    { width: 45, height: 30, x: 80, y: 10 },
    { width: 55, height: 45, x: 5, y: 70 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="absolute"
      style={{
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 0.3, 0.2]
          }}
          transition={{ 
            duration: 2, 
            delay: delay + i * 0.3,
            ease: "easeOut"
          }}
          style={{
            position: "absolute",
            width: shape.width,
            height: shape.height,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: "rgba(255, 107, 0, 0.15)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(8px)",
          }}
        />
      ))}
    </motion.div>
  )
}

function Lantern({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: [0, 0.6, 0.4, 0.6, 0],
        y: [0, 8, 0, 8, 0]
      }}
      transition={{ 
        duration: 5, 
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: size,
          height: size * 1.6,
          background: "linear-gradient(180deg, rgba(255,80,30,0.4) 0%, rgba(255,120,50,0.3) 100%)",
          borderRadius: "40% 40% 45% 45%",
          boxShadow: `0 0 ${size * 1.5}px rgba(255,100,50,0.3), inset 0 -${size * 0.3}px rgba(0,0,0,0.2)`,
          border: "1px solid rgba(255,150,100,0.2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 0.3,
            height: 8,
            background: "rgba(80,40,20,0.8)",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 0.25,
            height: 6,
            background: "rgba(80,40,20,0.8)",
            borderRadius: "2px",
          }}
        />
      </div>
    </motion.div>
  )
}

function FallingPetal({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ 
        x: -20, 
        y: -20,
        rotate: 0,
        opacity: 0 
      }}
      animate={{ 
        x: [null, 100, 200],
        y: [null, 400, 500],
        rotate: [0, 360, 720],
        opacity: [0, 0.8, 0]
      }}
      transition={{ 
        duration: 12 + Math.random() * 8, 
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: "absolute",
        width: 8 + Math.random() * 6,
        height: 8 + Math.random() * 6,
        background: "rgba(255, 150, 180, 0.6)",
        borderRadius: "50%",
        filter: "blur(1px)",
        zIndex: 2,
      }}
    />
  )
}

function BrushStroke() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ opacity: 0.1 }}
    >
      <motion.path
        d="M0,100 Q200,80 400,150 T800,100 T1200,120"
        fill="none"
        stroke="#ff6b00"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,300 Q300,280 600,320 T1200,300"
        fill="none"
        stroke="#ff6b00"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,500 Q400,480 800,520 T1200,500"
        fill="none"
        stroke="#ff6b00"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
      />
    </svg>
  )
}

function LogoMark() {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="overflow-visible"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.path
        d="M25 70 L25 30 L50 30 L50 45 L40 45 L40 70"
        fill="none"
        stroke="#ff6b00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M55 30 L55 70 L80 70"
        fill="none"
        stroke="#ff6b00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
      />
      <motion.circle
        cx="70"
        cy="40"
        r="8"
        fill="#ff6b00"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, type: "spring" }}
      />
      <motion.path
        d="M15 85 L85 85"
        stroke="#ff6b00"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      />
    </motion.svg>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isReady, setIsReady] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onComplete()
    }, 800)
  }

  const lanterns = [
    { x: "5%", y: "10%", size: 25, delay: 0 },
    { x: "80%", y: "8%", size: 30, delay: 1 },
    { x: "60%", y: "50%", size: 20, delay: 2 },
    { x: "15%", y: "60%", size: 22, delay: 0.5 },
    { x: "85%", y: "70%", size: 18, delay: 1.5 },
  ]

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ 
            background: "#0a0a0a",
          }}
        >
          <BrushStroke />
          <InkSplatter delay={0.2} />
          
          {lanterns.map((lantern, i) => (
            <Lantern key={i} {...lantern} />
          ))}

          {[...Array(15)].map((_, i) => (
            <FallingPetal key={i} delay={i * 0.8} />
          ))}

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <LogoMark />
            
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                fontWeight: 300,
                color: "#f0e6d3",
                marginTop: "1.5rem",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              GOKULA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{
                fontSize: "0.75rem",
                color: "#ff6b00",
                marginTop: "0.5rem",
                letterSpacing: "0.4em",
                fontFamily: "monospace",
              }}
            >
              クリエイティブ
            </motion.p>
          </motion.div>

          <motion.button
            onClick={handleEnter}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isReady ? 1 : 0,
              y: 0,
              scale: hovered ? 1.05 : 1
            }}
            transition={{ 
              duration: 0.5,
              delay: isReady ? 0 : 2
            }}
            style={{
              position: "absolute",
              bottom: "15%",
              padding: "1rem 3rem",
              background: "transparent",
              border: "1px solid #ff6b00",
              color: "#ff6b00",
              fontSize: "0.9rem",
              letterSpacing: "0.3em",
              cursor: "pointer",
              fontFamily: "monospace",
              overflow: "hidden",
              zIndex: 10,
            }}
          >
            <motion.span
              animate={{ x: hovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ENTER →
            </motion.span>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: hovered ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255,107,0,0.1)",
                zIndex: -1,
              }}
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              position: "absolute",
              bottom: "8%",
              color: "rgba(255,107,0,0.4)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              fontFamily: "monospace",
            }}
          >
            SCROLL TO EXPLORE
          </motion.div>

          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{
              width: 800,
              height: 800,
              border: "1px solid rgba(255,107,0,0.05)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <motion.div
            className="absolute"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{
              width: 600,
              height: 600,
              border: "1px solid rgba(255,107,0,0.08)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.5) 100%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
