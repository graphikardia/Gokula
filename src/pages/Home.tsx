import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import WebGLParticles from "../components/WebGLParticles"
import { Link } from "react-router-dom"
import Marquee from "../components/Marquee"
import FloatingShapes from "../components/FloatingShapes"

const roles = [
  { title: "Creative Lead", desc: "Leading creative vision and brand direction", tools: ["Brand Identity", "Creative Strategy", "Team Leadership"] },
  { title: "Digital Marketer", desc: "Data-driven campaigns that deliver results", tools: ["Meta Ads", "Google Ads", "SEO", "Analytics"] },
  { title: "Video Editor", desc: "Compelling visual storytelling that engages", tools: ["Reels", "Promos", "Ad Creatives", "Edits"] },
  { title: "Social Media Manager", desc: "Building and growing engaged communities", tools: ["Content Planning", "Community Mgmt", "Scheduling"] },
  { title: "Brand Strategist", desc: "Crafting memorable brand identities", tools: ["Positioning", "Growth Strategy", "Messaging"] },
  { title: "Graphic Designer", desc: "Visual designs that captivate audiences", tools: ["Logos", "Branding", "Social Posts"] },
]

function FlippingRoles() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[180px] flex flex-col items-center justify-center">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: -20, rotateX: 90 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="text-[#00f5d4]/70 text-sm uppercase tracking-widest font-body">Role</span>
        <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-2 mt-1 font-display">
          {roles[currentIndex].title}
        </h2>
        <p className="text-md mb-4 font-body" style={{ color: 'var(--text-secondary)' }}>{roles[currentIndex].desc}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {roles[currentIndex].tools.map((tool, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-3 py-1 rounded-full text-sm font-body glass-card"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const skills = [
  { name: "Meta Ads", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z", color: "#0081FB" },
  { name: "Google Ads", icon: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", color: "#34A853" },
  { name: "Video Editing", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", color: "#FF6B6B" },
  { name: "Brand Strategy", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", color: "#9B59B6" },
  { name: "Creative Direction", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", color: "#F39C12" },
  { name: "SEO/AEO/GEO", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0118 0z", color: "#00F5D4" },
]

const experience = [
  {
    company: "Koshys Group of Institution",
    role: "Social Media Manager",
    period: "Jan 2026 - Present",
    location: "Bengaluru, Karnataka",
    description: "Managing complete digital presence including graphic design, video creation, content strategy, SEO/AEO/GEO optimization, and web design optimization for educational institution.",
    highlights: ["SEO Optimization", "Content Strategy", "Web Design", "Video Production"]
  },
  {
    company: "Graphikardia (Own Startup)",
    role: "Founder & Digital Marketing Lead",
    period: "2024 - Present",
    location: "Remote",
    description: "Full-service digital marketing agency providing social media management, content creation, video production, and brand strategy for multiple healthcare and lifestyle clients.",
    highlights: ["Multi-client Management", "Brand Strategy", "Video Production", "Social Growth"]
  },
  {
    company: "Altius Multi-speciality Hospital",
    role: "Graphic Designer & Video Editor",
    period: "Oct 2024 - Dec 2025",
    location: "Bengaluru, Karnataka",
    description: "Spearheaded end-to-end digital marketing and creative strategy. Created high-impact multimedia content including reels, WhatsApp Blasts, and Meta/Google Ad assets.",
    highlights: ["23% Patient Inflow", "25% Engagement", "24hr Turnaround"]
  },
  {
    company: "Plutowebs.co",
    role: "Frontend UI/UX Designer & SEO Executive",
    period: "Dec 2023 - Feb 2024",
    location: "Internship",
    description: "Internship role focused on frontend development, user interface design, and search engine optimization.",
    highlights: ["UI/UX Design", "Frontend Dev", "SEO Basics", "Client Projects"]
  }
]

const education = [
  {
    degree: "MBA in Digital Marketing & Business Analytics",
    school: "CMR University",
    period: "2022 - 2024",
    location: "Bengaluru, Karnataka"
  },
  {
    degree: "Bachelor of Commerce (B.Com)",
    school: "CMR University",
    period: "2018 - 2021",
    location: "Bengaluru, Karnataka"
  }
]

const certifications = [
  "Google Digital Marketing Fundamentals",
  "Strategic Management",
  "Financial Marketing & Stock Markets"
]

const awards = [
  "YUVA Summit India Winner",
  "Best Core Organizing Team (RANVITA 2024)",
  "NCC 'C' Certificate Holder"
]

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])
  
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale: smoothScale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f5d4] via-purple-500 to-[#f472b6] origin-left z-50"
      style={{ scaleX }}
    />
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.8])
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <WebGLParticles />
      <motion.div 
        className="text-center max-w-5xl relative z-10"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
          <span className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Available for Projects</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <img 
            src="https://lookaside.fbsbx.com/lookaside/crawler/instagram/graphikardia/profile_pic.jpg" 
            alt="Graphikardia Logo" 
            className="w-24 h-24 mx-auto rounded-2xl object-cover"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold font-display"
          style={{ color: 'var(--text)' }}
        >
          Hi, I'm <span className="gradient-text">Gokula</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 mt-6"
        >
          <FlippingRoles />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl max-w-2xl mx-auto mb-10 font-body"
          style={{ color: 'var(--text-secondary)' }}
        >
          Founder of <a href="https://www.graphikardia.com/" target="_blank" rel="noopener noreferrer" className="text-[#00f5d4] font-semibold hover:underline">Graphikardia</a> — Crafting digital experiences that convert. Specializing in video production, social media growth, and strategic brand elevation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            to="/case-studies"
            className="px-8 py-4 bg-[#00f5d4] text-black font-bold rounded-full hover:scale-105 transition-transform hover-lift glow-effect"
          >
            View My Work
          </Link>
          <a
            href="mailto:graphikardia@gmail.com"
            className="px-8 py-4 glass-card rounded-full hover:bg-white/10 transition-colors font-body"
            style={{ color: 'var(--text)' }}
          >
            Let's Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-8"
        >
          <a href="mailto:graphikardia@gmail.com" style={{ color: 'var(--text-muted)' }} className="hover:text-[#00f5d4] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a href="tel:+917975594203" style={{ color: 'var(--text-muted)' }} className="hover:text-[#00f5d4] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/geetha-gokula-p" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} className="hover:text-[#00f5d4] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://instagram.com/graphikardia" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} className="hover:text-[#00f5d4] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[#00f5d4] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="py-32 px-6 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 font-display" style={{ color: 'var(--text)' }}>Skills & Tools</h2>
          <p className="text-lg max-w-2xl font-body" style={{ color: 'var(--text-secondary)' }}>
            Technologies and platforms I use to bring creative visions to life.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="p-6 rounded-2xl hover:border-[#00f5d4]/50 transition-colors group cursor-pointer glass-card hover-lift"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${skill.color}20` }}
                >
                  <svg className="w-6 h-6" fill={skill.color} viewBox="0 0 24 24">
                    <path d={skill.icon} />
                  </svg>
                </div>
              </motion.div>
              <h3 className="text-lg font-semibold group-hover:text-[#00f5d4] transition-colors font-body" style={{ color: 'var(--text)' }}>{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="py-32 px-6 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 font-display" style={{ color: 'var(--text)' }}>Work Experience</h2>
          <p className="text-lg max-w-2xl font-body" style={{ color: 'var(--text-secondary)' }}>
            Professional journey through roles that shaped my expertise.
          </p>
        </AnimatedSection>

        <div className="mt-16 space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.12, 
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative pl-8 border-l-2 border-[#00f5d4]/30"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.5)]" />
                <div className="rounded-2xl p-8 hover:border-[#00f5d4]/30 transition-colors glass-card hover-lift" style={{ border: '1px solid var(--glass-border)' }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text)' }}>{exp.company}</h3>
                      <p className="text-[#00f5d4] font-body">{exp.role}</p>
                    </div>
                    <div className="text-right text-sm mt-2 md:mt-0 font-body" style={{ color: 'var(--text-secondary)' }}>
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <p className="mb-4 font-body" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h, i) => (
                      <motion.span 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.12) + (i * 0.05) }}
                        className="px-3 py-1 bg-[#00f5d4]/10 text-[#00f5d4] rounded-full text-sm font-body"
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section className="py-32 px-6 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 font-display" style={{ color: 'var(--text)' }}>Featured Case Studies</h2>
          <p className="text-lg max-w-2xl font-body" style={{ color: 'var(--text-secondary)' }}>
            Detailed projects showcasing measurable results and creative excellence.
          </p>
        </AnimatedSection>

        <div className="mt-16 space-y-16">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden border-gradient"
              style={{ background: 'var(--card-bg)' }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <motion.div 
                  className="aspect-video bg-gradient-to-br from-[#00f5d4]/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src="https://qanomed.com/img/hospitals/altius-sripada-hospitals-hbr-layout/1.png" 
                    alt="Altius Sripada Hospitals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00f5d4]/10 to-purple-500/10" />
                </motion.div>
                <div className="p-8">
                  <span className="text-[#00f5d4] text-xs uppercase tracking-wider">Healthcare Marketing</span>
                  <h3 className="text-2xl font-bold mt-2 mb-4 font-display">Altius Multi-speciality Hospital</h3>
                  <p className="text-white/70 mb-6 font-body">
                    Comprehensive digital transformation for a multi-speciality hospital including social media strategy, 
                    video content creation, and performance marketing campaigns.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { value: "23%", label: "Patient Inflow" },
                      { value: "25%", label: "Engagement" },
                      { value: "24hr", label: "Turnaround" }
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="text-center p-4 rounded-xl cursor-default glass-card"
                      >
                        <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                        <div className="text-xs font-body" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 text-[#00f5d4] hover:gap-4 transition-all font-body"
                  >
                    View Full Case Study <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden border-gradient"
              style={{ background: 'var(--card-bg)' }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <motion.div 
                  className="aspect-video bg-gradient-to-br from-blue-500/20 via-pink-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10" />
                  <svg className="w-20 h-20 text-pink-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.div>
                <div className="p-8">
                  <span className="text-[#00f5d4] text-xs uppercase tracking-wider">Social Media Growth</span>
                  <h3 className="text-2xl font-bold mt-2 mb-4 font-display">Graphikardia - Multiple Clients</h3>
                  <p className="text-white/70 mb-6 font-body">
                    Digital marketing agency serving various clients including Medella Homoeo Clinic, 
                    Dr. Darshana (Your Lifestyle Doctor), Dr. Raksha Madhu, and more healthcare professionals.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { value: "93%", label: "Reach Increase" },
                      { value: "212%", label: "Profile Activity" },
                      { value: "40%", label: "Unique Reach" }
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="text-center p-4 rounded-xl cursor-default glass-card"
                      >
                        <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                        <div className="text-xs font-body" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 text-[#00f5d4] hover:gap-4 transition-all font-body"
                  >
                    View Full Case Study <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/case-studies"
            className="inline-block px-8 py-4 border border-[#00f5d4] text-[#00f5d4] rounded-full hover:bg-[#00f5d4] hover:text-black transition-colors font-body"
          >
            View All Case Studies
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section className="py-32 px-6 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Background</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 font-display" style={{ color: 'var(--text)' }}>Education</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="p-8 rounded-2xl cursor-pointer glass-card hover-lift"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-[#00f5d4]/10 rounded-xl flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-[#00f5d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold font-display" style={{ color: 'var(--text)' }}>{edu.degree}</h3>
                  <p className="font-body" style={{ color: 'var(--text-secondary)' }}>{edu.school}</p>
                </div>
              </div>
              <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>{edu.period} • {edu.location}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <AnimatedSection>
            <h3 className="text-xl font-bold mb-6 font-display" style={{ color: 'var(--text)' }}>Certifications</h3>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 font-body"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <motion.span 
                    whileHover={{ scale: 1.5 }}
                    className="w-2 h-2 bg-[#00f5d4] rounded-full" 
                  />
                  {cert}
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection>
            <h3 className="text-xl font-bold mb-6 font-display" style={{ color: 'var(--text)' }}>Awards & Honors</h3>
            <ul className="space-y-3">
              {awards.map((award, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 font-body"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <motion.span 
                    whileHover={{ scale: 1.5 }}
                    className="w-2 h-2 bg-gradient-to-r from-[#00f5d4] to-purple-500 rounded-full" 
                  />
                  {award}
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-32 px-6 overflow-hidden relative" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f5d4]/5 to-transparent" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 font-display"
            style={{ color: 'var(--text)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Let's Create Something <span className="gradient-text">Amazing</span> Together
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto font-body"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Ready to elevate your brand with compelling content and strategic marketing? 
            Let's connect and bring your vision to life.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.a
              href="mailto:graphikardia@gmail.com"
              className="px-8 py-4 bg-[#00f5d4] text-black font-bold rounded-full hover-lift glow-effect font-body"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 245, 212, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="tel:+917975594203"
              className="px-8 py-4 glass-card rounded-full hover:bg-white/10 transition-colors font-body"
              style={{ color: 'var(--text)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              +91 7975594203
            </motion.a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <FloatingShapes />
      <ScrollProgress />
      <Hero />
      <Marquee />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CTASection />
    </main>
  )
}
