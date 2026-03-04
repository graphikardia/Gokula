import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
  onComplete: () => void
}

function SakuraPetal({ delay, side }: { delay: number; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ 
        x: side === "left" ? -100 : 100, 
        y: -50,
        rotate: 0,
        opacity: 0 
      }}
      animate={{ 
        x: [side === "left" ? -100 : 100, side === "left" ? 100 : -100],
        y: [ -50, 400],
        rotate: [0, 360, 720],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 4, 
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: "absolute",
        top: 0,
        width: 20,
        height: 20,
        background: "radial-gradient(circle, #ffb7c5 0%, #ff69b4 100%)",
        borderRadius: "50% 0 50% 50%",
        transform: "rotate(-45deg)",
      }}
    />
  )
}

function PulsingCircle() {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.5, 1],
        opacity: [0.8, 0.2, 0.8],
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: "50%",
        border: "2px solid #ff69b4",
      }}
    />
  )
}

function JapanesePattern() {
  const lines = Array.from({ length: 8 })
  return (
    <div className="absolute inset-0 overflow-hidden">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: i % 2 === 0 ? -200 : 200 }}
          animate={{ x: i % 2 === 0 ? 200 : -200 }}
          transition={{ 
            duration: 3 + i * 0.3, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 0.2
          }}
          style={{
            position: "absolute",
            top: `${10 + i * 12}%`,
            height: 1,
            width: 400,
            background: "linear-gradient(90deg, transparent, rgba(255,105,180,0.3), transparent)",
          }}
        />
      ))}
    </div>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const duration = 3000
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const easeProgress = Math.pow(currentStep / steps, 1.8)
      setProgress(Math.min(Math.round(easeProgress * 100), 100))
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setIsExiting(true)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#1a0a1a] via-[#0d0510] to-[#050208] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #1a0a1a 0%, #0d0510 50%, #050208 100%)" }}
        >
          <JapanesePattern />
          
          {[...Array(5)].map((_, i) => (
            <SakuraPetal key={i} delay={i * 0.3} side={i % 2 === 0 ? "left" : "right"} />
          ))}

          <div className="relative flex items-center justify-center">
            <PulsingCircle />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff69b4, #ff1493)",
                boxShadow: "0 0 30px rgba(255, 105, 180, 0.6), 0 0 60px rgba(255, 105, 180, 0.3)",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center mt-12"
          >
            <motion.h1
              initial={{ letterSpacing: "0px" }}
              animate={{ letterSpacing: isExiting ? "60px" : "24px" }}
              transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                fontWeight: "bold",
                color: "#fff",
                fontFamily: '"Permanent Marker", cursive',
                textShadow: "0 0 40px rgba(255, 105, 180, 0.5)",
              }}
            >
              GOKULA
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2"
            >
              <span style={{ color: "#ff69b4", fontSize: "0.9rem", letterSpacing: "0.3em" }}>
                御来る
              </span>
            </motion.div>
            
            <div className="mt-8 mx-auto" style={{ width: 200, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #ff69b4, #ffb7c5, #ff69b4)",
                  boxShadow: "0 0 20px rgba(255, 105, 180, 0.5)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "1rem", fontFamily: "monospace" }}
            >
              {progress}%
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isExiting ? 100 : 0, opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-8"
            style={{ color: "rgba(255,105,180,0.4)", fontSize: "0.7rem", letterSpacing: "0.4em" }}
          >
            CREATIVE PORTFOLIO
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute top-6 flex gap-3"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.3, 1],
                  backgroundColor: ["#ff69b4", "#ffb7c5", "#ff69b4"]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                }}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              width: 400,
              height: 400,
              border: "1px solid rgba(255,105,180,0.1)",
              borderRadius: "50%",
            }}
          />
          <motion.div
            className="absolute"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              width: 300,
              height: 300,
              border: "1px solid rgba(255,105,180,0.15)",
              borderRadius: "50%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
