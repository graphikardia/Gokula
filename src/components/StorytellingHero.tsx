import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  Points, PointMaterial, Preload, Float, Sparkles
} from "@react-three/drei"
import { useRef, useMemo, useEffect, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function CyberGrid({ scroll }: { scroll: number }) {
  const gridRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.position.y = -scroll * 40
    gridRef.current.rotation.x = Math.PI / 2
  })

  return (
    <group ref={gridRef} position={[0, -10, -20]}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`h${i}`} position={[0, 0, (i - 7) * 4]}>
          <boxGeometry args={[30, 0.02, 0.02]} />
          <meshBasicMaterial color="#ff1493" transparent opacity={0.1} />
        </mesh>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`v${i}`} position={[(i - 5) * 5, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, 30]} />
          <meshBasicMaterial color="#ff1493" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

function DigitalRain({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 100
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 30 - 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= 0.08
      if (positions[i * 3 + 1] < -15) {
        positions[i * 3 + 1] = 15
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.position.y = -scroll * 15
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00ff88"
        opacity={0.5}
      />
    </Points>
  )
}

function SakuraParticles({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 80
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = Math.random() * 30 - 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.01 + scroll * 0.1
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= 0.005
      positions[i * 3] += Math.sin(t + i) * 0.001
      if (positions[i * 3 + 1] < -10) {
        positions[i * 3 + 1] = 20
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#ffb7c5"
        opacity={0.6}
      />
    </Points>
  )
}

function PathParticles({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null)
  const count = 200
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const t = i / count
      const angle = t * Math.PI * 4
      const radius = 2 + t * 4
      
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = t * 25 - 5
      pos[i * 3 + 2] = Math.sin(angle) * radius - 10
    }
    
    return pos
  }, [])

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.y = -scroll * 20
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#c41e3a"
        opacity={0.7}
      />
    </Points>
  )
}

function SimpleFloatingShape({ 
  position, color, scroll, delay = 0
}: { 
  position: [number, number, number]
  color: string
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
    meshRef.current.position.y = yOffset + Math.sin(t * 0.3) * 0.5
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

function ToriiGate({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = 8 - scroll * 30
  })

  return (
    <group ref={groupRef} position={[0, 0, -30]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 10, 0.3]} />
        <meshStandardMaterial color="#c41e3a" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <boxGeometry args={[0.3, 10, 0.3]} />
        <meshStandardMaterial color="#c41e3a" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[2, 4, 0]}>
        <boxGeometry args={[5.5, 0.4, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[2, 5, 0]}>
        <boxGeometry args={[7, 0.3, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

function SimpleLantern({ position, scroll }: { position: [number, number, number], scroll: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] - scroll * 20
  })

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.2, 0.25, 0.8, 8]} />
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

function WaveRings({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = t * 0.15 + i * 0.4
      child.position.y = 5 - scroll * 30 + Math.sin(t + i) * 0.3
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2 + i * 1.5, 0.06, 8, 32]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ff1493" : "#c41e3a"}
            emissive={i % 2 === 0 ? "#ff1493" : "#c41e3a"}
            emissiveIntensity={0.4}
            transparent
            opacity={0.4 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function CameraController({ scroll }: { scroll: number }) {
  const { camera } = useThree()
  
  useFrame(() => {
    const targetZ = 12 - scroll * 3
    const targetY = scroll * 2
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(scroll * Math.PI * 2) * 2, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02)
    camera.lookAt(0, scroll * 2, -15)
  })
  
  return null
}

function Scene({ scroll }: { scroll: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff1493" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#c41e3a" />
      <pointLight position={[0, 10, 5]} intensity={0.8} color="#00d4aa" />
      
      <CyberGrid scroll={scroll} />
      <DigitalRain scroll={scroll} />
      <SakuraParticles scroll={scroll} />
      <PathParticles scroll={scroll} />
      <Sparkles
        count={150}
        scale={25}
        size={1}
        speed={0.3}
        opacity={0.3}
        color="#ff1493"
      />
      <ToriiGate scroll={scroll} />
      <SimpleLantern position={[-6, 8, -15]} scroll={scroll} />
      <SimpleLantern position={[7, 5, -18]} scroll={scroll} />
      <WaveRings scroll={scroll} />
      
      <SimpleFloatingShape position={[5, 2 - scroll * 8, -10]} color="#c41e3a" scroll={scroll} delay={0} />
      <SimpleFloatingShape position={[-4, 4 - scroll * 12, -12]} color="#00d4aa" scroll={scroll} delay={1} />
      <SimpleFloatingShape position={[3, -2 - scroll * 16, -14]} color="#ff1493" scroll={scroll} delay={2} />
      <SimpleFloatingShape position={[-3, 0 - scroll * 20, -10]} color="#F59E0B" scroll={scroll} delay={0.5} />
      
      <fog attach="fog" args={['#050508', 10, 45]} />
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

  const titleY = scrollProgress * 120
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2.5)

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, background: 'linear-gradient(180deg, #050508 0%, #0a0a12 50%, #0f0a15 100%)' }}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
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
          minHeight: '250vh',
          pointerEvents: scrollProgress < 0.12 ? 'auto' : 'none'
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
              className="inline-block px-5 py-2 rounded-full glass-card mb-8 text-sm uppercase tracking-[0.3em]"
              style={{ color: '#ff1493', border: '1px solid rgba(0, 245, 212, 0.3)' }}
            >
              Available for Projects
            </motion.span>
            
            <h1 
              className="text-8xl md:text-[10rem] font-bold mb-6"
              style={{ 
                color: '#ffffff',
                fontFamily: '"Permanent Marker", cursive',
                textShadow: '0 0 80px rgba(0, 245, 212, 0.4), 0 0 120px rgba(0, 245, 212, 0.2)',
                letterSpacing: '0.05em'
              }}
            >
              GOKULA
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl font-light tracking-wider"
              style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: '"Syne", sans-serif' }}
            >
              Creative Lead & Digital Storyteller
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Scroll to Explore</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="fixed top-1/2 left-8 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor: scrollProgress > i * 0.2 ? '#ff1493' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: scrollProgress > i * 0.2 ? '0 0 10px #ff1493' : 'none'
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="h-0.5 rounded-full"
            style={{ 
              width: Math.min(scrollProgress * 200, 200),
              background: 'linear-gradient(90deg, #ff1493, #c41e3a, #00d4aa)',
              boxShadow: '0 0 20px rgba(0, 245, 212, 0.5)'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
