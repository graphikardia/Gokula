import { motion, AnimatePresence } from "framer-motion"
import { useLocation, useOutlet } from "react-router-dom"
import { createContext, useContext, useState, useEffect } from "react"

const TransitionContext = createContext<{
  isTransitioning: boolean
  setIsTransitioning: (v: boolean) => void
}>({ isTransitioning: false, setIsTransitioning: () => {} })

export const useTransition = () => useContext(TransitionContext)

const curtainVariants = {
  initial: { scaleY: 1 },
  animate: { 
    scaleY: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const contentVariants = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.9, 
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -40,
    transition: { duration: 0.5 }
  }
}

export default function CinematicTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const [displayedLocation, setDisplayedLocation] = useState(location)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (location.pathname !== displayedLocation.pathname) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setDisplayedLocation(location)
        setIsTransitioning(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [location, displayedLocation.pathname])

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedLocation.pathname}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          {outlet}
        </motion.div>
        
        <motion.div
          key={`curtain-${displayedLocation.pathname}`}
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[100] bg-[#00F5D4] origin-bottom pointer-events-none"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          }}
        />
        
        <motion.div
          key={`curtain-2-${displayedLocation.pathname}`}
          variants={{
            initial: { scaleY: 1 },
            animate: { 
              scaleY: 0,
              transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
            },
            exit: { 
              scaleY: 1,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[99] bg-black origin-bottom pointer-events-none"
        />
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
