import { useEffect, useRef, useState, useMemo, Suspense } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Float, ContactShadows, useProgress, Html } from "@react-three/drei"
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Altius Hospital",
    category: "Healthcare Marketing",
    metric: "23%",
    metricLabel: "Patient Inflow",
    color: "#00F5D4",
    description: "Complete digital transformation for a multi-speciality hospital including social media strategy, video content, and performance marketing.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
  },
  {
    title: "Graphikardia",
    category: "Social Media Growth",
    metric: "93%",
    metricLabel: "Reach Increase",
    color: "#8B5CF6",
    description: "Digital marketing agency serving healthcare professionals with strategic brand positioning and content creation.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
  },
  {
    title: "Medella Homoeo",
    category: "Brand Strategy",
    metric: "40%",
    metricLabel: "Unique Reach",
    color: "#F472B6",
    description: "Complete brand identity and social media presence transformation for homeopathic clinic.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
  },
  {
    title: "Koshys Group",
    category: "Educational Institution",
    metric: "2.5M+",
    metricLabel: "Total Views",
    color: "#FBBF24",
    description: "Full digital presence management including content strategy and video production.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
  }
]

const skills = [
  { name: "Digital Marketing", color: "#00F5D4" },
  { name: "Brand Strategy", color: "#8B5CF6" },
  { name: "Video Editing", color: "#F472B6" },
  { name: "Social Media", color: "#FBBF24" },
  { name: "SEO/AEO/GEO", color: "#00F5D4" },
  { name: "Creative Direction", color: "#8B5CF6" }
]

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white/60 font-light tracking-widest">{progress.toFixed(0)}%</div>
    </Html>
  )
}

function Particles({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const colorPalette = [
      new THREE.Color("#00F5D4"),
      new THREE.Color("#8B5CF6"),
      new THREE.Color("#F472B6")
    ]
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 30
      positions[i3 + 2] = (Math.random() - 0.5) * 30
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={particles.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        opacity={0.8}
      />
    </Points>
  )
}

function MorphingShape({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
      
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.scale.setScalar(scale * (1 - scrollProgress * 0.3))
    }
  })

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, 0, -2]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.1
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ringRef} position={[-4, -1, -3]}>
        <torusGeometry args={[1.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#00F5D4" transparent opacity={0.4} />
      </mesh>
    </Float>
  )
}

function FloatingCrystal() {
  const crystalRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.x = state.clock.elapsedTime * 0.08
      crystalRef.current.rotation.z = state.clock.elapsedTime * 0.12
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={crystalRef} position={[0, 2, -4]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#F472B6" wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  )
}

function HeroScene({ scrollY }: { scrollY: number }) {
  const progress = scrollY / (typeof window !== 'undefined' ? window.innerHeight : 1)
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F5D4" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
      
      <Particles count={2000} />
      <MorphingShape scrollProgress={progress} />
      <FloatingRing />
      <FloatingCrystal />
      
      <mesh position={[0, 0, -10]} scale={2 - progress * 0.5}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial color="#00F5D4" wireframe transparent opacity={0.05} />
      </mesh>
      
      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4} />
    </>
  )
}

function SceneCanvas() {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={<Loader />}>
        <HeroScene scrollY={scrollY} />
      </Suspense>
    </Canvas>
  )
}

function Hero({ onLoaded }: { onLoaded: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onLoaded })
    
    tl.fromTo(titleRef.current, 
      { y: 120, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
  }, [onLoaded])

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <SceneCanvas />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />
      
      <div className="text-center z-10 px-6">
        <h1 ref={titleRef} className="text-7xl md:text-[10rem] font-bold mb-2 tracking-tighter" style={{ fontFamily: '"Clash Display", sans-serif', color: '#fff', lineHeight: 0.9 }}>
          GOKULA
        </h1>
        <p ref={subtitleRef} className="text-lg md:text-2xl text-white/50 max-w-xl mx-auto font-light tracking-[0.2em] uppercase">
          Creative Digital Storyteller
        </p>
        
        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#work" className="group relative px-8 py-4 bg-transparent border border-white/20 rounded-full overflow-hidden">
            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">View Work</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a href="#contact" className="text-white/60 hover:text-white transition-colors">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-white/30 text-xs uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".story-line",
        { opacity: 0, y: 80, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
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
    <section ref={sectionRef} className="relative min-h-screen py-40 px-6 flex items-center" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f15 50%, #0a0a0f 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F5D4]/20 via-[#8B5CF6]/20 to-[#F472B6]/20 rounded-3xl blur-3xl opacity-50" />
              <div className="relative h-full bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold gradient-text mb-2">5+</div>
                  <div className="text-white/40">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <p className="story-line text-[#00F5D4] uppercase tracking-[0.3em] text-sm">About Me</p>
            <h2 className="story-line text-4xl md:text-6xl font-bold leading-[1.1]" style={{ color: '#fff', fontFamily: '"Clash Display", sans-serif' }}>
              Crafting digital experiences that{' '}
              <span className="text-[#8B5CF6]">inspire</span> &{' '}
              <span className="text-[#F472B6]">convert</span>
            </h2>
            <p className="story-line text-lg text-white/50 leading-relaxed">
              I'm Gokula, a creative digital marketer and brand strategist based in Bangalore. 
              I help brands stand out through compelling visuals, data-driven strategies, and 
              storytelling that connects with audiences on a deeper level.
            </p>
            <p className="story-line text-lg text-white/40">
              From healthcare to education, I've helped businesses transform their digital presence 
              and achieve measurable growth through innovative marketing solutions.
            </p>
            
            <div className="story-line flex gap-4 pt-4">
              {['Strategy', 'Creative', 'Results'].map((tag, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{ 
                    background: `${['#00F5D4', '#8B5CF6', '#F472B6'][i]}20`,
                    color: ['#00F5D4', '#8B5CF6', '#F472B6'][i],
                    border: `1px solid ${['#00F5D4', '#8B5CF6', '#F472B6'][i]}40`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%"
          }
        }
      )
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 px-6" style={{ background: '#0a0a0f' }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[#00F5D4] uppercase tracking-[0.3em] text-sm mb-4 text-center">Expertise</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center" style={{ color: '#fff', fontFamily: '"Clash Display", sans-serif' }}>
          Skills & Services
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div 
              key={i}
              className="skill-card group p-8 rounded-3xl cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              style={{ 
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${skill.color}20` }}
              >
                <svg className="w-6 h-6" style={{ color: skill.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#fff' }}>{skill.name}</h3>
              <p className="text-white/40 text-sm">
                Strategic approach to deliver measurable results
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="py-40 px-6" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f18 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-[#00F5D4] uppercase tracking-[0.3em] text-sm mb-4">Work</p>
        <h2 className="text-5xl md:text-7xl font-bold mb-20" style={{ color: '#fff', fontFamily: '"Clash Display", sans-serif' }}>
          Selected Projects
        </h2>
        
        <div className="space-y-32">
          {projects.map((project, i) => (
            <div 
              key={i}
              className={`project-card relative ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-1/2">
                <div 
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
                  style={{ background: `${project.color}10` }}
                >
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{ 
                      background: `linear-gradient(135deg, ${project.color}40, transparent)`,
                      backdropFilter: 'blur(20px)'
                    }} 
                  />
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span 
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ background: project.color, color: '#000' }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:px-12 mt-8 md:mt-0 flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#fff', fontFamily: '"Clash Display", sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-white/50 mb-8 leading-relaxed">{project.description}</p>
                
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-6xl font-bold" style={{ color: project.color }}>
                    {project.metric}
                  </span>
                  <span className="text-white/40">{project.metricLabel}</span>
                </div>
                
                <button 
                  className="self-start px-6 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: 'transparent',
                    border: `1px solid ${project.color}`,
                    color: project.color
                  }}
                >
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonial",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  const testimonials = [
    { quote: "Outstanding results! Our social media presence transformed completely.", author: "Dr. Raksha Madhu", role: "Medella Homoeo" },
    { quote: "Professional, creative, and delivered beyond expectations.", author: "Altius Hospital", role: "Healthcare Partner" }
  ]

  return (
    <section ref={sectionRef} className="py-32 px-6" style={{ background: '#0a0a0f' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#00F5D4] uppercase tracking-[0.3em] text-sm mb-8">Testimonials</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              className="testimonial p-8 rounded-3xl"
              style={{ 
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <svg className="w-8 h-8 text-[#8B5CF6] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">{t.quote}</p>
              <div>
                <p className="font-semibold" style={{ color: '#fff' }}>{t.author}</p>
                <p className="text-sm text-white/40">{t.role}</p>
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
        { opacity: 0, y: 60 },
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
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-40 px-6 flex items-center" style={{ background: 'linear-gradient(180deg, #0f0f18 0%, #0a0a0f 100%)' }}>
      <div className="absolute inset-0 -z-10 opacity-30">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.2} />
          <Particles count={1000} />
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[4, 64, 64]} />
            <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.1} />
          </mesh>
        </Canvas>
      </div>
      
      <div className="contact-content max-w-4xl mx-auto text-center w-full">
        <p className="text-[#00F5D4] uppercase tracking-[0.3em] text-sm mb-4">Get in Touch</p>
        <h2 className="text-5xl md:text-8xl font-bold mb-8" style={{ color: '#fff', fontFamily: '"Clash Display", sans-serif', lineHeight: 1 }}>
          Let's Create<br/><span className="text-[#8B5CF6]">Something Amazing</span>
        </h2>
        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto">
          Ready to elevate your brand? Let's connect and bring your vision to life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a 
            href="mailto:graphikardia@gmail.com"
            className="group relative px-10 py-5 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #00F5D4, #8B5CF6)',
              color: '#000'
            }}
          >
            <span className="relative z-10">Get in Touch</span>
          </a>
          <a 
            href="tel:+917975594203"
            className="px-10 py-5 rounded-full text-lg font-medium border border-white/20 hover:bg-white/10 transition-all duration-300"
            style={{ color: '#fff' }}
          >
            +91 7975594203
          </a>
        </div>
        
        <div className="flex justify-center gap-8">
          {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
            <a 
              key={social}
              href="#"
              className="text-white/40 hover:text-white transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      setProgress(scrollTop / scrollHeight)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <div 
        className="h-full origin-left transition-transform duration-100"
        style={{ 
          background: 'linear-gradient(90deg, #00F5D4, #8B5CF6, #F472B6)',
          transform: `scaleX(${progress})`
        }}
      />
    </div>
  )
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Story', 'Skills', 'Work', 'Contact']

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-4 bg-[#0a0a0f]/90 backdrop-blur-lg' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-wider" style={{ color: '#fff', fontFamily: '"Clash Display", sans-serif' }}>
          GOKULA
        </a>
        
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-widest hover:text-[#00F5D4] transition-colors duration-300"
              style={{ color: '#fff80' }}
            >
              {item}
            </a>
          ))}
        </div>
        
        <button 
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-lg py-8 px-6 border-t border-white/10">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 text-white/60 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      {loaded && <><ScrollProgress /><Navigation /></>}
      
      <Hero onLoaded={() => setLoaded(true)} />
      
      <div id="story">
        <StorySection />
      </div>
      
      <SkillsSection />
      
      <div id="work">
        <ProjectsSection />
      </div>
      
      <TestimonialSection />
      
      <div id="contact">
        <ContactSection />
      </div>
      
      <footer className="py-8 text-center" style={{ background: '#050508' }}>
        <p className="text-white/30 text-sm">© 2026 Gokula. Crafted with passion.</p>
      </footer>
    </div>
  )
}

export default App
