import { useState, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function ContactSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.4
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 2]} />
        <MeshDistortMaterial
          color="#ff1493"
          envMapIntensity={0.8}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff1493" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c41e3a" />
      <ContactSphere />
      <Sparkles count={100} scale={8} size={2} speed={0.4} color="#ff1493" />
    </>
  )
}

export default function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error">(null)
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sanitized = sanitizeInput(e.target.value)
    setState(s => ({ ...s, [e.target.name]: sanitized }))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!validateEmail(state.email)) {
      setStatus("error")
      return
    }

    setStatus("sending")
    try {
      await fetch("https://formspree.io/f/yourFormId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(state.name),
          email: sanitizeInput(state.email),
          message: sanitizeInput(state.message)
        })
      })
      setStatus("sent")
      setState({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const inputClasses = (name: string) => `
    w-full p-4 bg-white/5 border rounded-xl outline-none transition-all duration-300 font-body
    ${focused === name 
      ? 'border-[#00f5d4] bg-white/10 shadow-[0_0_20px_rgba(0,245,212,0.2)]' 
      : 'border-white/10 hover:border-white/20'}
  `

  return (
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%' }}
        >
          <ContactScene />
        </Canvas>
      </div>
      
      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#00f5d4] uppercase tracking-wider text-sm">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 font-display" style={{ color: 'var(--text)' }}>
            Let's Create Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-lg mb-8 font-body" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="grid gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div>
            <input 
              required 
              name="name"
              value={state.name} 
              onChange={handleChange} 
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              placeholder="Your Name" 
              maxLength={100}
              className={inputClasses('name')}
              style={{ color: 'var(--text)' }}
            />
          </div>
          
          <div>
            <input 
              required 
              name="email"
              type="email"
              value={state.email} 
              onChange={handleChange} 
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="your@email.com" 
              maxLength={254}
              className={inputClasses('email')}
              style={{ color: 'var(--text)' }}
            />
          </div>
          
          <div>
            <textarea 
              required 
              name="message"
              value={state.message} 
              onChange={handleChange} 
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              placeholder="Tell me about your project..." 
              className={inputClasses('message')}
              style={{ color: 'var(--text)', minHeight: '150px', resize: 'vertical' }}
              maxLength={2000}
            />
          </div>
          
          <motion.button 
            type="submit" 
            disabled={status === "sending"}
            className="w-full py-4 bg-[#00f5d4] text-black font-bold rounded-xl hover-lift glow-effect font-body text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
          
          {status === "sent" && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-center font-body"
            >
              Message sent — I'll get back to you soon!
            </motion.p>
          )}
          {status === "error" && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-center font-body"
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.form>

        <motion.div 
          className="mt-12 grid grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href="mailto:graphikardia@gmail.com" 
            className="p-4 rounded-xl glass-card hover:border-[#00f5d4]/50 transition-colors"
          >
            <div className="text-2xl mb-2">📧</div>
            <p className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>Email</p>
            <p className="font-body text-xs" style={{ color: 'var(--text)' }}>Message</p>
          </a>
          <a 
            href="tel:+917975594203" 
            className="p-4 rounded-xl glass-card hover:border-[#00f5d4]/50 transition-colors"
          >
            <div className="text-2xl mb-2">📱</div>
            <p className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>Phone</p>
            <p className="font-body text-xs" style={{ color: 'var(--text)' }}>+91 7975594203</p>
          </a>
          <a 
            href="#" 
            className="p-4 rounded-xl glass-card hover:border-[#00f5d4]/50 transition-colors"
          >
            <div className="text-2xl mb-2">📍</div>
            <p className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>Location</p>
            <p className="font-body text-xs" style={{ color: 'var(--text)' }}>Bengaluru</p>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
