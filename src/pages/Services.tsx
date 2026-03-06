import { motion } from "framer-motion"

const services = [
  {
    title: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing strategies tailored to your brand. From social commerce to performance marketing, I deliver measurable results that drive growth.",
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
    color: "#ff1493"
  },
  {
    title: "Social Media Management",
    description: "End-to-end social media management including content strategy, community engagement, and growth optimization across platforms.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    color: "#ff69b4"
  },
  {
    title: "Video Production & Editing",
    description: "High-impact video content for reels, ads, and brand storytelling. From concept to final cut, creating scroll-stopping visuals.",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    color: "#ff1493"
  },
  {
    title: "Meta & Google Ads",
    description: "Data-driven advertising campaigns that maximize ROI. Targeting, creative optimization, and conversion funnel management.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    color: "#ff69b4"
  },
  {
    title: "Brand Identity & Design",
    description: "Creating distinctive brand identities that resonate. Logo design, visual guidelines, and cohesive brand storytelling.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    color: "#ff1493"
  },
  {
    title: "Creative Direction",
    description: "Guiding creative vision from concept to execution. Ensuring visual consistency and emotional resonance across all touchpoints.",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
    color: "#ff69b4"
  }
]

function FloatingKanji({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ 
        opacity: [0, 0.05, 0.02, 0.05, 0],
        scale: [0.3, 1, 1.1, 1, 0.3],
      }}
      transition={{ 
        duration: 20, 
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        fontSize: "clamp(10rem, 25vw, 22rem)",
        fontWeight: 100,
        color: "#ff1493",
        fontFamily: "var(--font-jp-serif)",
        pointerEvents: "none",
        zIndex: 0,
        textShadow: "0 0 50px rgba(255,20,147,0.3)",
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
        opacity: [0, 0.35, 0.15, 0.35, 0],
        y: [0, 8, 0, 8, 0]
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
        top: "8%",
        width: 16,
        height: 26,
        background: "linear-gradient(180deg, rgba(255,20,100,0.5) 0%, rgba(255,20,147,0.35) 100%)",
        borderRadius: "40% 40% 45% 45%",
        boxShadow: "0 0 18px rgba(255,20,147,0.3), 0 0 35px rgba(255,20,147,0.15)",
        zIndex: 1,
      }}
    />
  )
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Services() {
  const kanji = ["創", "美", "魂", "雅", "空"]
  const lanternPositions = ["3%", "23%", "43%", "63%", "83%", "97%"]

  return (
    <section className="min-h-screen py-24 px-4 md:px-6" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {kanji.map((char, i) => (
        <FloatingKanji key={i} char={char} delay={i * 2} />
      ))}
      
      {lanternPositions.map((x, i) => (
        <Lantern key={i} x={x} delay={i * 0.4} />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="mb-20 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="uppercase tracking-[0.3em] text-sm"
              style={{ color: "#ff1493", lineHeight: 2 }}
            >
              What I Do
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mt-4"
              style={{ color: '#f0e6d3', lineHeight: 1.2 }}
            >
              My <span style={{ color: '#ff1493' }}>Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl mt-6 max-w-2xl mx-auto"
              style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.8 }}
            >
              Delivering comprehensive creative solutions that elevate brands and drive measurable results.
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-7 rounded-2xl cursor-pointer h-full"
                style={{ 
                  background: "rgba(255,20,147,0.03)",
                  border: "1px solid rgba(255,20,147,0.1)",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <svg 
                    className="w-7 h-7" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke={service.color}
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                  </svg>
                </motion.div>
                
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: '#f0e6d3', lineHeight: 1.4 }}
                >
                  {service.title}
                </h3>
                
                <p 
                  className="leading-relaxed"
                  style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.8 }}
                >
                  {service.description}
                </p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 mt-5 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 rounded-3xl relative overflow-hidden"
            style={{ 
              background: "rgba(255,20,147,0.03)",
              border: '1px solid rgba(255,20,147,0.15)',
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(255,20,147,0.08) 0%, rgba(255,105,180,0.04) 50%, rgba(255,20,147,0.08) 100%)",
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f0e6d3', lineHeight: 1.3 }}>
                  Also check out my <span style={{ color: '#ff1493' }}>company</span>
                </h2>
                <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.8 }}>
                  Graphikardia - Creative design studio specializing in brand identity, video production, and digital marketing.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.a
                  href="https://www.graphikardia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
                    color: "white",
                    boxShadow: "0 0 30px rgba(255,20,147,0.4)",
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="font-medium tracking-wide">Visit Graphikardia</span>
                </motion.a>

                <motion.a
                  href="https://www.graphikardia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full"
                  style={{
                    border: "1.5px solid rgba(255,20,147,0.4)",
                    color: "#ff1493",
                  }}
                >
                  <span className="text-sm tracking-wide">View Portfolio</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              className="absolute top-0 right-0 w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,20,147,0.15) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-10 rounded-3xl relative overflow-hidden text-center"
            style={{ 
              background: "rgba(255,20,147,0.03)",
              border: '1px solid rgba(255,20,147,0.1)',
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#f0e6d3', lineHeight: 1.3 }}>
              Ready to <span style={{ color: '#ff1493' }}>elevate</span> your brand?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.8 }}>
              Let's collaborate to create compelling content and strategies that drive real results for your business.
            </p>
            <motion.a
              href="mailto:graphikardia@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 rounded-full font-medium"
              style={{
                background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
                color: "white",
                boxShadow: "0 0 30px rgba(255,20,147,0.4)",
              }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
