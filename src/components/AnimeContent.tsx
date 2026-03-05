import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import Marquee from "./Marquee"
import ContactForm from "./ContactForm"

const storyData = {
  intro: {
    title: "物語",
    subtitle: "The Legend Begins",
    description: "In the world of digital creation, one warrior rises to master the arts of video, marketing, and creative strategy. This is my story...",
    symbol: "🥷"
  },
  roles: [
    { title: "影武者", english: "Creative Lead", desc: "Master of shadows, weaving brand identities from nothing", tools: ["Brand Identity", "Creative Strategy", "Team Leadership"], symbol: "⚔️" },
    { title: "軍師", english: "Digital Marketer", desc: "Strategic mind that conquers markets with precision", tools: ["Meta Ads", "Google Ads", "SEO", "Analytics"], symbol: "🎯" },
    { title: "剣士", english: "Video Editor", desc: "Blade of motion, cutting chaos into compelling stories", tools: ["Reels", "Promos", "Ad Creatives", "Edits"], symbol: "🎬" },
    { title: "忍", english: "Social Media Manager", desc: "Silent warrior, building armies of loyal followers", tools: ["Content Planning", "Community Mgmt", "Scheduling"], symbol: "📱" },
  ],
  skills: [
    { name: "Premiere Pro", color: "#9999FF", icon: "🎬" },
    { name: "DaVinci", color: "#FF6B6B", icon: "🎞️" },
    { name: "After Effects", color: "#7B68EE", icon: "✨" },
    { name: "Photoshop", color: "#31A8FF", icon: "🖼️" },
    { name: "Illustrator", color: "#FF9A00", icon: "✏️" },
    { name: "Canva", color: "#00C4CC", icon: "🎨" },
    { name: "Figma", color: "#A259FF", icon: "📐" },
    { name: "Meta Ads", color: "#0081FB", icon: "📘" },
    { name: "Google Ads", color: "#34A853", icon: "🔍" },
    { name: "Analytics", color: "#E37400", icon: "📊" },
    { name: "SEO/AEO", color: "#ff6b00", icon: "🚀" },
    { name: "HTML/CSS", color: "#F7DF1E", icon: "💻" },
    { name: "React.js", color: "#61DAFB", icon: "⚛️" },
    { name: "Three.js", color: "#000000", icon: "🌐" },
    { name: "CapCut", color: "#FF0099", icon: "✂️" },
    { name: "Webflow", color: "#4353FF", icon: "🌊" },
  ],
  quests: [
    {
      chapter: "Chapter 1",
      company: "Koshys Group of Institution",
      role: "Social Media Manager",
      period: "Jan 2026 - Present",
      description: "Currently guarding the digital realm of education. Leading a team of content creators and managing the complete digital presence.",
      rewards: ["SEO Mastery", "Content Strategy", "Team Leadership"],
      symbol: "🏫",
      color: "#00d4aa"
    },
    {
      chapter: "Prologue",
      company: "Graphikardia (My Clan)",
      role: "Founder & Leader",
      period: "2024 - Present",
      description: "Founded my own digital marketing clan. Serving healthcare warriors with the power of social media and branding.",
      rewards: ["Leadership", "Brand Strategy", "Growth"],
      symbol: "🏴‍☠️",
      color: "#ff6b00"
    },
    {
      chapter: "Episode 0",
      company: "Altius Multi-speciality Hospital",
      role: "Graphic Designer & Video Editor",
      period: "Oct 2024 - Dec 2025",
      description: "My first mission. Transformed healthcare marketing with compelling visuals that saved lives through awareness.",
      rewards: ["23% Growth", "25% Engagement", "24hr Turnaround"],
      symbol: "🏥",
      color: "#c41e3a"
    },
  ],
  missions: [
    {
      name: "Operation: Healing Hands",
      client: "Altius Multi-speciality Hospital",
      type: "Healthcare Marketing",
      description: "Complete digital transformation. Social media strategy, video content, and performance campaigns that brought patients through the doors.",
      achievements: [
        { value: "23%", label: "Patient Inflow" },
        { value: "25%", label: "Engagement" },
        { value: "24hr", label: "Turnaround" }
      ],
      symbol: "⚕️"
    },
    {
      name: "Operation: Health Heroes",
      client: "Graphikardia Clients",
      type: "Healthcare & Wellness",
      clients: ["Dr. Darshana Reddy", "Dr. Raksha Madhu", "Dr. Mahendra M", "Medella Clinic"],
      description: "Leading digital campaigns for healthcare heroes. Multi-client management with explosive growth results.",
      achievements: [
        { value: "93%", label: "Reach Increase" },
        { value: "212%", label: "Profile Activity" },
        { value: "40%", label: "Unique Reach" }
      ],
      symbol: "🩺"
    },
  ]
}

function JapanesePattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
        <defs>
          <pattern id="wave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q5 0 10 10 T20 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave)"/>
      </svg>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r transparent via-orange-500/30 to-transparent" />
    </div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
      style={{ 
        scaleX,
        background: 'linear-gradient(90deg, #ff6b00, #c41e3a)'
      }}
    />
  )
}

function Section({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  return (
    <section 
      id={id} 
      className="relative py-16 md:py-20"
      style={{ background: 'var(--bg)', ...style }}
    >
      <JapanesePattern />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

function IntroSection() {
  return (
    <Section id="about" className="min-h-[80vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-7xl block mb-6">{storyData.intro.symbol}</span>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-1 mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #ff6b00, transparent)' }}
          />
          
          <h1 className="text-6xl md:text-8xl font-bold mb-2 font-title" style={{ color: '#ff6b00', textShadow: '0 0 40px rgba(255,107,0,0.5)' }}>
            {storyData.intro.title}
          </h1>
          <h2 className="text-2xl md:text-4xl font-display-alt mb-6" style={{ color: 'var(--text)' }}>
            {storyData.intro.subtitle}
          </h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-32 h-1 mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #c41e3a, transparent)' }}
          />
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-body" style={{ color: 'var(--text-secondary)' }}>
            {storyData.intro.description}
          </p>
        </motion.div>
      </div>
    </Section>
  )
}

function RoleChanger() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % storyData.roles.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Section className="min-h-[60vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-8"
        >
          <span className="text-sm uppercase tracking-[0.3em]" style={{ color: '#ff6b00' }}>Choose Your Path</span>
        </motion.div>

        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.span 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-5xl block mb-3"
              >
                {storyData.roles[currentIndex].symbol}
              </motion.span>
              
              <h3 className="text-4xl md:text-5xl font-bold font-title mb-1" style={{ color: '#ff6b00' }}>
                {storyData.roles[currentIndex].title}
              </h3>
              <p className="text-xl mb-2 font-display-alt" style={{ color: 'var(--text)' }}>
                {storyData.roles[currentIndex].english}
              </p>
              <p className="text-sm mb-4 font-body" style={{ color: 'var(--text-secondary)' }}>
                {storyData.roles[currentIndex].desc}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {storyData.roles[currentIndex].tools.map((tool, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-body"
                    style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)', color: '#ff6b00' }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}

function ArsenalSection() {
  return (
    <Section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-sm uppercase tracking-[0.3em]" style={{ color: '#ff6b00' }}>⚔️ Arsenal</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 font-display-alt" style={{ color: 'var(--text)' }}>
            Weapons of Choice
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {storyData.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-lg text-center cursor-pointer"
              style={{ 
                background: 'var(--card-bg)', 
                border: '1px solid var(--card-border)',
              }}
            >
              <div className="text-2xl mb-1">{skill.icon}</div>
              <div className="text-xs font-body truncate" style={{ color: 'var(--text)' }}>{skill.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function QuestLogSection() {
  return (
    <Section id="experience">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-sm uppercase tracking-[0.3em]" style={{ color: '#ff6b00' }}>📜 Quest Log</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 font-display-alt" style={{ color: 'var(--text)' }}>
            The Chronicles
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
          
          {storyData.quests.map((quest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div 
                  className="p-5 rounded-lg ml-12 md:ml-0"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderLeft: `3px solid ${quest.color}` }}
                >
                  <span className="text-xs uppercase tracking-wider" style={{ color: quest.color }}>{quest.chapter}</span>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{quest.symbol}</span>
                    <h3 className="text-lg font-bold font-display-alt" style={{ color: 'var(--text)' }}>{quest.company}</h3>
                  </div>
                  <p className="text-sm font-body" style={{ color: quest.color }}>{quest.role}</p>
                  <p className="text-xs mt-2 font-body" style={{ color: 'var(--text-secondary)' }}>{quest.description}</p>
                  <div className={`flex flex-wrap gap-1 mt-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {quest.rewards.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ background: `${quest.color}15`, color: quest.color }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div 
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
                style={{ background: quest.color, boxShadow: `0 0 10px ${quest.color}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function MissionSection() {
  return (
    <Section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-sm uppercase tracking-[0.3em]" style={{ color: '#ff6b00' }}>⚓ Mission Brief</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 font-display-alt" style={{ color: 'var(--text)' }}>
            Completed Missions
          </h2>
        </motion.div>

        <div className="space-y-6">
          {storyData.missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg overflow-hidden"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
            >
              <div className="grid md:grid-cols-5 gap-0">
                <div 
                  className="md:col-span-2 p-6 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(196,30,58,0.1) 100%)' }}
                >
                  <span className="text-6xl">{mission.symbol}</span>
                </div>
                <div className="md:col-span-3 p-6">
                  <span className="text-xs uppercase tracking-wider" style={{ color: '#ff6b00' }}>{mission.type}</span>
                  <h3 className="text-xl font-bold font-display-alt mt-1 mb-2" style={{ color: 'var(--text)' }}>{mission.name}</h3>
                  <p className="text-sm font-body mb-4" style={{ color: 'var(--text-secondary)' }}>{mission.description}</p>
                  
                  {"clients" in mission && mission.clients && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {mission.clients.map((client: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(255,107,0,0.1)', color: '#ff6b00' }}>
                          {client}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-2">
                    {mission.achievements.map((stat, i) => (
                      <div key={i} className="text-center p-2 rounded" style={{ background: 'var(--bg)' }}>
                        <div className="text-lg font-bold gradient-text">{stat.value}</div>
                        <div className="text-xs font-body" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function CTASection() {
  return (
    <Section id="contact" className="min-h-[60vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <span className="text-6xl block mb-4">🏴‍☠️</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display-alt" style={{ color: 'var(--text)' }}>
            Join the <span className="gradient-text">Alliance</span>
          </h2>
          <p className="text-lg mb-8 font-body" style={{ color: 'var(--text-secondary)' }}>
            Ready to begin your own quest? Let's create something legendary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:graphikardia@gmail.com"
              className="px-8 py-3 font-bold rounded-full font-display-alt text-black"
              style={{ background: 'linear-gradient(135deg, #ff6b00, #ff8c00)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.a>
            <motion.a
              href="tel:+917975594203"
              className="px-8 py-3 rounded-full font-body"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              +91 7975594203
            </motion.a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Navigation() {
  const [activeSection, setActiveSection] = useState('about')
  
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Quests' },
    { id: 'projects', label: 'Missions' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
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
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`} className="group flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full transition-all"
            style={{ 
              backgroundColor: activeSection === section.id ? '#ff6b00' : 'rgba(255,255,255,0.2)',
              boxShadow: activeSection === section.id ? '0 0 8px #ff6b00' : 'none'
            }}
          />
          <span 
            className="text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            style={{ color: activeSection === section.id ? '#ff6b00' : 'var(--text-secondary)' }}
          >
            {section.label}
          </span>
        </a>
      ))}
    </motion.nav>
  )
}

export default function AnimeContent() {
  return (
    <main style={{ position: 'relative', zIndex: 10 }}>
      <ScrollProgress />
      <Navigation />
      <IntroSection />
      <Marquee />
      <RoleChanger />
      <ArsenalSection />
      <QuestLogSection />
      <MissionSection />
      <ContactForm />
      <CTASection />
    </main>
  )
}
