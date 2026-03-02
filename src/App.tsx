import { useEffect, useRef, useState, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Float, Preload } from "@react-three/drei"
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Altius Hospital",
    category: "Healthcare Marketing",
    metric: "23%",
    metricLabel: "Patient Inflow",
    color: "#00F5D4",
    description: "Complete digital transformation for a multi-speciality hospital"
  },
  {
    title: "Graphikardia",
    category: "Social Media Growth",
    metric: "93%",
    metricLabel: "Reach Increase",
    color: "#8B5CF6",
    description: "Digital marketing agency serving healthcare professionals"
  },
  {
    title: "Medella Homoeo",
    category: "Brand Strategy",
    metric: "40%",
    metricLabel: "Unique Reach",
    color: "#F472B6",
    description: "Brand identity and social media presence"
  },
  {
    title: "Koshys Group",
    category: "Educational Institution",
    metric: "2.5M+",
    metricLabel: "Total Views",
    color: "#FBBF24",
    description: "Full digital presence management"
  }
]

const skills = [
  "Digital Marketing", "Brand Strategy", "Video Editing", 
  "Social Media", "SEO/AEO/GEO", "Creative Direction"
]

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const count = 2000
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20
      pos[i + 1] = (Math.random() - 0.5) * 20
      pos[i + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00F5D4"
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingShapes() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={[3, 2, -3]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={ringRef} position={[-4, -2, -5]}>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00F5D4" transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  )
}

function Hero3D({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <ParticleField />
      <FloatingShapes />
      <mesh position={[0, 0, -8]} scale={1 + scrollProgress * 0.5}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#00F5D4" wireframe transparent opacity={0.1} />
      </mesh>
    </>
  )
}

function Hero({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete
    })
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    )

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onComplete])

  const progress = Math.min(scrollY / 500, 1)

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Hero3D scrollProgress={progress} />
          <Preload all />
        </Canvas>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />
      
      <div className="text-center z-10 px-6">
        <h1 ref={titleRef} className="text-6xl md:text-9xl font-bold mb-6 tracking-tight" style={{ fontFamily: '"Bebas Neue", sans-serif', color: '#fff' }}>
          GOKULA
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-white/60 max-w-xl mx-auto font-light tracking-wider">
          Creative Digital Marketing & Brand Strategy
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-sm uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".story-text",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 flex items-center" style={{ background: '#0a0a0f' }}>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <p className="story-text text-[#00F5D4] uppercase tracking-widest text-sm">The Story</p>
          <h2 className="story-text text-4xl md:text-6xl font-bold leading-tight" style={{ color: '#fff' }}>
            Crafting digital experiences that <span className="text-[#8B5CF6]">tell stories</span> and{' '}
            <span className="text-[#F472B6]">drive results</span>
          </h2>
          <p className="story-text text-xl text-white/60 leading-relaxed max-w-2xl">
            I'm Gokula, a creative digital marketer and brand strategist. I help brands stand out 
            through compelling visuals, data-driven strategies, and storytelling that connects 
            with audiences on a deeper level.
          </p>
          <p className="story-text text-lg text-white/40">
            From healthcare to education, I've helped businesses transform their digital presence 
            and achieve measurable growth.
          </p>
        </div>
      </div>
    </section>
  )
}

function SkillsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  const allSkills = [...skills, ...skills]

  return (
    <section ref={containerRef} className="py-20 overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div className="marquee-track flex gap-8">
        {allSkills.map((skill, i) => (
          <span 
            key={i} 
            className="text-2xl md:text-4xl font-bold whitespace-nowrap px-8 py-4 rounded-full"
            style={{ 
              color: i % 3 === 0 ? '#00F5D4' : i % 3 === 1 ? '#8B5CF6' : '#F472B6',
              border: `1px solid ${i % 3 === 0 ? '#00F5D4' : i % 3 === 1 ? '#8B5CF6' : '#F472B6'}40`
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      projects.forEach((_, i) => {
        gsap.fromTo(`.project-${i}`,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6" style={{ background: '#0a0a0f' }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[#00F5D4] uppercase tracking-widest text-sm mb-4">Work</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-16" style={{ color: '#fff' }}>Selected Projects</h2>
        
        <div className="space-y-24">
          {projects.map((project, i) => (
            <div 
              key={i}
              className={`project-${i} relative ${i % 2 === 1 ? 'md:ml-auto md:w-1/2' : ''}`}
            >
              <div 
                className="p-8 rounded-3xl cursor-pointer group"
                style={{ 
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${project.color}30`
                }}
              >
                <span 
                  className="text-xs uppercase tracking-wider"
                  style={{ color: project.color }}
                >
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4" style={{ color: '#fff' }}>
                  {project.title}
                </h3>
                <p className="text-white/50 mb-6">{project.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold" style={{ color: project.color }}>
                    {project.metric}
                  </span>
                  <span className="text-white/40">{project.metricLabel}</span>
                </div>
                
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span style={{ color: project.color }}>View Case Study →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%"
          }
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-[80vh] py-32 px-6 flex items-center relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <ParticleField />
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[3, 32, 32]} />
            <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.1} />
          </mesh>
          <Preload all />
        </Canvas>
      </div>
      
      <div className="contact-content max-w-3xl mx-auto text-center">
        <p className="text-[#00F5D4] uppercase tracking-widest text-sm mb-4">Get in Touch</p>
        <h2 className="text-5xl md:text-7xl font-bold mb-8" style={{ color: '#fff' }}>
          Let's Create Something <span className="text-[#8B5CF6]">Amazing</span>
        </h2>
        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto">
          Ready to elevate your brand? Let's connect and bring your vision to life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:graphikardia@gmail.com"
            className="px-10 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #00F5D4, #8B5CF6)',
              color: '#000'
            }}
          >
            Get in Touch
          </a>
          <a 
            href="tel:+917975594203"
            className="px-10 py-4 rounded-full text-lg font-medium border border-white/20 hover:bg-white/10 transition-all"
            style={{ color: '#fff' }}
          >
            +91 7975594203
          </a>
        </div>
        
        <div className="mt-16 flex justify-center gap-8">
          {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
            <a 
              key={social}
              href="#"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
      style={{ 
        background: 'linear-gradient(90deg, #00F5D4, #8B5CF6, #F472B6)',
        scaleX: scrollYProgress 
      }}
    />
  )
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
      style={{ 
        background: scrolled ? 'rgba(10,10,15,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-wider" style={{ color: '#fff' }}>
          GOKULA
        </a>
        <div className="flex gap-8">
          {['Story', 'Work', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-widest hover:text-[#00F5D4] transition-colors"
              style={{ color: '#fff80' }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const scrollYProgress = scrollY / (document.body.scrollHeight - window.innerHeight)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollYProgress }
}

import { motion } from "framer-motion"

function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      {loaded && <><ScrollIndicator /><Navigation /></>}
      
      <Hero onComplete={() => setLoaded(true)} />
      
      <div id="story">
        <StorySection />
        <SkillsMarquee />
      </div>
      
      <div id="work">
        <ProjectsSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>
      
      <footer className="py-8 text-center text-white/30 text-sm" style={{ background: '#050508' }}>
        <p>© 2026 Gokula. Crafted with passion.</p>
      </footer>
    </div>
  )
}

export default App
