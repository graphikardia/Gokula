import { motion } from "framer-motion"

const services = [
  {
    title: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing strategies tailored to your brand. From social commerce to performance marketing, I deliver measurable results that drive growth.",
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
    color: "#00f5d4"
  },
  {
    title: "Social Media Management",
    description: "End-to-end social media management including content strategy, community engagement, and growth optimization across platforms.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    color: "#c41e3a"
  },
  {
    title: "Video Production & Editing",
    description: "High-impact video content for reels, ads, and brand storytelling. From concept to final cut, creating scroll-stopping visuals.",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    color: "#00d4aa"
  },
  {
    title: "Meta & Google Ads",
    description: "Data-driven advertising campaigns that maximize ROI. Targeting, creative optimization, and conversion funnel management.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    color: "#3b82f6"
  },
  {
    title: "Brand Identity & Design",
    description: "Creating distinctive brand identities that resonate. Logo design, visual guidelines, and cohesive brand storytelling.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    color: "#f59e0b"
  },
  {
    title: "Creative Direction",
    description: "Guiding creative vision from concept to execution. Ensuring visual consistency and emotional resonance across all touchpoints.",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
    color: "#ec4899"
  }
]

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
  return (
    <section className="min-h-screen py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="mb-20 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#00f5d4] uppercase tracking-wider text-sm font-body"
            >
              What I Do
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mt-4 font-display"
              style={{ color: 'var(--text)' }}
            >
              My <span className="gradient-text">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl mt-6 max-w-2xl mx-auto font-body"
              style={{ color: 'var(--text-secondary)' }}
            >
              Delivering comprehensive creative solutions that elevate brands and drive measurable results.
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-2xl glass-card hover-lift group cursor-pointer h-full"
                style={{ border: '1px solid var(--glass-border)' }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${service.color}20` }}
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
                  className="text-xl font-bold mb-3 font-display group-hover:text-white transition-colors"
                  style={{ color: 'var(--text)' }}
                >
                  {service.title}
                </h3>
                
                <p 
                  className="leading-relaxed font-body"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {service.description}
                </p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 mt-6 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 rounded-3xl relative overflow-hidden"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f5d4]/5 via-[#c41e3a]/5 to-[#00d4aa]/5" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" style={{ color: 'var(--text)' }}>
                Ready to <span className="gradient-text">elevate</span> your brand?
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto font-body" style={{ color: 'var(--text-secondary)' }}>
                Let's collaborate to create compelling content and strategies that drive real results for your business.
              </p>
              <motion.a
                href="mailto:graphikardia@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-[#00f5d4] text-black font-bold rounded-full hover-lift glow-effect font-body"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
