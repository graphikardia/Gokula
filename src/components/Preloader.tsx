import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const duration = 2500
    const interval = 25
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const easeProgress = Math.pow(currentStep / steps, 1.5)
      setProgress(Math.min(Math.round(easeProgress * 100), 100))
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setIsExiting(true)
        setTimeout(() => {
          onComplete()
        }, 800)
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
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-[#00F5D4] via-[#8b5cf6] to-[#f472b6] origin-left"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 text-center"
          >
            <motion.h1
              initial={{ letterSpacing: "0px" }}
              animate={{ letterSpacing: isExiting ? "48px" : "20px" }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: '"Permanent Marker", cursive' }}
            >
              GOKULA
            </motion.h1>
            
            <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00F5D4] to-[#8b5cf6]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-sm font-mono"
            >
              {progress}%
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isExiting ? 100 : 0, opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-8 text-white/30 text-xs tracking-[0.3em] font-body"
          >
            CREATIVE PORTFOLIO
          </motion.div>

          <motion.div
            className="absolute top-4 right-4 flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-2 h-2 bg-[#00F5D4] rounded-full animate-pulse" />
            <span className="w-2 h-2 bg-[#8b5cf6] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 bg-[#f472b6] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
