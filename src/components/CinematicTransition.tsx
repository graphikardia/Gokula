import { motion } from "framer-motion"
import { ReactNode } from "react"

interface CinematicTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { 
      duration: 0.4 
    }
  }
}

export default function CinematicTransition({ children }: CinematicTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
