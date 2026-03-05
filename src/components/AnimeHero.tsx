import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Preload, Sparkles } from "@react-three/drei"
import { useRef, useMemo, useEffect, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function StoryParticle({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 100
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = Math.random() * 30 - 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.015 + scroll * 0.1
    ref.current.position.y = -scroll * 15
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#ff6b00"
        opacity={0.4}
      />
    </Points>
  )
}

function TrailParticles({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 80
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      pos[i * 3] = Math.sin(t * Math.PI * 3) * (2 + t * 3)
      pos[i * 3 + 1] = t * 25
      pos[i * 3 + 2] = Math.cos(t * Math.PI * 3) * (2 + t * 3) - 15
    }
    return pos
  }, [])

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.y = -scroll * 30
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00d4aa"
        opacity={0.7}
      />
    </Points>
  )
}

function FloatingElements({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = t * 0.1 * (i % 2 === 0 ? 1 : -1)
      child.rotation.y = t * 0.15 * (i % 3 === 0 ? 1 : -1)
      child.position.y = (i * 3 - scroll * 20) + Math.sin(t + i) * 0.5
    })
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[
          (i % 2 === 0 ? 1 : -1) * (4 + i * 0.5),
          i * 3,
          -12 - i * 2
        ]}>
          {i % 3 === 0 && <sphereGeometry args={[0.3, 12, 12]} />}
          {i % 3 === 1 && <octahedronGeometry args={[0.3, 0]} />}
          {i % 3 === 2 && <icosahedronGeometry args={[0.25, 0]} />}
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#ff6b00" : "#c41e3a"} 
            emissive={i % 2 === 0 ? "#ff6b00" : "#c41e3a"}
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

function StoryGate({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = 8 - scroll * 40
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
  })

  return (
    <group ref={groupRef} position={[0, 0, -35]}>
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[0.4, 14, 0.4]} />
        <meshStandardMaterial color="#1a1410" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[0.4, 14, 0.4]} />
        <meshStandardMaterial color="#1a1410" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 6.5, 0]}>
        <boxGeometry args={[7, 0.6, 0.5]} />
        <meshStandardMaterial color="#1a1410" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0, 7.2, 0]}>
        <boxGeometry args={[8, 0.4, 0.4]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 6, 0.1]}>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial color="#0a0610" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function CameraController({ scroll }: { scroll: number }) {
  const { camera } = useThree()
  
  useFrame(() => {
    const progress = Math.min(scroll, 1)
    const targetZ = 16 - progress * 6
    const targetY = progress * 4
    const targetX = Math.sin(progress * Math.PI * 2) * 3
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02)
    camera.lookAt(0, progress * 4, -20)
  })
  
  return null
}

function Scene({ scroll }: { scroll: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 15, 10]} intensity={0.4} color="#fff5e6" />
      <pointLight position={[15, 15, 10]} intensity={1.5} color="#ff6b00" />
      <pointLight position={[-15, -10, -10]} intensity={1} color="#c41e3a" />
      <pointLight position={[0, 10, 5]} intensity={0.8} color="#00d4aa" />
      
      <StoryParticle scroll={scroll} />
      <TrailParticles scroll={scroll} />
      <FloatingElements scroll={scroll} />
      <Sparkles
        count={100}
        scale={35}
        size={1}
        speed={0.2}
        color="#ff6b00"
        opacity={0.3}
      />
      <StoryGate scroll={scroll} />
      
      <fog attach="fog" args={['#0a0610', 15, 55]} />
      <CameraController scroll={scroll} />
    </>
  )
}

function HeroContent({ scroll }: { scroll: number }) {
  const opacity = Math.max(0, 1 - scroll * 8)
  const y = scroll * -50
  const scale = Math.max(0.8, 1 - scroll * 2)

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" 
          style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)' }}>
          <span className="text-2xl">🍃</span>
          <span className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: '#ff6b00' }}>
            The Journey Begins
          </span>
          <span className="text-2xl">⚔️</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ letterSpacing: "0em", opacity: 0 }}
        animate={{ letterSpacing: "0.1em", opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-[12vw] md:text-[10rem] font-bold mb-4"
        style={{ 
          color: '#f0e6d3',
          fontFamily: '"Permanent Marker", cursive',
          textShadow: '0 0 80px rgba(255,107,0,0.5), 0 0 160px rgba(196,30,58,0.3)',
          lineHeight: 0.9
        }}
      >
        GOKULA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-xl md:text-2xl font-light tracking-wider mb-12"
        style={{ color: 'rgba(240,230,211,0.7)' }}
      >
        Creative Lead • Digital Marketer • Storyteller
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(240,230,211,0.4)' }}>
            Scroll to Begin
          </span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,107,0,0.6)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function AnimeHero() {
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

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, background: 'linear-gradient(180deg, #0a0610 0%, #1a0a20 50%, #120a1a 100%)' }}>
        <Canvas
          camera={{ position: [0, 0, 16], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <Scene scroll={scrollProgress} />
          <Preload all />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, minHeight: '250vh' }}>
        <HeroContent scroll={scrollProgress} />
        
        <motion.div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="h-1 rounded-full"
            style={{ 
              width: Math.min(scrollProgress * 300, 300),
              background: 'linear-gradient(90deg, #ff6b00, #c41e3a, #00d4aa)',
              boxShadow: '0 0 20px rgba(255,107,0,0.5)'
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
