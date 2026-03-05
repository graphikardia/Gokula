import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const data = {
  name: "Gokula",
  tagline: ["creating", "digital", "experiences", "since", "2022"],
  taglineReveal: ["breaking", "websites", "&", "My Head", "since", "2022"],
  about: "A multidisciplinary creative crafting brand identities, digital experiences, and visual stories that resonate.",
  aboutReveal: "I make things look good. Sometimes I even make them work. Hire me before ChatGPT takes over.",
  whatIDo: [
    { title: "Brand Identity", desc: "Crafting distinctive visual systems that tell your story" },
    { title: "Digital Design", desc: "Building immersive web experiences that convert" },
    { title: "Motion & Video", desc: "Bringing static ideas to life through movement" },
    { title: "Marketing Design", desc: "Strategic creatives that drive real results" },
  ],
  whatIDoReveal: [
    { title: "Brand Identity", desc: "I draw logos and pick colors. Sometimes both match." },
    { title: "Digital Design", desc: "I make buttons and arrange them in grids." },
    { title: "Motion & Video", desc: "I press play and press stop. That's basically editing." },
    { title: "Marketing Design", desc: "I put things in places where people might see them." },
  ],
  experience: [
    { period: "NOW", role: "Creative Lead", company: "Koshys Group" },
    { period: "NOW", role: "Founder & Lead", company: "Graphikardia" },
    { period: "2024", role: "Graphic Designer", company: "Altius Hospital" },
    { period: "2022", role: "Started Journey", company: "Digital Creation" },
  ],
  experienceReveal: [
    { period: "NOW", role: "Creative Lead", company: "Koshys Group" },
    { period: "NOW", role: "Founder & Lead", company: "Graphikardia" },
    { period: "2024", role: "Graphic Designer", company: "Altius Hospital" },
    { period: "2022", role: "Started Journey", company: "Digital Creation" },
  ],
  clients: [
    { name: "Koshys Group", desc: "Leading digital transformation company" },
    { name: "Graphikardia", desc: "Healthcare & wellness branding" },
    { name: "Altius Hospital", desc: "Healthcare marketing & design" },
    { name: "Dr. Darshana Reddy", desc: "Personal brand strategy" },
    { name: "Medella Clinic", desc: "Medical practice branding" },
    { name: "Dr. Mahendra M", desc: "Healthcare digital presence" },
  ],
  clientsReveal: [
    { name: "Koshys Group", desc: "Was it just me? No. But I was there." },
    { name: "Graphikardia", desc: "My baby. Judge the work, not the founder." },
    { name: "Altius Hospital", desc: "They needed a logo. I needed rent." },
    { name: "Dr. Darshana Reddy", desc: "First client. She believed in me." },
    { name: "Medella Clinic", desc: "Small budget, big aspirations" },
    { name: "Dr. Mahendra M", desc: "Still waiting for that review." },
  ],
  testimonials: [
    { quote: "Gokula transformed our brand identity. The results exceeded our expectations.", name: "Sarah Johnson", role: "Marketing Director", company: "Altius Hospital" },
    { quote: "Exceptional creativity and professional execution. Our brand stands out now!", name: "Dr. Darshana Reddy", role: "Founder", company: "Healthcare Practice" },
    { quote: "Incredible work ethic and attention to detail. Made us competitive in the market.", name: "Michael Chen", role: "Business Owner", company: "Medella Clinic" },
  ],
  testimonialsReveal: [
    { quote: "He was okay. I guess that's what matters, right?", name: "Sarah Johnson", role: "Marketing Director", company: "Altius Hospital" },
    { quote: "Took 47 rounds of feedback, but we got there eventually.", name: "Dr. Darshana Reddy", role: "Founder", company: "Healthcare Practice" },
    { quote: "I paid him, so I have to say something nice.", name: "Michael Chen", role: "Business Owner", company: "Medella Clinic" },
  ],
  socials: [
    { label: "Instagram", url: "#", desc: "@gokula_design" },
    { label: "LinkedIn", url: "#", desc: "Connect with me" },
    { label: "Behance", url: "#", desc: "View portfolio" },
    { label: "YouTube", url: "#", desc: "Coming soon" },
  ],
  email: "graphikardia@gmail.com",
  phone: "+91 7975594203"
}

function LogoAnimation() {
  const logoRef = useRef<SVGSVGElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePos({ x, y })
      }
    }
    
    const logo = logoRef.current
    if (logo) {
      logo.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => {
      if (logo) {
        logo.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  const offsetX = (mousePos.x - 50) * 0.3
  const offsetY = (mousePos.y - 50) * 0.3

  return (
    <motion.svg
      ref={logoRef}
      width="32"
      height="32"
      viewBox="0 0 100 100"
      className="overflow-visible cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ cursor: 'pointer' }}
    >
      <motion.g
        animate={{
          x: offsetX,
          y: offsetY
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.path
          d="M20 75 L20 25 L45 25 L45 45 L35 45 L35 75"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M55 25 L55 75 L80 75"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="70"
          cy="35"
          r="8"
          fill="#ff6b00"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: "spring" }}
        />
      </motion.g>
    </motion.svg>
  )
}

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const posRef = useRef({ x: 0, y: 0 })
  const RAFRef = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button')
      setIsHovering(!!isInteractive)
    }

    const animate = () => {
      if (cursorRef.current) {
        const currentX = parseFloat(cursorRef.current.style.transform.replace(/translate\(([^,]+),([^)]+)\)/, '$1'))
        const currentY = parseFloat(cursorRef.current.style.transform.replace(/translate\(([^,]+),([^)]+)\)/, '$2'))
        
        const targetX = posRef.current.x
        const targetY = posRef.current.y
        
        const ease = 0.15
        const newX = currentX + (targetX - currentX) * ease
        const newY = currentY + (targetY - currentY) * ease
        
        cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`
      }
      RAFRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver)
    RAFRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      if (RAFRef.current) cancelAnimationFrame(RAFRef.current)
    }
  }, [])

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: 0,
        top: 0,
        transform: 'translate(-100px, -100px)',
        willChange: 'transform'
      }}
    >
      <div 
        className="rounded-full"
        style={{
          width: isHovering ? 50 : 10,
          height: isHovering ? 50 : 10,
          marginLeft: isHovering ? -25 : -5,
          marginTop: isHovering ? -25 : -5,
          background: '#ff6b00',
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />
    </div>
  )
}

function SakuraBackground() {
  const petals = [
    { size: 8, color: "#ff69b4", duration: 20, delay: 0 },
    { size: 12, color: "#ffb7c5", duration: 28, delay: 2 },
    { size: 6, color: "rgba(255,105,180,0.4)", duration: 22, delay: 4 },
    { size: 10, color: "#ff69b4", duration: 30, delay: 1 },
    { size: 7, color: "#ffb7c5", duration: 25, delay: 3 },
    { size: 14, color: "rgba(255,182,193,0.6)", duration: 35, delay: 5 },
    { size: 5, color: "#ff69b4", duration: 18, delay: 7 },
    { size: 9, color: "#ffc0cb", duration: 26, delay: 2 },
    { size: 11, color: "rgba(255,105,180,0.5)", duration: 32, delay: 4 },
    { size: 6, color: "#ffb7c5", duration: 24, delay: 6 },
    { size: 8, color: "#ff69b4", duration: 21, delay: 8 },
    { size: 13, color: "rgba(255,192,203,0.4)", duration: 33, delay: 1 },
    { size: 7, color: "#ffc0cb", duration: 19, delay: 3 },
    { size: 10, color: "rgba(255,105,180,0.6)", duration: 27, delay: 5 },
    { size: 5, color: "#ffb7c5", duration: 23, delay: 7 },
  ]

  const lanterns = [
    { x: "10%", y: "20%", size: 20, delay: 0 },
    { x: "85%", y: "15%", size: 25, delay: 2 },
    { x: "70%", y: "60%", size: 18, delay: 4 },
    { x: "20%", y: "70%", size: 22, delay: 1 },
  ]

  const kanji = ["創", "美", "魂", "雅", "寂"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
        <defs>
          <pattern id="seigaiha" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="18" fill="none" stroke="#ff69b4" strokeWidth="1"/>
            <circle cx="20" cy="20" r="12" fill="none" stroke="#ff69b4" strokeWidth="1"/>
            <circle cx="20" cy="20" r="6" fill="none" stroke="#ff69b4" strokeWidth="1"/>
          </pattern>
          <pattern id="asanoha" x="0" y="0" width="30" height="52" patternUnits="userSpaceOnUse">
            <path d="M15 0 L30 26 L15 52 L0 26 Z" fill="none" stroke="#ff69b4" strokeWidth="1" opacity="0.5"/>
            <path d="M0 0 L15 26 L30 0" fill="none" stroke="#ff69b4" strokeWidth="1" opacity="0.5"/>
            <path d="M30 52 L15 26 L0 52" fill="none" stroke="#ff69b4" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seigaiha)" />
      </svg>

      {petals.map((petal, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: i % 2 === 0 ? -50 : typeof window !== 'undefined' ? window.innerWidth + 50 : 1200, 
            y: -50,
            rotate: 0,
            scale: 0,
            opacity: 0 
          }}
          animate={{ 
            x: [null, i % 2 === 0 ? typeof window !== 'undefined' ? window.innerWidth + 50 : 1200 : -50],
            y: [null, typeof window !== 'undefined' ? window.innerHeight + 50 : 900],
            rotate: [0, 360, 720, 1080],
            scale: [0, 1, 1, 0],
            opacity: [0, 0.8, 0.6, 0]
          }}
          transition={{ 
            duration: petal.duration, 
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            width: petal.size,
            height: petal.size,
            background: petal.color,
            borderRadius: "50%",
            filter: "blur(1px)",
          }}
        />
      ))}

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`fall-${i}`}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
            y: -30,
            rotate: 0,
            opacity: 0 
          }}
          animate={{ 
            y: [null, typeof window !== 'undefined' ? window.innerHeight + 30 : 900],
            x: [null, Math.random() * 200 - 100 + (typeof window !== 'undefined' ? window.innerWidth : 1200)],
            rotate: [0, 180, 360],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 30 + i * 5, 
            delay: i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            width: 3 + Math.random() * 4,
            height: 6 + Math.random() * 8,
            background: "rgba(255,182,193,0.3)",
            borderRadius: "50%",
          }}
        />
      ))}

      {lanterns.map((lantern, i) => (
        <motion.div
          key={`lantern-${i}`}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.2, 0.3, 0],
            y: [0, 10, 0, 10, 0]
          }}
          transition={{ 
            duration: 4 + i * 0.5, 
            delay: lantern.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            left: lantern.x,
            top: lantern.y,
            width: lantern.size,
            height: lantern.size * 1.5,
            background: "rgba(255, 100, 50, 0.3)",
            borderRadius: "40% 40% 45% 45%",
            boxShadow: `0 0 ${lantern.size}px rgba(255, 100, 50, 0.2)`,
          }}
        />
      ))}

      {kanji.map((char, i) => (
        <motion.div
          key={`kanji-${i}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.08, 0.04, 0.08, 0],
            scale: [0.5, 1, 1, 1, 0.5],
            rotate: [0, 5, -5, 5, 0]
          }}
          transition={{ 
            duration: 15 + i * 2, 
            delay: i * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
            fontSize: "8rem",
            fontWeight: "bold",
            color: "#ff69b4",
            fontFamily: "serif",
            pointerEvents: "none",
          }}
        >
          {char}
        </motion.div>
      ))}

      <motion.div
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: "15vh",
          background: "linear-gradient(to top, rgba(255,105,180,0.1), transparent)",
          filter: "blur(20px)",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

function LayerReveal({ children, reveal, className = "" }: { children: React.ReactNode; reveal: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false })

  useEffect(() => {
    let rafId: number = 0
    let lastTime = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const now = performance.now()
        
        if (now - lastTime > 16) {
          setCursor(prev => ({
            ...prev,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          }))
          lastTime = now
        }
      }
    }
    
    const handleMouseEnter = () => setCursor(prev => ({ ...prev, active: true }))
    const handleMouseLeave = () => setCursor(prev => ({ ...prev, active: false }))

    const element = containerRef.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
      
      <div 
        className="absolute inset-0 z-20"
        style={{
          background: '#ff6b00',
          clipPath: cursor.active 
            ? `circle(100px at ${cursor.x}px ${cursor.y}px)`
            : 'circle(0px at 0 0)',
          transition: 'clip-path 0.4s ease-out'
        }}
      >
        <div className="h-full text-[#0d0d0d]">
          {reveal}
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center" style={{ background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(10px)' }}>
      <a href="#" className="flex items-center gap-2">
        <LogoAnimation />
        <span className="text-lg font-bold tracking-[0.15em]" style={{ color: '#f0e6d3' }}>GK</span>
      </a>
      <nav className="hidden md:flex gap-8">
        {['About', 'Work', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" style={{ color: '#f0e6d3' }}>
            {item}
          </a>
        ))}
      </nav>
      <button className="md:hidden text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
    </header>
  )
}

function Hero() {
  return (
    <LayerReveal 
      reveal={
        <div className="h-full flex flex-col justify-center px-6 md:px-12 min-h-[40vh]">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-center" style={{ color: "rgba(0,0,0,0.5)" }}>Gokula</p>
          <div className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.9] text-center" style={{ color: "#0d0d0d" }}>
            {data.taglineReveal.map((word, i) => (
              <span key={i} className={i === 0 ? "" : "ml-4 md:ml-8"} style={{ color: "#0d0d0d", display: 'inline-block' }}>
                {word}
              </span>
            ))}
          </div>
        </div>
      }
    >
      <section className="min-h-[50vh] flex flex-col justify-center px-6 md:px-12 pt-16 relative">
        <SakuraBackground />
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] mb-6 text-center" style={{ color: "rgba(240,230,211,0.4)" }}>
            {data.name}
          </motion.p>
          <div className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.9] text-center" style={{ color: "#f0e6d3" }}>
            {data.tagline.map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }} className={i === 0 ? "" : "ml-4 md:ml-8"} style={{ color: i === 1 || i === 2 ? "#ff6b00" : "#f0e6d3", display: 'inline-block' }}>
                {word}
              </motion.span>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5 }}
            className="text-xs uppercase tracking-[0.2em] text-center mt-4"
            style={{ color: "rgba(255,107,0,0.6)" }}
          >
            ✦ Hover to reveal the truth ✦
          </motion.p>
        </div>
      </section>
    </LayerReveal>
  )
}

function About() {
  return (
    <LayerReveal
      reveal={
        <section className="px-6 md:px-12 py-20 md:py-32 min-h-[70vh]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(0,0,0,0.5)" }}>About me</p>
            <div className="text-xl md:text-3xl font-bold leading-tight" style={{ color: "#0d0d0d" }}>{data.aboutReveal}</div>
          </div>
        </section>
      }
    >
      <section id="about" className="px-6 md:px-12 py-20 md:py-32 relative">
        <SakuraBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(240,230,211,0.4)" }}>About me</p>
          <div className="text-xl md:text-3xl font-bold leading-tight" style={{ color: "#f0e6d3" }}>
            I'm a <span style={{ color: "#ff6b00" }}>selectively</span> <span style={{ color: "#ff6b00" }}>skilled</span> creative with strong focus on producing high quality & impactful digital experience.
          </div>
        </div>
      </section>
    </LayerReveal>
  )
}

function WhatIDo() {
  return (
    <LayerReveal
      reveal={
        <section className="px-6 md:px-12 py-20 md:py-32 min-h-[70vh]" style={{ background: 'rgba(0,0,0,0.02)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(0,0,0,0.5)" }}>What i do</p>
            <div className="space-y-0">
              {data.whatIDoReveal.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 py-6 border-b border-black/20">
                  <h3 className="text-4xl md:text-6xl font-bold flex-shrink-0" style={{ color: "#0d0d0d", minWidth: "200px" }}>{item.title}</h3>
                  <p className="text-lg md:text-xl max-w-xl" style={{ color: "rgba(0,0,0,0.7)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    >
      <section id="work" className="px-6 md:px-12 py-20 md:py-32 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
        <SakuraBackground />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(240,230,211,0.4)" }}>What i do</p>
          <div className="space-y-0">
            {data.whatIDo.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <h3 className="text-4xl md:text-6xl font-bold flex-shrink-0" style={{ color: "#ff6b00", minWidth: "200px" }}>{item.title}</h3>
                <p className="text-lg md:text-xl max-w-xl" style={{ color: "rgba(240,230,211,0.7)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayerReveal>
  )
}

function Experience() {
  return (
    <LayerReveal
      reveal={
        <section className="px-6 md:px-12 py-20 md:py-32 min-h-[70vh]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>Experience</p>
            <h2 className="text-xl md:text-3xl mb-10" style={{ color: "#0d0d0d" }}>Only four years of actively producing cool shit.</h2>
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(0,0,0,0.5)" }}>History</p>
            <div className="space-y-0">
              {data.experienceReveal.map((exp, index) => (
                <div key={index} className="flex gap-8 py-4 border-b border-black/20">
                  <span className="w-16 flex-shrink-0 text-sm font-bold" style={{ color: "#0d0d0d" }}>{exp.period}</span>
                  <div>
                    <p className="font-bold" style={{ color: "#0d0d0d" }}>{exp.role}</p>
                    <p style={{ color: "rgba(0,0,0,0.5)" }}>{exp.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    >
      <section className="px-6 md:px-12 py-20 md:py-32 relative">
        <SakuraBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(240,230,211,0.4)" }}>Experience</p>
          <h2 className="text-xl md:text-3xl mb-10" style={{ color: "#f0e6d3" }}>Over a decade of experience in interactive design</h2>
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(240,230,211,0.4)" }}>History</p>
          <div className="space-y-0">
            {data.experience.map((exp, index) => (
              <div key={index} className="flex gap-8 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="w-16 flex-shrink-0 text-sm font-bold" style={{ color: "#ff6b00" }}>{exp.period}</span>
                <div>
                  <p className="font-bold" style={{ color: "#f0e6d3" }}>{exp.role}</p>
                  <p style={{ color: "rgba(240,230,211,0.5)" }}>{exp.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayerReveal>
  )
}

function Clients() {
  return (
    <LayerReveal
      reveal={
        <section className="px-6 md:px-12 py-20 md:py-32 min-h-[70vh]" style={{ background: 'rgba(0,0,0,0.02)' }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>Clients</p>
            <h2 className="text-xl md:text-3xl mb-10 max-w-2xl" style={{ color: "#0d0d0d" }}>I was only a small part of a large team.</h2>
            <div className="space-y-8">
              {data.clientsReveal.map((client, index) => (
                <div key={index} className="border-b border-black/20 pb-4">
                  <h3 className="text-3xl md:text-5xl font-bold" style={{ color: "#0d0d0d" }}>{client.name}</h3>
                  <p className="mt-2" style={{ color: "rgba(0,0,0,0.6)" }}>{client.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    >
      <section className="px-6 md:px-12 py-20 md:py-32 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
        <SakuraBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(240,230,211,0.4)" }}>Clients</p>
          <h2 className="text-xl md:text-3xl mb-10 max-w-2xl" style={{ color: "#f0e6d3" }}>
            I worked with some of the most <span style={{ color: "#ff6b00" }}>innovative</span> industry leaders
          </h2>
          <div className="space-y-8">
            {data.clients.map((client, index) => (
              <div key={index} className="border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <h3 className="text-3xl md:text-5xl font-bold" style={{ color: "#f0e6d3" }}>{client.name}</h3>
                <p className="mt-2" style={{ color: "rgba(240,230,211,0.5)" }}>{client.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayerReveal>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setActive((p) => (p + 1) % data.testimonials.length), 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <LayerReveal
      reveal={
        <section className="px-6 md:px-12 py-20 md:py-32 min-h-[70vh]" style={{ background: 'rgba(0,0,0,0.02)' }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(0,0,0,0.5)" }}>WHAT THEY SAID</p>
            <div className="flex gap-2 mb-8">
              {data.testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className="w-3 h-3 rounded-full" style={{ background: active === i ? "#0d0d0d" : "rgba(0,0,0,0.2)" }} />
              ))}
            </div>
            <div className="max-w-2xl">
              <p className="text-2xl md:text-4xl font-bold mb-8 leading-tight" style={{ color: "#0d0d0d" }}>
                "{data.testimonialsReveal[active].quote}"
              </p>
              <div>
                <p className="font-bold" style={{ color: "#0d0d0d" }}>{data.testimonialsReveal[active].name}</p>
                <p style={{ color: "rgba(0,0,0,0.5)" }}>{data.testimonialsReveal[active].role} at {data.testimonialsReveal[active].company}</p>
              </div>
            </div>
          </div>
        </section>
      }
    >
      <section className="px-6 md:px-12 py-20 md:py-32 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
        <SakuraBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(240,230,211,0.4)" }}>WHAT THEY SAID</p>
          <div className="flex gap-2 mb-8 md:order-2">
            {data.testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="w-3 h-3 rounded-full" style={{ background: active === i ? "#ff6b00" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
          <div className="max-w-2xl">
            {data.testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: i === active ? 1 : 0 }} transition={{ duration: 0.3 }} className={i === active ? "block" : "hidden"}>
                <p className="text-2xl md:text-4xl font-bold mb-8 leading-tight" style={{ color: "#f0e6d3" }}>"{t.quote}"</p>
                <div>
                  <p className="font-bold" style={{ color: "#f0e6d3" }}>{t.name}</p>
                  <p style={{ color: "rgba(240,230,211,0.5)" }}>{t.role} at {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LayerReveal>
  )
}

function Motto() {
  return (
    <LayerReveal
      reveal={
        <section className="px-6 md:px-12 py-20 md:py-32 text-center min-h-[60vh]">
          <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "rgba(0,0,0,0.5)" }}>MY MOTTO</p>
          <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-bold leading-tight" style={{ color: "#0d0d0d" }}>Not ALL<br />honest design<br />is good</h2>
        </section>
      }
    >
      <section className="px-6 md:px-12 py-20 md:py-32 text-center relative">
        <SakuraBackground />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "rgba(240,230,211,0.4)" }}>MY MOTTO</p>
          <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-bold leading-tight" style={{ color: "#f0e6d3" }}>
            Good<br /><span style={{ color: "#ff6b00" }}>design</span><br />is honest
          </h2>
          <p className="mt-4" style={{ color: "rgba(240,230,211,0.5)" }}>Dieter Rams</p>
        </div>
      </section>
    </LayerReveal>
  )
}

function Connect() {
  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-32 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
      <SakuraBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(240,230,211,0.4)" }}>Connect</p>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div className="flex flex-col gap-6">
            {data.socials.map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">
                <span className="text-xl font-bold" style={{ color: "#f0e6d3" }}>{social.label}</span>
                <p className="text-base" style={{ color: "rgba(240,230,211,0.5)" }}>{social.desc}</p>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <a href={`mailto:${data.email}`} className="text-xl font-bold hover:text-[#ff6b00] transition-colors" style={{ color: "#f0e6d3" }}>{data.email}</a>
              <p className="text-base" style={{ color: "rgba(240,230,211,0.5)" }}>100% chance I read it</p>
            </div>
            <div>
              <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="text-xl font-bold hover:text-[#ff6b00] transition-colors" style={{ color: "#f0e6d3" }}>{data.phone}</a>
              <p className="text-base" style={{ color: "rgba(240,230,211,0.5)" }}>90% chance I don't pickup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AnimeContent() {
  return (
    <main style={{ background: '#0d0d0d', minHeight: '100vh', color: '#f0e6d3', overflow: 'hidden' }}>
      <Cursor />
      <Header />
      <Hero />
      <About />
      <WhatIDo />
      <Experience />
      <Clients />
      <Testimonials />
      <Motto />
      <Connect />
    </main>
  )
}
