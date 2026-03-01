import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Preload } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

interface ParticlesProps {
  mousePosition: { x: number; y: number }
}

function ParticlesInternal({ mousePosition }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  const particles = 8000
  const positions = useMemo(() => {
    const pos = new Float32Array(particles * 3)
    for (let i = 0; i < particles * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 25
      pos[i + 1] = (Math.random() - 0.5) * 25
      pos[i + 2] = (Math.random() - 0.5) * 25
    }
    return pos
  }, [])

  const velocities = useMemo(() => {
    const vel = new Float32Array(particles * 3)
    for (let i = 0; i < particles * 3; i += 3) {
      vel[i] = (Math.random() - 0.5) * 0.002
      vel[i + 1] = (Math.random() - 0.5) * 0.002
      vel[i + 2] = (Math.random() - 0.5) * 0.002
    }
    return vel
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    
    const t = state.clock.getElapsedTime()
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    const mouseX = (mousePosition.x / viewport.width) * 2
    const mouseY = -(mousePosition.y / viewport.height) * 2
    
    for (let i = 0; i < particles * 3; i += 3) {
      posArray[i] += velocities[i]
      posArray[i + 1] += velocities[i + 1]
      posArray[i + 2] += velocities[i + 2]
      
      const dx = posArray[i] - mouseX * 10
      const dy = posArray[i + 1] - mouseY * 10
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 3) {
        const force = (3 - dist) * 0.01
        posArray[i] += dx * force
        posArray[i + 1] += dy * force
      }
      
      if (Math.abs(posArray[i]) > 12) posArray[i] *= -0.9
      if (Math.abs(posArray[i + 1]) > 12) posArray[i + 1] *= -0.9
      if (Math.abs(posArray[i + 2]) > 12) posArray[i + 2] *= -0.9
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = t * 0.05
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1
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
        opacity={0.8}
      />
    </Points>
  )
}

function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.2
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.1
  })
  
  return (
    <mesh ref={ref} scale={1.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#00F5D4" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

export default function WebGLParticles() {
  const mousePosition = useRef({ x: 0, y: 0 })
  
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    })
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00F5D4" />
        <GlowSphere />
        <ParticlesInternal mousePosition={mousePosition.current} />
        <Preload all />
      </Canvas>
    </div>
  )
}
