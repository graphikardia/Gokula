import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Preload } from "@react-three/drei"
import { useRef, useMemo, useEffect, useState } from "react"
import * as THREE from "three"

function AnimatedParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  const particles = 5000
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
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    
    const mouseX = (mousePosition.x / viewport.width) * 2
    const mouseY = -(mousePosition.y / viewport.height) * 2
    
    for (let i = 0; i < particles * 3; i += 3) {
      posArray[i] += Math.sin(t * 0.5 + i) * 0.001
      posArray[i + 1] += Math.cos(t * 0.3 + i) * 0.001
      posArray[i + 2] += Math.sin(t * 0.2 + i) * 0.001
      
      const dx = posArray[i] - mouseX * 8
      const dy = posArray[i + 1] - mouseY * 8
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 4) {
        const force = (4 - dist) * 0.015
        posArray[i] -= dx * force * 0.1
        posArray[i + 1] -= dy * force * 0.1
      }
      
      if (Math.abs(posArray[i]) > 15) posArray[i] *= -0.95
      if (Math.abs(posArray[i + 1]) > 15) posArray[i + 1] *= -0.95
      if (Math.abs(posArray[i + 2]) > 15) posArray[i + 2] *= -0.95
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = t * 0.03
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        opacity={0.6}
      />
    </Points>
  )
}

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current || !ringRef.current) return
    const t = state.clock.getElapsedTime()
    
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.position.x = Math.sin(t * 0.5) * 2
    meshRef.current.position.y = Math.cos(t * 0.3) * 2
    
    ringRef.current.rotation.z = t * 0.1
    ringRef.current.rotation.x = Math.sin(t * 0.2) * 0.5
  })

  return (
    <>
      <mesh ref={meshRef} position={[5, 3, -5]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh ref={ringRef} position={[-5, -3, -8]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.2} />
      </mesh>
    </>
  )
}

function MouseGlow({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()
  
  useFrame(() => {
    if (!lightRef.current) return
    const x = (mousePosition.x / viewport.width - 0.5) * viewport.width * 2
    const y = -(mousePosition.y / viewport.height - 0.5) * viewport.height * 2
    lightRef.current.position.lerp(new THREE.Vector3(x, y, 5), 0.1)
  })

  return (
    <pointLight
      ref={lightRef}
      intensity={2}
      color="#00f5d4"
      distance={20}
    />
  )
}

export default function GlobalBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <MouseGlow mousePosition={mousePosition} />
        <AnimatedParticles mousePosition={mousePosition} />
        <AnimatedMesh />
        <fog attach="fog" args={['#0b0b0f', 10, 40]} />
        <Preload all />
      </Canvas>
    </div>
  )
}
