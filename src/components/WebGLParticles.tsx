import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Preload } from "@react-three/drei"
import { useRef, useMemo, useEffect, useState } from "react"
import * as THREE from "three"

interface ParticlesProps {
  mousePosition: { x: number; y: number }
}

function Particles({ mousePosition }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  const { size } = useThree()
  
  const particles = 6000
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
      vel[i] = (Math.random() - 0.5) * 0.003
      vel[i + 1] = (Math.random() - 0.5) * 0.003
      vel[i + 2] = (Math.random() - 0.5) * 0.003
    }
    return vel
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    
    const t = state.clock.getElapsedTime()
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    const mouseX = ((mousePosition.x / size.width) - 0.5) * 2
    const mouseY = -((mousePosition.y / size.height) - 0.5) * 2
    
    for (let i = 0; i < particles * 3; i += 3) {
      posArray[i] += velocities[i] + Math.sin(t * 0.5 + i * 0.01) * 0.002
      posArray[i + 1] += velocities[i + 1] + Math.cos(t * 0.3 + i * 0.01) * 0.002
      posArray[i + 2] += velocities[i + 2] + Math.sin(t * 0.2 + i * 0.01) * 0.001
      
      const dx = posArray[i] - mouseX * 8
      const dy = posArray[i + 1] - mouseY * 8
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 4) {
        const force = (4 - dist) * 0.02
        posArray[i] += dx * force * 0.5
        posArray[i + 1] += dy * force * 0.5
        posArray[i + 2] += (Math.random() - 0.5) * force * 0.3
      }
      
      if (Math.abs(posArray[i]) > 12) posArray[i] *= -0.95
      if (Math.abs(posArray[i + 1]) > 12) posArray[i + 1] *= -0.95
      if (Math.abs(posArray[i + 2]) > 12) posArray[i + 2] *= -0.95
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = t * 0.05
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.15
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#ff1493"
        opacity={0.8}
      />
    </Points>
  )
}

function GlowOrbs({ mousePosition }: ParticlesProps) {
  const { size } = useThree()
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)
  const orb3Ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mouseX = ((mousePosition.x / size.width) - 0.5) * 10
    const mouseY = -((mousePosition.y / size.height) - 0.5) * 10
    
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.3) * 3 + mouseX * 0.3
      orb1Ref.current.position.y = Math.cos(t * 0.2) * 2 + mouseY * 0.3
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.25) * 4 - mouseX * 0.2
      orb2Ref.current.position.y = Math.sin(t * 0.35) * 3 - mouseY * 0.2
    }
    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.sin(t * 0.4) * 2.5 + mouseX * 0.4
      orb3Ref.current.position.y = Math.cos(t * 0.3) * 2.5 + mouseY * 0.4
    }
  })

  return (
    <>
      <mesh ref={orb1Ref} position={[5, 3, -5]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#ff1493" transparent opacity={0.15} />
      </mesh>
      <mesh ref={orb2Ref} position={[-4, -2, -4]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#c41e3a" transparent opacity={0.12} />
      </mesh>
      <mesh ref={orb3Ref} position={[3, -3, -6]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

function MouseGlow({ mousePosition }: ParticlesProps) {
  const { size } = useThree()
  const lightRef = useRef<THREE.PointLight>(null)
  
  useFrame(() => {
    if (!lightRef.current) return
    const x = ((mousePosition.x / size.width) - 0.5) * size.width * 0.8
    const y = -((mousePosition.y / size.height) - 0.5) * size.height * 0.8
    lightRef.current.position.lerp(new THREE.Vector3(x, y, 3), 0.08)
  })

  return (
    <pointLight
      ref={lightRef}
      intensity={3}
      color="#ff1493"
      distance={15}
    />
  )
}

export default function WebGLParticles() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <MouseGlow mousePosition={mousePosition} />
        <Particles mousePosition={mousePosition} />
        <GlowOrbs mousePosition={mousePosition} />
        <fog attach="fog" args={['#0b0b0f', 8, 25]} />
        <Preload all />
      </Canvas>
    </div>
  )
}
