import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Marquee from "./Marquee"
import ContactForm from "./ContactForm"

gsap.registerPlugin(ScrollTrigger)

const roles = [
  { title: "Creative Lead", desc: "Leading creative vision and brand direction", tools: ["Brand Identity", "Creative Strategy", "Team Leadership"] },
  { title: "Digital Marketer", desc: "Data-driven campaigns that deliver results", tools: ["Meta Ads", "Google Ads", "SEO", "Analytics"] },
  { title: "Video Editor", desc: "Compelling visual storytelling that engages", tools: ["Reels", "Promos", "Ad Creatives", "Edits"] },
  { title: "Social Media Manager", desc: "Building and growing engaged communities", tools: ["Content Planning", "Community Mgmt", "Scheduling"] },
]

const skills = [
  { name: "Adobe Premiere Pro", color: "#9999FF" },
  { name: "DaVinci Resolve", color: "#FF6B6B" },
  { name: "After Effects", color: "#7B68EE" },
  { name: "Adobe Photoshop", color: "#31A8FF" },
  { name: "Illustrator", color: "#FF9A00" },
  { name: "Canva", color: "#00C4CC" },
  { name: "Figma", color: "#A259FF" },
  { name: "Meta Business Suite", color: "#0081FB" },
  { name: "Google Ads", color: "#34A853" },
  { name: "Google Analytics", color: "#E37400" },
  { name: "SEO/AEO/GEO", color: "#ff6b00" },
  { name: "HTML/CSS/JS", color: "#F7DF1E" },
  { name: "React.js", color: "#61DAFB" },
  { name: "Three.js", color: "#4353FF" },
  { name: "CapCut", color: "#FF0099" },
  { name: "Webflow", color: "#4353FF" },
]

const experience = [
  {
    company: "Koshys Group of Institution",
    role: "Social Media Manager",
    period: "Jan 2026 - Present",
    location: "Bengaluru, Karnataka",
    description: "Managing complete digital presence including graphic design, video creation, content strategy, SEO/AEO/GEO optimization, and web design optimization.",
    highlights: ["SEO Optimization", "Content Strategy", "Web Design", "Video Production"]
  },
  {
    company: "Graphikardia (Own Startup)",
    role: "Founder & Digital Marketing Lead",
    period: "2024 - Present",
    location: "Remote",
    description: "Full-service digital marketing agency providing social media management, content creation, video production, and brand strategy.",
    highlights: ["Multi-client Management", "Brand Strategy", "Video Production", "Social Growth"]
  },
  {
    company: "Altius Multi-speciality Hospital",
    role: "Graphic Designer & Video Editor",
    period: "Oct 2024 - Dec 2025",
    location: "Bengaluru, Karnataka",
    description: "Spearheaded end-to-end digital marketing and creative strategy. Created high-impact multimedia content.",
    highlights: ["23% Patient Inflow", "25% Engagement", "24hr Turnaround"]
  },
]

const projects = [
  {
    company: "Altius Multi-speciality Hospital",
    category: "Healthcare Marketing",
    description: "Comprehensive digital transformation for a multi-speciality hospital including social media strategy, video content creation, and performance marketing campaigns.",
    stats: [
      { value: "23%", label: "Patient Inflow" },
      { value: "25%", label: "Engagement" },
      { value: "24hr", label: "Turnaround" }
    ]
  },
  {
    company: "Graphikardia Clients",
    category: "Healthcare & Wellness",
    clients: ["Dr. Darshana Reddy", "Dr. Raksha Madhu", "Dr. Mahendra M", "Medella Homoeo Clinic"],
    description: "Full-service digital marketing including social media management, brand strategy, video production, and content creation for healthcare professionals.",
    stats: [
      { value: "93%", label: "Reach Increase" },
      { value: "212%", label: "Profile Activity" },
      { value: "40%", label: "Unique Reach" }
    ]
  },
]

function AnimatedSection({ 
  children, 
  className = "", 
  id,
  threshold = 0.2,
  style
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string;
  threshold?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, threshold, 1 - threshold, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, threshold], [0.9, 1])
  
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, y, scale: smoothScale, ...style }}
      className={`min-h-screen flex items-center justify-center py-20 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f5d4] via-purple-500 to-[#00d4aa] origin-left z-50"
      style={{ scaleX }}
    />
  )
}

function FlippingRoles() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedSection id="about" className="px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-[200px] flex flex-col items-center justify-center"
        >
          <span className="text-[#00f5d4]/70 text-sm uppercase tracking-widest font-body mb-4">My Role</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-3 font-display">
                {roles[currentIndex].title}
              </h2>
              <p className="text-lg mb-5 font-body" style={{ color: 'var(--text-secondary)' }}>{roles[currentIndex].desc}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {roles[currentIndex].tools.map((tool, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4 py-2 rounded-full text-sm font-body glass-card"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function SkillsSection() {
  return (
    <AnimatedSection id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 font-display" style={{ color: 'var(--text)' }}>Skills & Tools</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
              className="p-8 rounded-2xl hover:border-[#00f5d4]/50 transition-colors group cursor-pointer glass-card hover-lift"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: `${skill.color}20` }}
                >
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: skill.color }} />
                </div>
              </motion.div>
              <h3 className="text-lg font-semibold text-center group-hover:text-[#00f5d4] transition-colors font-body" style={{ color: 'var(--text)' }}>{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function ExperienceSection() {
  return (
    <AnimatedSection id="experience" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 font-display" style={{ color: 'var(--text)' }}>Work Experience</h2>
        </motion.div>

        <div className="space-y-8">
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
    </AnimatedSection>
  )
}

function ProjectsSection() {
  return (
    <AnimatedSection id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 font-display" style={{ color: 'var(--text)' }}>Featured Case Studies</h2>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border-gradient"
              style={{ background: 'var(--card-bg)' }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <motion.div 
                  className="aspect-video bg-gradient-to-br from-[#00f5d4]/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00f5d4]/10 to-purple-500/10" />
                  <div className="w-20 h-20 rounded-full border-4 border-[#00f5d4]/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#00f5d4]/20" />
                  </div>
                </motion.div>
                <div className="p-8">
                  <span className="text-[#00f5d4] text-xs uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-4 font-display" style={{ color: 'var(--text)' }}>{project.company}</h3>
                  {"clients" in project && project.clients && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.clients.map((client: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-[#00f5d4]/10 text-[#00f5d4] rounded-full text-sm font-body">
                          {client}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-white/70 mb-6 font-body">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {project.stats.map((stat, i) => (
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
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function CTASection() {
  return (
    <AnimatedSection id="contact" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f5d4]/5 to-transparent" />
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display" style={{ color: 'var(--text)' }}>
            Let's Create Something <span className="gradient-text">Amazing</span> Together
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-body" style={{ color: 'var(--text-secondary)' }}>
            Ready to elevate your brand with compelling content and strategic marketing? 
            Let's connect and bring your vision to life.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function StickyNavigation() {
  const [activeSection, setActiveSection] = useState('intro')
  
  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2
      
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center gap-3"
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-white/20"
            style={{ 
              backgroundColor: activeSection === section.id ? '#00f5d4' : 'rgba(255,255,255,0.2)',
            }}
            whileHover={{ scale: 1.5 }}
          />
          <span 
            className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            style={{ color: activeSection === section.id ? '#00f5d4' : 'var(--text-secondary)' }}
          >
            {section.label}
          </span>
        </a>
      ))}
    </motion.nav>
  )
}

export default function StorytellingContent() {
  return (
    <main style={{ position: 'relative', zIndex: 10 }}>
      <ScrollProgress />
      <StickyNavigation />
      <FlippingRoles />
      <Marquee />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactForm />
      <CTASection />
    </main>
  )
}
