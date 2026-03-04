import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  Points, PointMaterial, Preload, Float, MeshDistortMaterial, 
  Environment, Sparkles
} from "@react-three/drei"
import { useRef, useMemo, useEffect, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

function AnimatedParticles({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 2000
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 40
      pos[i + 1] = (Math.random() - 0.5) * 60
      pos[i + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.03 + scroll * 0.5
    ref.current.rotation.x = scroll * 0.2
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00F5D4"
        opacity={0.7}
      />
    </Points>
  )
}

function PathParticles({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 500
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const t = i / count
      const angle = t * Math.PI * 8
      const radius = 2 + t * 3
      
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = t * 30 - 5
      pos[i * 3 + 2] = Math.sin(angle) * radius - 10
    }
    
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = -scroll * 30
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00F5D4"
        opacity={0.9}
      />
    </Points>
  )
}

function FloatingShape({ 
  position, color, distort = 0.3, speed = 2, geometry = "sphere", scale = 1,
  scroll, delay = 0
}: { 
  position: [number, number, number]
  color: string
  distort?: number
  speed?: number
  geometry?: "sphere" | "icosahedron" | "torusKnot" | "octahedron"
  scale?: number
  scroll: number
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const yOffset = position[1]
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime() + delay
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.position.y = yOffset + Math.sin(t * 0.5) * 0.5
  })

  const Geometry = useMemo(() => {
    switch (geometry) {
      case "icosahedron": return <icosahedronGeometry args={[scale, 4]} />
      case "torusKnot": return <torusKnotGeometry args={[scale * 0.6, scale * 0.2, 128, 32]} />
      case "octahedron": return <octahedronGeometry args={[scale, 2]} />
      default: return <sphereGeometry args={[scale, 64, 64]} />
    }
  }, [geometry, scale])

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        {Geometry}
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.6}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={distort}
          speed={speed}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  )
}

function SakuraParticles({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 150
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = Math.random() * 40 - 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5
    }
    return pos
  }, [])

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#ffb7c5"
        opacity={0.8}
      />
    </Points>
  )
}

function PaperCranes({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * 0.5 + i) * 0.002
      child.rotation.z = Math.sin(t * 0.3 + i * 0.5) * 0.1
    })
  })

  const cranes = useMemo(() => {
    const positions: [number, number, number][] = [
      [-6, 3, -12],
      [5, 5, -15],
      [-4, -2, -10],
      [7, 0, -18],
      [-8, -5, -14],
    ]
    return positions
  }, [])

  return (
    <group ref={groupRef}>
      {cranes.map((pos, i) => (
        <mesh key={i} position={pos} scale={0.3 + i * 0.05}>
          <coneGeometry args={[0.3, 0.8, 3]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffe4e9"
            emissiveIntensity={0.2}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function ToriiGate({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = 8 - scroll * 20
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
  })

  return (
    <group ref={groupRef} position={[0, 0, -25]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 8, 0.3]} />
        <meshStandardMaterial color="#c41e3a" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[0.3, 8, 0.3]} />
        <meshStandardMaterial color="#c41e3a" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[1.5, 3.5, 0]}>
        <boxGeometry args={[4, 0.4, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[1.5, 4.2, 0]}>
        <boxGeometry args={[5, 0.3, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

function JapaneseLantern({ position, scroll }: { position: [number, number, number], scroll: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.scale.y = 1 + Math.sin(t * 2 + position[0]) * 0.05
  })

  return (
    <mesh ref={meshRef} position={[position[0], position[1] - scroll * 15, position[2]]}>
      <cylinderGeometry args={[0.2, 0.3, 0.8, 8]} />
      <meshStandardMaterial
        color="#ff6b35"
        emissive="#ff6b35"
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

function WaveRing({ scroll, delay = 0 }: { scroll: number, delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime() + delay
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.z = t * 0.2
    meshRef.current.position.y = 5 - scroll * 25 + Math.sin(t) * 0.5
  })

  return (
    <mesh ref={meshRef} position={[0, 5, -20]}>
      <torusGeometry args={[3, 0.1, 16, 100]} />
      <meshStandardMaterial
        color="#00F5D4"
        emissive="#00F5D4"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function SparkleField({ scroll }: { scroll: number }) {
  return (
    <Sparkles
      count={200}
      scale={30}
      size={2}
      speed={0.3}
      opacity={0.5}
      color="#00F5D4"
      position={[0, -scroll * 10, 0]}
    />
  )
}

function CameraController({ scroll }: { scroll: number }) {
  const { camera } = useThree()
  
  useFrame(() => {
    const targetZ = 12 - scroll * 4
    const targetY = scroll * 2
    const targetX = Math.sin(scroll * Math.PI) * 2
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
    camera.lookAt(0, scroll * 3, -10)
  })
  
  return null
}

function Scene({ scroll }: { scroll: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F5D4" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#f472b6" />
      <pointLight position={[5, -5, -10]} intensity={0.8} color="#c41e3a" />
      <pointLight position={[-5, 10, -15]} intensity={0.6} color="#ff6b35" />
      
      <AnimatedParticles scroll={scroll} />
      <PathParticles scroll={scroll} />
      <SparkleField scroll={scroll} />
      <SakuraParticles scroll={scroll} />
      <PaperCranes scroll={scroll} />
      <ToriiGate scroll={scroll} />
      <JapaneseLantern position={[-5, 8, -12]} scroll={scroll} />
      <JapaneseLantern position={[6, 5, -15]} scroll={scroll} />
      <JapaneseLantern position={[4, -2, -10]} scroll={scroll} />
      <WaveRing scroll={scroll} delay={0} />
      <WaveRing scroll={scroll} delay={2} />
      
      <FloatingShape position={[4, 2 - scroll * 5, -8]} color="#8b5cf6" distort={0.4} speed={2} geometry="icosahedron" scale={1.2} scroll={scroll} delay={0} />
      <FloatingShape position={[-4, 4 - scroll * 8, -10]} color="#f472b6" distort={0.3} speed={1.5} geometry="torusKnot" scale={1} scroll={scroll} delay={1} />
      <FloatingShape position={[3, -2 - scroll * 12, -12]} color="#00F5D4" distort={0.35} speed={1.8} geometry="sphere" scale={0.8} scroll={scroll} delay={2} />
      <FloatingShape position={[-3, 0 - scroll * 15, -8]} color="#F59E0B" distort={0.25} speed={1.2} geometry="octahedron" scale={1.5} scroll={scroll} delay={0.5} />
      <FloatingShape position={[0, -5 - scroll * 18, -15]} color="#10B981" distort={0.3} speed={2} geometry="icosahedron" scale={1} scroll={scroll} delay={1.5} />
      
      <fog attach="fog" args={['#0a0a0f', 5, 40]} />
      <Environment preset="night" />
      <CameraController scroll={scroll} />
    </>
  )
}

export default function StorytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / scrollHeight
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const titleY = scrollProgress * 100
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2)

  const showContent = scrollProgress > 0.15

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <Scene scroll={scrollProgress} />
          <Preload all />
        </Canvas>
      </div>

      <motion.div 
        style={{ 
          position: 'relative', 
          zIndex: 10,
          minHeight: '200vh',
          pointerEvents: scrollProgress < 0.15 ? 'auto' : 'none'
        }}
      >
        <motion.div 
          className="min-h-screen flex flex-col items-center justify-center px-6"
          style={{ y: titleY, opacity: titleOpacity, transition: 'opacity 0.3s' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-4 py-2 rounded-full glass-card mb-6 text-sm uppercase tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              Available for Projects
            </motion.span>
            
            <h1 
              className="text-7xl md:text-9xl font-bold mb-4"
              style={{ 
                color: 'var(--text)',
                fontFamily: '"Permanent Marker", cursive',
                textShadow: '0 0 60px rgba(0, 245, 212, 0.3)'
              }}
            >
              GOKULA
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 font-body"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hi, I'm <span style={{ color: 'var(--accent)' }}>Gokula</span> - a <span style={{ color: '#8b5cf6' }}>Creative Lead</span> & <span style={{ color: '#f472b6' }}>Digital Marketer</span> crafting immersive digital experiences
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/case-studies"
                className="px-8 py-4 bg-[#00f5d4] text-black font-bold rounded-full hover:scale-105 transition-transform hover-lift glow-effect font-body"
              >
                View Work
              </Link>
              <a
                href="mailto:graphikardia@gmail.com"
                className="px-8 py-4 glass-card rounded-full hover:bg-white/10 transition-colors font-body"
                style={{ color: 'var(--text)' }}
              >
                Let's Talk
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
        </motion.div>

        <motion.div 
          className="min-h-screen flex items-center justify-center px-6"
          style={{ opacity: showContent ? 1 : 0 }}
        >
          <div className="text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6 font-display" style={{ color: 'var(--text)' }}>
                Scroll to Explore
              </h2>
              <p className="text-xl font-body" style={{ color: 'var(--text-secondary)' }}>
                Journey through my creative world - from skills to projects, experience to contact.
                Every scroll reveals a new chapter.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        style={{ opacity: scrollProgress > 0.05 && scrollProgress < 0.3 ? 1 : 0 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Scroll down</span>
        </motion.div>
      </motion.div>

      <div 
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        style={{ opacity: scrollProgress > 0.1 ? 1 : 0 }}
      >
        <div className="flex flex-col gap-2">
          {['Intro', 'Journey', 'Work', 'Skills', 'Contact'].map((label, i) => (
            <motion.div
              key={label}
              className="w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: scrollProgress > (i * 0.2) - 0.05 ? '#00f5d4' : 'rgba(255,255,255,0.2)',
                scale: scrollProgress > (i * 0.2) - 0.05 && scrollProgress < (i * 0.2) + 0.15 ? 1.5 : 1
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
