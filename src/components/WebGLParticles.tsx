import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Preload } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function ParticlesInternal() {
  const ref = useRef<any>()
  const particles = 4000
  const positions = new Float32Array(particles * 3)
  for (let i = 0; i < particles * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1
    if (ref.current) ref.current.rotation.y = t
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.03} sizeAttenuation color={"#00F5D4"} />
    </Points>
  )
}

export default function WebGLParticles() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <ParticlesInternal />
        <Preload all />
      </Canvas>
    </div>
  )
}
