import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface MediaItem {
  id: string
  type: "video"
  src: string
  caption: string
  date: string
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "video",
    src: "/videos/17985947006809050.mp4",
    caption: "Wedding Invitation Video",
    date: "2025"
  },
  {
    id: "2",
    type: "video",
    src: "/videos/18033823853335433.mp4",
    caption: "Brand Video Content",
    date: "2025"
  },
  {
    id: "3",
    type: "video",
    src: "/videos/18186390577313757.mp4",
    caption: "Video Editing Showcase",
    date: "2025"
  },
  {
    id: "4",
    type: "video",
    src: "/videos/18092905450603609.mp4",
    caption: "Marketing Video",
    date: "2025"
  },
  {
    id: "5",
    type: "video",
    src: "/videos/18545296147045577.mp4",
    caption: "Social Media Reels",
    date: "2025"
  },
  {
    id: "6",
    type: "video",
    src: "/videos/18380069440137947.mp4",
    caption: "Brand Strategy Video",
    date: "2025"
  },
  {
    id: "7",
    type: "video",
    src: "/videos/18456376219077837.mp4",
    caption: "Digital Marketing",
    date: "2025"
  },
  {
    id: "8",
    type: "video",
    src: "/videos/17895874779186800.mp4",
    caption: "Creative Design Work",
    date: "2025"
  },
  {
    id: "9",
    type: "video",
    src: "/videos/17926302516044574.mp4",
    caption: "Video Production",
    date: "2025"
  },
  {
    id: "10",
    type: "video",
    src: "/videos/18300674317213408.mp4",
    caption: "Wedding Collection",
    date: "2025"
  }
]

function FloatingKanji({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ 
        opacity: [0, 0.06, 0.03, 0.06, 0],
        scale: [0.3, 1, 1.1, 1, 0.3],
      }}
      transition={{ 
        duration: 18, 
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        fontSize: "clamp(8rem, 20vw, 18rem)",
        fontWeight: 100,
        color: "#ff1493",
        fontFamily: "var(--font-jp-serif)",
        pointerEvents: "none",
        zIndex: 0,
        textShadow: "0 0 40px rgba(255,20,147,0.3)",
      }}
    >
      {char}
    </motion.div>
  )
}

function Lantern({ x, delay }: { x: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: [0, 0.4, 0.2, 0.4, 0],
        y: [0, 10, 0, 10, 0]
      }}
      transition={{ 
        duration: 5, 
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        left: x,
        top: "10%",
        width: 18,
        height: 28,
        background: "linear-gradient(180deg, rgba(255,20,100,0.5) 0%, rgba(255,20,147,0.35) 100%)",
        borderRadius: "40% 40% 45% 45%",
        boxShadow: "0 0 20px rgba(255,20,147,0.3), 0 0 40px rgba(255,20,147,0.15)",
        zIndex: 1,
      }}
    />
  )
}

function VideoModal({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,6,16,0.95)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 transition-colors"
          style={{ color: "rgba(240,230,211,0.7)" }}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <video
          ref={videoRef}
          src={item.src}
          controls
          autoPlay
          className="w-full rounded-2xl"
          style={{ boxShadow: "0 0 60px rgba(255,20,147,0.3)" }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex items-end justify-between"
        >
          <div>
            <p className="text-2xl font-bold" style={{ color: "#f0e6d3", lineHeight: 1.4 }}>{item.caption}</p>
            <p className="mt-2" style={{ color: "rgba(240,230,211,0.5)", lineHeight: 1.6 }}>{item.date} · Graphikardia</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Videos() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const kanji = ["創", "美", "魂", "雅"]
  const lanternPositions = ["5%", "25%", "50%", "75%", "90%"]

  return (
    <section className="min-h-screen py-24 px-4 md:px-6" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {kanji.map((char, i) => (
        <FloatingKanji key={i} char={char} delay={i * 2} />
      ))}
      
      {lanternPositions.map((x, i) => (
        <Lantern key={i} x={x} delay={i * 0.5} />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="uppercase tracking-[0.3em] text-sm" style={{ color: "#ff1493", lineHeight: 2 }}>Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-3 mb-5" style={{ color: '#f0e6d3', lineHeight: 1.2 }}>
            Reels & <span style={{ color: '#ff1493' }}>Videos</span>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.8 }}>
            Creative video production, brand design, and visual storytelling from Graphikardia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ 
                background: "rgba(255,20,147,0.05)",
                border: "1px solid rgba(255,20,147,0.1)",
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <video
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  preload="metadata"
                  muted
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                />
                <div 
                  className="absolute inset-0 transition-opacity"
                  style={{
                    background: "linear-gradient(to top, rgba(10,6,16,0.9) 0%, rgba(10,6,16,0.3) 50%, transparent 100%)",
                  }}
                />
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
                      boxShadow: "0 0 30px rgba(255,20,147,0.5)",
                    }}
                  >
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
              
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded text-xs font-medium" style={{ 
                  background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
                  color: "white",
                }}>
                  VIDEO
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-medium" style={{ color: "#f0e6d3", lineHeight: 1.5 }}>{item.caption}</p>
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  border: "2px solid #ff1493",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.instagram.com/graphikardia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
            style={{
              border: "1.5px solid #ff1493",
              color: "#ff1493",
              background: "transparent",
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="tracking-wide">@graphikardia</span>
          </a>
        </motion.div>
      </div>

      {selectedItem && (
        <VideoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  )
}
