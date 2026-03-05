import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Preload, Float, MeshDistortMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import { useScroll, useTransform, motion } from "framer-motion"
import { Link } from "react-router-dom"

function Particles() {
  const ref = useRef<THREE.Points>(null)
  
  const particles = 3000
  const positions = useMemo(() => {
    const pos = new Float32Array(particles * 3)
    for (let i = 0; i < particles * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 30
      pos[i + 1] = (Math.random() - 0.5) * 30
      pos[i + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#ff6b00"
        opacity={0.6}
      />
    </Points>
  )
}

function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.y = t * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, 0, -5]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#c41e3a"
          envMapIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

function DistortedSphere2() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.z = t * 0.25
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-3, 1, -4]}>
        <icosahedronGeometry args={[1.2, 4]} />
        <MeshDistortMaterial
          color="#00d4aa"
          envMapIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.2
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, -2, -6]}>
        <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#ff6b00"
          envMapIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b00" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c41e3a" />
      <Particles />
      <DistortedSphere />
      <DistortedSphere2 />
      <TorusKnot />
      <fog attach="fog" args={['#0b0b0f', 8, 30]} />
    </>
  )
}

export default function ThreeDHero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <Scene />
          <Preload all />
        </Canvas>
      </div>
      
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
        style={{ y, opacity, scale }}
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
            Hi, I'm <span style={{ color: 'var(--accent)' }}>Gokula</span> - a <span style={{ color: '#c41e3a' }}>Creative Lead</span> & <span style={{ color: '#00d4aa' }}>Digital Marketer</span> crafting immersive digital experiences
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
    </div>
  )
}
