import { motion } from "framer-motion"

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <motion.h1
        initial={{ letterSpacing: "0px", opacity: 0 }}
        animate={{ letterSpacing: "24px", opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-5xl font-bold"
      >
        GEETHA
      </motion.h1>
    </motion.div>
  )
}
