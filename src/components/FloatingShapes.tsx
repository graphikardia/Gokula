import { motion } from "framer-motion"

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.3) 0%, transparent 70%)',
          top: '10%',
          left: '5%'
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          top: '60%',
          right: '-10%'
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="absolute w-40 h-40 rounded-lg opacity-10"
        style={{
          background: 'transparent',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          top: '30%',
          right: '15%'
        }}
        animate={{
          rotate: [0, 180, 360],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-20 h-20 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, transparent 70%)',
          bottom: '20%',
          left: '20%'
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute w-32 h-32 opacity-10"
        style={{
          border: '2px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          top: '45%',
          left: '8%'
        }}
        animate={{
          borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
          y: [0, -25, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: '#00f5d4', top: '20%', left: '30%' }}
        animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -100, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full"
        style={{ background: '#c41e3a', top: '40%', left: '60%' }}
        animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -80, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{ background: '#00d4aa', top: '70%', left: '45%' }}
        animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -60, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  )
}
