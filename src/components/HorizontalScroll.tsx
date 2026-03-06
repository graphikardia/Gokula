import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

const stories = [
  {
    id: 1,
    title: "Discovery",
    description: "We dive deep into understanding your brand, audience, and goals through research, stakeholder interviews, and data analysis.",
    stat: "2 weeks",
    statLabel: "Research Phase"
  },
  {
    id: 2,
    title: "Strategy",
    description: "Crafting a clear roadmap with defined objectives, KPIs, and actionable insights to guide the creative process.",
    stat: "15+",
    statLabel: "Deliverables"
  },
  {
    id: 3,
    title: "Create",
    description: "Transforming strategy into compelling visuals, videos, and experiences that resonate with your target audience.",
    stat: "50+",
    statLabel: "Assets Created"
  },
  {
    id: 4,
    title: "Optimize",
    description: "Leveraging data-driven insights to optimize campaigns, improve performance, and maximize ROI.",
    stat: "93%",
    statLabel: "Avg Reach Increase"
  },
  {
    id: 5,
    title: "Scale",
    description: "Continuous improvement and scaling strategies to sustain growth and maintain brand elevation.",
    stat: "3x",
    statLabel: "ROI Growth"
  }
]

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])

  return (
    <section ref={containerRef} className="h-[500vh] relative bg-black">
      <div className="sticky top-0 left-0 h-screen overflow-hidden">
        <div className="absolute top-8 left-8 z-20">
          <span className="text-[#ff1493] text-xs tracking-[0.3em] uppercase">My Process</span>
        </div>
        
        <div className="absolute top-8 right-8 z-20">
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">Progress</span>
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#ff1493]"
                style={{ scaleX: smoothProgress }}
              />
            </div>
          </div>
        </div>

        <motion.div style={{ x }} className="flex h-screen w-[500vw]">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="w-screen h-screen flex items-center justify-center px-12 md:px-24"
            >
              <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-[#ff1493] text-8xl font-bold opacity-20">
                    0{index + 1}
                  </span>
                  <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
                    {story.title}
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    {story.description}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="text-6xl font-bold text-[#ff1493] mb-2">
                    {story.stat}
                  </div>
                  <div className="text-white/40 uppercase tracking-wider text-sm">
                    {story.statLabel}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                          className="w-2 bg-[#ff1493] rounded-full"
                          style={{ height: 40 + Math.random() * 40 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {stories.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{
                backgroundColor: useTransform(
                  smoothProgress,
                  [i / stories.length, (i + 1) / stories.length],
                  ["rgba(255,255,255,0.2)", "#ff1493"]
                )
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
