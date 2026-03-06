import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
  onComplete: () => void
}

function InkSplatter({ delay }: { delay: number }) {
  const shapes = [
    { width: 80, height: 50, x: 5, y: 15 },
    { width: 100, height: 60, x: 65, y: 55 },
    { width: 55, height: 35, x: 75, y: 8 },
    { width: 70, height: 50, x: 3, y: 65 },
    { width: 45, height: 30, x: 45, y: 80 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="absolute inset-0"
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.3, 1],
            opacity: [0, 0.3, 0.2]
          }}
          transition={{ 
            duration: 2.5, 
            delay: delay + i * 0.25,
            ease: "easeOut"
          }}
          style={{
            position: "absolute",
            width: shape.width,
            height: shape.height,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: "rgba(255, 20, 147, 0.2)",
            borderRadius: "65% 35% 70% 30% / 30% 70% 30% 70%",
            filter: "blur(15px)",
          }}
        />
      ))}
    </motion.div>
  )
}

function Lantern({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ 
        opacity: [0, 0.7, 0.5, 0.7, 0.3],
        y: [0, 12, 0, 12, 0],
        x: [0, 5, 0, -5, 0]
      }}
      transition={{ 
        duration: 6, 
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
          height: size * 1.5,
          background: "linear-gradient(180deg, rgba(255,60,20,0.5) 0%, rgba(255,100,40,0.35) 100%)",
          borderRadius: "40% 40% 45% 45%",
          boxShadow: `
            0 0 ${size * 2}px rgba(255,80,30,0.4),
            0 0 ${size * 4}px rgba(255,100,50,0.2),
            inset 0 -${size * 0.25}px rgba(0,0,0,0.3),
            inset 0 ${size * 0.3}px rgba(255,200,150,0.2)
          `,
          border: "1px solid rgba(255,150,100,0.25)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 0.25,
            height: 6,
            background: "rgba(60,30,15,0.9)",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -5,
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 0.2,
            height: 5,
            background: "rgba(60,30,15,0.9)",
            borderRadius: "2px",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "40%",
            background: "radial-gradient(ellipse at center, rgba(255,200,150,0.4) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  )
}

function SakuraPetal({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size] = useState(() => 6 + Math.random() * 10)
  const [startX] = useState(() => Math.random() * 100)
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        x: `${startX}vw`, 
        y: -20,
        rotate: 0,
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        y: [null, window.innerHeight + 50],
        x: [null, `${startX + (Math.random() * 40 - 20)}vw`],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1) * 2],
        opacity: [0, 0.9, 0.6, 0],
        scale: [0, 1, 1, 0.5]
      }}
      transition={{ 
        duration: 15 + Math.random() * 10, 
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        background: `rgba(255, ${150 + Math.random() * 50}, ${180 + Math.random() * 40}, ${0.4 + Math.random() * 0.4})`,
        borderRadius: "50% 0 50% 50%",
        filter: "blur(1px)",
        zIndex: 2,
      }}
    />
  )
}

function FloatingKanji({ char, x, y, delay }: { char: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
      animate={{ 
        opacity: [0, 0.12, 0.06, 0.12, 0],
        scale: [0.3, 1, 1.1, 1, 0.3],
        rotate: [0, 8, -8, 8, 0],
        y: [0, -15, 0, -15, 0]
      }}
      transition={{ 
        duration: 12, 
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: "clamp(4rem, 12vw, 10rem)",
        fontWeight: 300,
        color: "#ff1493",
        fontFamily: "var(--font-jp-serif)",
        pointerEvents: "none",
        textShadow: "0 0 30px rgba(255,107,0,0.3)",
        zIndex: 1,
      }}
    >
      {char}
    </motion.div>
  )
}

function EnsoCircle() {
  return (
    <motion.svg
      className="absolute"
      style={{
        width: 400,
        height: 400,
        opacity: 0.08,
        right: "-10%",
        bottom: "-5%",
      }}
      viewBox="0 0 200 200"
    >
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#ff1493"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M100 10 Q100 100 190 100"
        fill="none"
        stroke="#ff1493"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </motion.svg>
  )
}

function ToriiGate() {
  return (
    <motion.div
      className="absolute"
      style={{
        width: 200,
        height: 120,
        top: "8%",
        left: "8%",
        opacity: 0.06,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      transition={{ delay: 1 }}
    >
      <svg viewBox="0 0 200 120" fill="none">
        <motion.rect
          x="20" y="20" width="12" height="100"
          fill="#ff1493"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.rect
          x="168" y="20" width="12" height="100"
          fill="#ff1493"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.rect
          x="10" y="30" width="180" height="12"
          fill="#ff1493"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        <motion.rect
          x="5" y="50" width="190" height="10"
          fill="#ff1493"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </svg>
    </motion.div>
  )
}

function LogoMark() {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="overflow-visible"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1493" />
          <stop offset="50%" stopColor="#ff4444" />
          <stop offset="100%" stopColor="#ff1493" />
        </linearGradient>
      </defs>
      <motion.path
        d="M25 70 L25 30 L50 30 L50 45 L40 45 L40 70"
        fill="none"
        stroke="url(#preloaderGrad)"
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
        stroke="url(#preloaderGrad)"
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
        fill="url(#preloaderGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, type: "spring" }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="rgba(255,107,0,0.2)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </motion.svg>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isExiting, setIsExiting] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setButtonVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onComplete()
    }, 800)
  }

  const lanterns = [
    { x: "3%", y: "8%", size: 28, delay: 0 },
    { x: "88%", y: "5%", size: 32, delay: 0.8 },
    { x: "75%", y: "45%", size: 22, delay: 1.6 },
    { x: "8%", y: "55%", size: 25, delay: 2.2 },
    { x: "92%", y: "70%", size: 20, delay: 0.4 },
    { x: "45%", y: "3%", size: 18, delay: 1.2 },
  ]

  const kanjiPositions = [
    { char: "創", x: "5%", y: "15%", delay: 0.5 },
    { char: "美", x: "75%", y: "20%", delay: 1.5 },
    { char: "魂", x: "60%", y: "60%", delay: 2.5 },
    { char: "雅", x: "10%", y: "70%", delay: 3 },
    { char: "空", x: "80%", y: "75%", delay: 0.8 },
    { char: "月", x: "40%", y: "65%", delay: 2 },
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
            background: "linear-gradient(180deg, #12081d 0%, #1a0a20 50%, #0d0612 100%)",
          }}
        >
          <ToriiGate />
          <EnsoCircle />
          <InkSplatter delay={0.3} />
          
          {lanterns.map((lantern, i) => (
            <Lantern key={i} {...lantern} />
          ))}

          {[...Array(25)].map((_, i) => (
            <SakuraPetal key={i} delay={i * 0.5} />
          ))}

          {kanjiPositions.map((item, i) => (
            <FloatingKanji key={i} {...item} />
          ))}

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <LogoMark />
            
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{
                fontSize: "clamp(2.2rem, 7vw, 4rem)",
                fontWeight: 700,
                color: "#ffffff",
                marginTop: "1.5rem",
                fontFamily: "'Clash Display', sans-serif",
                lineHeight: 1.2,
                textShadow: "0 0 40px rgba(255,20,147,0.5), 0 0 80px rgba(255,20,147,0.3)",
              }}
            >
              GOKULA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              style={{
                fontSize: "clamp(0.8rem, 2.5vw, 1.1rem)",
                color: "#ff69b4",
                marginTop: "0.8rem",
                letterSpacing: "0.4em",
                fontFamily: "var(--font-jp)",
                lineHeight: 1.6,
                textShadow: "0 0 20px rgba(255,105,180,0.5)",
              }}
            >
              クリエイティブスタジオ
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-center px-8"
            style={{
              position: "absolute",
              bottom: "28%",
              zIndex: 10,
            }}
          >
            <p style={{
              color: "#ff69b4",
              fontSize: "clamp(0.75rem, 2.2vw, 1rem)",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-jp-rounded)",
              lineHeight: 2,
              marginBottom: "1.5rem",
              textShadow: "0 0 15px rgba(255,105,180,0.4)",
              fontWeight: 500,
            }}>
              hover around to see what's hidden ✦
              <br />
              <span style={{ fontSize: "0.75em", opacity: 0.85, color: "#ff1493" }}>
                周りをホバーして隠されたものを探せ
              </span>
            </p>
          </motion.div>

          <motion.button
            onClick={handleEnter}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ 
              opacity: buttonVisible ? 1 : 0,
              y: 0,
              scale: hovered ? 1.08 : 1
            }}
            transition={{ 
              duration: 0.5,
              delay: buttonVisible ? 0 : 0
            }}
            style={{
              position: "absolute",
              bottom: "12%",
              padding: "1.2rem 3.5rem",
              background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
              border: "none",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              cursor: "pointer",
              fontFamily: "var(--font-jp-rounded)",
              overflow: "hidden",
              zIndex: 10,
              borderRadius: "4px",
              boxShadow: "0 4px 30px rgba(255,20,147,0.4), 0 0 60px rgba(255,20,147,0.2)",
            }}
          >
            <motion.span
              animate={{ x: hovered ? 8 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "inline-block" }}
            >
               始めよう START →
            </motion.span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{
              position: "absolute",
              bottom: "8%",
              color: "#ff69b4",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-jp-rounded)",
              lineHeight: 1.8,
              textShadow: "0 0 10px rgba(255,105,180,0.3)",
              fontWeight: 500,
            }}
          >
            スクロールして探索
          </motion.div>

          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{
              width: 900,
              height: 900,
              border: "1px solid rgba(255,20,147,0.08)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <motion.div
            className="absolute"
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{
              width: 700,
              height: 700,
              border: "1px solid rgba(255,105,180,0.1)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <motion.div
            className="absolute"
            animate={{ rotate: 180 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            style={{
              width: 500,
              height: 500,
              border: "1px dashed rgba(255,20,147,0.12)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.2 }}
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(10,6,16,0.6) 100%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
