import { motion } from "framer-motion"

const clients = [
  "Altius Hospital", "Medella Homoeo Clinic", "Dr. Darshana", 
  "Dr. Raksha Madhu", "Koshys Group", "RANVITA 2024", 
  "YUVA Summit India", "CMR University", "Graphikardia",
  "Healthcare Marketing", "Brand Strategy", "Video Production"
]

const stats = [
  { value: "93%", label: "Reach Increase", icon: "📈" },
  { value: "212%", label: "Profile Growth", icon: "📱" },
  { value: "25%", label: "Engagement Boost", icon: "💬" },
  { value: "40%", label: "Unique Reach", icon: "👥" },
  { value: "23%", label: "Patient Inflow", icon: "🏥" },
  { value: "24hr", label: "Turnaround", icon: "⚡" }
]

export default function Marquee() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#00f5d4] uppercase tracking-widest text-sm"
        >
          Trusted By & Results
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mt-2 font-display"
          style={{ color: 'var(--text)' }}
        >
          Clients & <span className="gradient-text">Impact</span>
        </motion.h2>
      </div>

      <div className="marquee-container mb-16">
        <div className="marquee-content">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 px-8 py-4 rounded-full glass-card mx-4"
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(0, 245, 212, 0.15)' }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg font-medium whitespace-nowrap font-body" style={{ color: 'var(--text)' }}>
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="marquee-container mb-16" style={{ direction: 'rtl' }}>
        <div className="marquee-content" style={{ animationDirection: 'reverse' }}>
          {[...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()].map((client, i) => (
            <motion.div
              key={i + 100}
              className="flex-shrink-0 px-8 py-4 rounded-full glass-card mx-4"
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg font-medium whitespace-nowrap font-body" style={{ color: 'var(--text-secondary)' }}>
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="text-center p-6 rounded-2xl border-gradient hover-lift cursor-pointer"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 font-display">{stat.value}</div>
              <div className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>
                <span className="mr-1">{stat.icon}</span>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
