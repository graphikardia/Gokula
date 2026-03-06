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
    { name: "Dr. Mahendra M", desc: "Healthcare digital presence" },
  ],
  clientsReveal: [
    { name: "Koshys Group", desc: "Was it just me? No. But I was there." },
    { name: "Graphikardia", desc: "My baby. Judge the work, not the founder." },
    { name: "Altius Hospital", desc: "They needed a logo. I needed rent." },
    { name: "Dr. Darshana Reddy", desc: "First client. She believed in me." },
    { name: "Dr. Mahendra M", desc: "Still waiting for that review." },
  ],
  testimonials: [
    { quote: "Gokula transformed our brand identity. The results exceeded our expectations.", name: "Sarah Johnson", role: "Marketing Director", company: "Altius Hospital" },
    { quote: "Exceptional creativity and professional execution. Our brand stands out now!", name: "Dr. Darshana Reddy", role: "Founder", company: "Healthcare Practice" },
  ],
  testimonialsReveal: [
    { quote: "He was okay. I guess that's what matters, right?", name: "Sarah Johnson", role: "Marketing Director", company: "Altius Hospital" },
    { quote: "Took 47 rounds of feedback, but we got there eventually.", name: "Dr. Darshana Reddy", role: "Founder", company: "Healthcare Practice" },
  ],
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/geetha-gokula-635780168?utm_source=share_via&utm_content=profile&utm_medium=member_android", desc: "Connect with me" },
    { label: "Instagram", url: "https://www.instagram.com/mr.gk_gokul", desc: "Follow me" },
  ],
  email: "graphikardia@gmail.com",
  phone: "+91 7975594203"
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
    <div ref={containerRef} data-reveal className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
      
      <div 
        className="absolute inset-0 z-20"
        style={{
          background: '#ff1493',
          clipPath: cursor.active 
            ? `circle(120px at ${cursor.x}px ${cursor.y}px)`
            : 'circle(0px at 0 0)',
          transition: 'clip-path 0.15s ease-out'
        }}
      >
        <div className="h-full text-[#0d0d0d]">
          {reveal}
        </div>
      </div>
    </div>
  )
}

function SakuraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
        <defs>
          <pattern id="seigaiha" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#ff1493" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seigaiha)" />
      </svg>
    </div>
  )
}

function Hero() {
  return (
    <LayerReveal 
      reveal={
        <div className="h-full flex flex-col justify-center px-6 md:px-12 min-h-[40vh]">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 text-center" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 2 }}>Gokula</p>
          <div className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.85] text-center" style={{ color: "#0d0d0d" }}>
            {data.taglineReveal.map((word, i) => (
              <span key={i} className={i === 0 ? "" : "ml-4 md:ml-8"} style={{ color: "#0d0d0d", display: 'inline-block', lineHeight: 1.2 }}>
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
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] mb-8 text-center" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>
            {data.name}
          </motion.p>
          <div className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.85] text-center" style={{ color: "#f0e6d3" }}>
            {data.tagline.map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }} className={i === 0 ? "" : "ml-4 md:ml-8"} style={{ color: i === 1 || i === 2 ? "#ff1493" : "#f0e6d3", display: 'inline-block', lineHeight: 1.2 }}>
                {word}
              </motion.span>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5 }}
            className="text-xs uppercase tracking-[0.2em] text-center mt-6"
            style={{ color: "rgba(255,107,0,0.6)", lineHeight: 2 }}
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
            <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 2 }}>About me</p>
            <div className="text-xl md:text-3xl font-bold leading-snug" style={{ color: "#0d0d0d", lineHeight: 1.8 }}>{data.aboutReveal}</div>
          </div>
        </section>
      }
    >
      <section id="about" className="px-6 md:px-12 py-20 md:py-32 relative">
        <SakuraBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>About me</p>
          <div className="text-xl md:text-3xl font-bold leading-snug" style={{ color: "#f0e6d3", lineHeight: 1.8 }}>
            I'm a <span style={{ color: "#ff1493" }}>selectively</span> <span style={{ color: "#ff1493" }}>skilled</span> creative with strong focus on producing high quality & impactful digital experience.
          </div>
        </div>
      </section>
    </LayerReveal>
  )
}

function WhatIDo() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  return (
    <section id="work" className="px-6 md:px-12 py-20 md:py-32 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
      <SakuraBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>What i do</p>
        <div className="space-y-0">
          {data.whatIDo.map((item, index) => (
            <motion.div
              key={index}
              className="relative perspective-1000"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setFlippedIndex(index)}
              onMouseLeave={() => setFlippedIndex(null)}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{
                  rotateX: flippedIndex === index ? 180 : 0,
                  rotateY: flippedIndex === index ? 0 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  transformStyle: "preserve-3d",
                  position: "relative",
                  minHeight: "140px",
                }}
              >
                <div
                  className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 py-8 border-b"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    backfaceVisibility: "hidden",
                    transform: "rotateX(0deg)",
                  }}
                >
                  <h3 className="text-4xl md:text-6xl font-bold flex-shrink-0" style={{ color: "#ff1493", minWidth: "200px", lineHeight: 1.3 }}>{item.title}</h3>
                  <p className="text-lg md:text-xl max-w-xl" style={{ color: "rgba(240,230,211,0.7)", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
                
                <div
                  className="absolute inset-0 flex items-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateX(180deg)",
                    background: "linear-gradient(135deg, rgba(255,20,147,0.2) 0%, rgba(255,20,147,0.1) 100%)",
                    borderRadius: "4px",
                    padding: "2rem",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 w-full">
                    <h3 className="text-3xl md:text-5xl font-bold flex-shrink-0" style={{ color: "#ff1493", minWidth: "200px", lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="text-base md:text-lg max-w-xl" style={{ color: "#f0e6d3", lineHeight: 1.9 }}>
                      {data.whatIDoReveal[index].desc}
                    </p>
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

function Experience() {
  return (
    <LayerReveal
      reveal={
        <section className="px-6 md:px-12 py-20 md:py-32 min-h-[70vh]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 2 }}>Experience</p>
            <h2 className="text-xl md:text-3xl mb-12" style={{ color: "#0d0d0d", lineHeight: 1.8 }}>Only four years of actively producing cool shit.</h2>
            <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 2 }}>History</p>
            <div className="space-y-0">
              {data.experienceReveal.map((exp, index) => (
                <div key={index} className="flex gap-8 py-6 border-b border-black/20">
                  <span className="w-16 flex-shrink-0 text-sm font-bold" style={{ color: "#0d0d0d", lineHeight: 1.5 }}>{exp.period}</span>
                  <div>
                    <p className="font-bold" style={{ color: "#0d0d0d", lineHeight: 1.6 }}>{exp.role}</p>
                    <p style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.8 }}>{exp.company}</p>
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
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>Experience</p>
          <h2 className="text-xl md:text-3xl mb-12" style={{ color: "#f0e6d3", lineHeight: 1.8 }}>Over a decade of experience in interactive design</h2>
          <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>History</p>
          <div className="space-y-0">
            {data.experience.map((exp, index) => (
              <div key={index} className="flex gap-8 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="w-16 flex-shrink-0 text-sm font-bold" style={{ color: "#ff1493", lineHeight: 1.5 }}>{exp.period}</span>
                <div>
                  <p className="font-bold" style={{ color: "#f0e6d3", lineHeight: 1.6 }}>{exp.role}</p>
                  <p style={{ color: "rgba(240,230,211,0.5)", lineHeight: 1.8 }}>{exp.company}</p>
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
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 2 }}>Clients</p>
            <h2 className="text-xl md:text-3xl mb-12 max-w-2xl" style={{ color: "#0d0d0d", lineHeight: 1.8 }}>I was only a small part of a large team.</h2>
            <div className="space-y-10">
              {data.clientsReveal.map((client, index) => (
                <div key={index} className="border-b border-black/20 pb-6">
                  <h3 className="text-2xl md:text-4xl font-bold" style={{ color: "#0d0d0d", lineHeight: 1.4 }}>{client.name}</h3>
                  <p className="mt-2" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.9 }}>{client.desc}</p>
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
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>Clients</p>
          <h2 className="text-xl md:text-3xl mb-12 max-w-2xl" style={{ color: "#f0e6d3", lineHeight: 1.8 }}>
            I worked with some of the most <span style={{ color: "#ff1493" }}>innovative</span> industry leaders
          </h2>
          <div className="space-y-10">
            {data.clients.map((client, index) => (
              <div key={index} className="border-b pb-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <h3 className="text-2xl md:text-4xl font-bold" style={{ color: "#f0e6d3", lineHeight: 1.4 }}>{client.name}</h3>
                <p className="mt-2" style={{ color: "rgba(240,230,211,0.5)", lineHeight: 1.9 }}>{client.desc}</p>
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
            <p className="text-xs uppercase tracking-[0.3em] mb-14" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 2 }}>WHAT THEY SAID</p>
            <div className="flex gap-2 mb-10">
              {data.testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className="w-3 h-3 rounded-full" style={{ background: active === i ? "#0d0d0d" : "rgba(0,0,0,0.2)" }} />
              ))}
            </div>
            <div className="max-w-2xl">
              <p className="text-2xl md:text-4xl font-bold mb-10 leading-snug" style={{ color: "#0d0d0d", lineHeight: 1.8 }}>
                "{data.testimonialsReveal[active].quote}"
              </p>
              <div>
                <p className="font-bold" style={{ color: "#0d0d0d", lineHeight: 1.6 }}>{data.testimonialsReveal[active].name}</p>
                <p style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.8 }}>{data.testimonialsReveal[active].role} at {data.testimonialsReveal[active].company}</p>
              </div>
            </div>
          </div>
        </section>
      }
    >
      <section className="px-6 md:px-12 py-20 md:py-32 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
        <SakuraBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-14" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>WHAT THEY SAID</p>
          <div className="flex gap-2 mb-10 md:order-2">
            {data.testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="w-3 h-3 rounded-full" style={{ background: active === i ? "#ff1493" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
          <div className="max-w-2xl">
            {data.testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: i === active ? 1 : 0 }} transition={{ duration: 0.3 }} className={i === active ? "block" : "hidden"}>
                <p className="text-2xl md:text-4xl font-bold mb-10 leading-snug" style={{ color: "#f0e6d3", lineHeight: 1.8 }}>"{t.quote}"</p>
                <div>
                  <p className="font-bold" style={{ color: "#f0e6d3", lineHeight: 1.6 }}>{t.name}</p>
                  <p style={{ color: "rgba(240,230,211,0.5)", lineHeight: 1.8 }}>{t.role} at {t.company}</p>
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
          <p className="text-xs uppercase tracking-[0.3em] mb-10" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 2 }}>MY MOTTO</p>
          <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-bold leading-tight" style={{ color: "#0d0d0d", lineHeight: 1.4 }}>Not ALL<br />honest design<br />is good</h2>
        </section>
      }
    >
      <section className="px-6 md:px-12 py-20 md:py-32 text-center relative">
        <SakuraBackground />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-10" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>MY MOTTO</p>
          <h2 className="text-[clamp(2.5rem,10vw,5rem)] font-bold leading-tight" style={{ color: "#f0e6d3", lineHeight: 1.4 }}>
            Good<br /><span style={{ color: "#ff1493" }}>design</span><br />is honest
          </h2>
          <p className="mt-6" style={{ color: "rgba(240,230,211,0.5)", lineHeight: 2 }}>Dieter Rams</p>
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
        <p className="text-xs uppercase tracking-[0.3em] mb-14" style={{ color: "rgba(240,230,211,0.4)", lineHeight: 2 }}>Connect</p>
        <div className="grid md:grid-cols-2 gap-14 md:gap-28">
          <div className="flex flex-col gap-8">
            {data.socials.map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">
                <span className="text-xl font-bold" style={{ color: "#f0e6d3", lineHeight: 1.5 }}>{social.label}</span>
                <p className="text-base mt-1" style={{ color: "rgba(240,230,211,0.5)", lineHeight: 1.8 }}>{social.desc}</p>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <a href={`mailto:${data.email}`} className="text-xl font-bold hover:text-[#ff1493] transition-colors" style={{ color: "#f0e6d3", lineHeight: 1.5 }}>{data.email}</a>
              <p className="text-base mt-1" style={{ color: "rgba(240,230,211,0.5)", lineHeight: 1.8 }}>100% chance I read it</p>
            </div>
            <div>
              <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="text-xl font-bold hover:text-[#ff1493] transition-colors" style={{ color: "#f0e6d3", lineHeight: 1.5 }}>{data.phone}</a>
              <p className="text-base mt-1" style={{ color: "rgba(240,230,211,0.5)", lineHeight: 1.8 }}>90% chance I don't pickup</p>
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
