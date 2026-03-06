import { motion } from "framer-motion"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { logo: 32, text: "1.25rem" },
  md: { logo: 48, text: "1.5rem" },
  lg: { logo: 72, text: "2rem" },
  xl: { logo: 140, text: "4rem" },
}

export default function AnimatedLogo({ size = "md", showText = true, className = "" }: AnimatedLogoProps) {
  const { logo: logoSize, text: textSize } = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: logoSize, height: logoSize }}>
        <svg
          width={logoSize}
          height={logoSize}
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1493" />
              <stop offset="50%" stopColor="#ff4444" />
              <stop offset="100%" stopColor="#ff1493" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <motion.path
            d="M20 75 L20 25 L45 25 L45 45 L35 45 L35 75"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M55 25 L55 75 L80 75"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
          />
          <motion.circle
            cx="70"
            cy="35"
            r="8"
            fill="url(#logoGrad)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          />
          
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,107,0,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="rgba(255,68,68,0.1)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        
        <motion.div
          className="absolute -inset-3"
          style={{
            border: "1.5px solid rgba(255, 107, 0, 0.4)",
            borderRadius: "50%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -inset-5"
          style={{
            border: "1px solid rgba(255, 68, 68, 0.15)",
            borderRadius: "55%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col"
        >
          <span
            className="font-bold tracking-wider"
            style={{
              fontSize: textSize,
              color: "#f0e6d3",
              letterSpacing: "0.25em",
              lineHeight: 1.2,
            }}
          >
            GOKULA
          </span>
          <span
            style={{
              fontSize: size === "xl" ? "0.6rem" : "0.45rem",
              color: "#ff1493",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-jp)",
              lineHeight: 1.4,
            }}
          >
            ゴクラ
          </span>
        </motion.div>
      )}
    </div>
  )
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff1493" />
            <stop offset="100%" stopColor="#ff4444" />
          </linearGradient>
        </defs>
        <motion.path
          d="M20 75 L20 25 L45 25 L45 45 L35 45 L35 75"
          fill="none"
          stroke="url(#logoGrad2)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M55 25 L55 75 L80 75"
          fill="none"
          stroke="url(#logoGrad2)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="70"
          cy="35"
          r="8"
          fill="url(#logoGrad2)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(255,107,0,0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        <motion.div
          className="absolute -inset-2"
          style={{
            border: "1.5px solid rgba(255, 107, 0, 0.5)",
            borderRadius: "50%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}

export function GKMonogram({ size = 100 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="overflow-visible"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1493" />
          <stop offset="50%" stopColor="#ff4444" />
          <stop offset="100%" stopColor="#ff1493" />
        </linearGradient>
      </defs>

      <motion.path
        d="M20 75 L20 25 L45 25 L45 45 L35 45 L35 75"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
      />
      <motion.path
        d="M55 25 L55 75 L80 75"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
      />
      <motion.circle
        cx="70"
        cy="35"
        r="8"
        fill="url(#logoGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
      />

      <motion.rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="50"
        fill="none"
        stroke="rgba(255, 107, 0, 0.25)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
    </motion.svg>
  )
}
