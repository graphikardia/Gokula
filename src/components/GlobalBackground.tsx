import { useEffect, useState } from "react"

export default function GlobalBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 -z-50 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(255,20,147,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(196,30,58,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #0a0610 0%, #0d0612 50%, #0a0610 100%)
          `,
        }}
      />
    )
  }

  return (
    <div 
      className="fixed inset-0 -z-50 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(255,20,147,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(196,30,58,0.04) 0%, transparent 50%),
          linear-gradient(180deg, #0a0610 0%, #0d0612 50%, #0a0610 100%)
        `,
      }}
    >
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,20,147,0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,105,180,0.05) 0%, transparent 50%)
          `,
          animation: "bgPulse 8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes bgPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
