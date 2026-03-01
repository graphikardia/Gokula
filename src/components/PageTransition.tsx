import { motion } from "framer-motion"
import { motionVariants } from "../lib/motion"

export default function PageTransition({ children }: any) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        exit: { opacity: 0, y: -40, transition: { duration: 0.6 } }
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
