import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#00F5D4] uppercase tracking-[0.3em] text-sm"
        >
          Creative Studio
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold mt-6 mb-8"
        >
          We Create
          <br />
          <span className="text-[#00F5D4]">Digital Magic</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/60 max-w-2xl mx-auto mb-12"
        >
          Transforming brands through immersive web experiences, 
          innovative design, and cutting-edge technology.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/case-studies"
            className="px-8 py-4 bg-[#00F5D4] text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            View Work
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[#00F5D4] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
