import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const duration = 2000
    const interval = 20
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const easeProgress = Math.pow(currentStep / steps, 2)
      setProgress(Math.min(Math.round(easeProgress * 100), 100))
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setIsComplete(true)
        setTimeout(onComplete, 600)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute inset-0 bg-[#00F5D4] origin-left"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isComplete ? 0 : 1, y: isComplete ? -20 : 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          initial={{ letterSpacing: "0px" }}
          animate={{ letterSpacing: isComplete ? "48px" : "24px" }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-5xl md:text-7xl font-bold text-white mb-8"
        >
          GEETHA
        </motion.h1>
        
        <div className="w-64 h-[2px] bg-white/20 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-[#00F5D4]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/60 text-sm mt-4 font-mono"
        >
          {progress}%
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: isComplete ? 100 : 0, opacity: isComplete ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-8 text-white/40 text-xs tracking-[0.3em]"
      >
        CREATIVE STUDIO
      </motion.div>
    </motion.div>
  )
}
