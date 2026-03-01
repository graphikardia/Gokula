import { createContext, useContext, useState, useCallback, useEffect } from "react"

interface SoundContextType {
  isMuted: boolean
  toggleMute: () => void
  playHover: () => void
  playClick: () => void
  playAmbient: () => void
  stopAmbient: () => void
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playHover: () => {},
  playClick: () => {},
  playAmbient: () => {},
  stopAmbient: () => {}
})

export const useSound = () => useContext(SoundContext)

class SoundEngine {
  private ctx: AudioContext | null = null
  private ambientOsc: OscillatorNode | null = null
  private ambientGain: GainNode | null = null

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.ctx
  }

  playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.1) {
    const ctx = this.getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  }

  playHover() {
    this.playTone(800, 0.08, "sine", 0.05)
  }

  playClick() {
    this.playTone(600, 0.1, "sine", 0.08)
    setTimeout(() => this.playTone(900, 0.08, "sine", 0.05), 30)
  }

  startAmbient() {
    const ctx = this.getCtx()
    
    if (this.ambientOsc) return
    
    this.ambientOsc = ctx.createOscillator()
    this.ambientGain = ctx.createGain()
    
    this.ambientOsc.type = "sine"
    this.ambientOsc.frequency.setValueAtTime(120, ctx.currentTime)
    
    this.ambientGain.gain.setValueAtTime(0.02, ctx.currentTime)
    
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime)
    lfoGain.gain.setValueAtTime(20, ctx.currentTime)
    lfo.connect(lfoGain)
    lfoGain.connect(this.ambientOsc.frequency)
    lfo.start()
    
    this.ambientOsc.connect(this.ambientGain)
    this.ambientGain.connect(ctx.destination)
    this.ambientOsc.start()
  }

  stopAmbient() {
    if (this.ambientOsc) {
      this.ambientOsc.stop()
      this.ambientOsc.disconnect()
      this.ambientOsc = null
    }
    if (this.ambientGain) {
      this.ambientGain.disconnect()
      this.ambientGain = null
    }
  }
}

const soundEngine = new SoundEngine()

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const [ambientStarted, setAmbientStarted] = useState(false)

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (prev) {
        soundEngine.startAmbient()
        setAmbientStarted(true)
      } else {
        soundEngine.stopAmbient()
        setAmbientStarted(false)
      }
      return !prev
    })
  }, [])

  const playHover = useCallback(() => {
    if (!isMuted) soundEngine.playHover()
  }, [isMuted])

  const playClick = useCallback(() => {
    if (!isMuted) soundEngine.playClick()
  }, [isMuted])

  const playAmbient = useCallback(() => {
    if (!isMuted && !ambientStarted) {
      soundEngine.startAmbient()
      setAmbientStarted(true)
    }
  }, [isMuted, ambientStarted])

  const stopAmbient = useCallback(() => {
    soundEngine.stopAmbient()
    setAmbientStarted(false)
  }, [])

  useEffect(() => {
    return () => {
      soundEngine.stopAmbient()
    }
  }, [])

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playAmbient, stopAmbient }}>
      {children}
    </SoundContext.Provider>
  )
}
