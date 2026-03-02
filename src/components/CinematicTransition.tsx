import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CinematicTransitionProps {
  children: ReactNode
}

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

export default function CinematicTransition({ children }: CinematicTransitionProps) {
  const location = useLocation()
  const [displayedLocation, setDisplayedLocation] = useState(location)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

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
      {showContent && (
        <AnimatePresence mode="wait">
          <motion.div
            key={displayedLocation.pathname}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            {children}
          </motion.div>
          
          {isTransitioning && (
            <>
              <motion.div
                key={`curtain-${displayedLocation.pathname}`}
                variants={curtainVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-0 z-[100] bg-[#00F5D4] origin-bottom pointer-events-none"
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
            </>
          )}
        </AnimatePresence>
      )}
      {!showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      )}
    </TransitionContext.Provider>
  )
}
