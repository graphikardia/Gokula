import { motion } from "framer-motion"

const clients = [
  "Altius Hospital", "Medella Homoeo Clinic", "Dr. Darshana", 
  "Dr. Raksha Madhu", "Koshys Group", "RANVITA 2024", 
  "YUVA Summit India", "CMR University"
]

const stats = [
  { value: "93%", label: "Reach Increase" },
  { value: "212%", label: "Profile Growth" },
  { value: "25%", label: "Engagement Boost" },
  { value: "40%", label: "Unique Reach" },
  { value: "23%", label: "Patient Inflow" },
  { value: "24hr", label: "Turnaround" }
]

export default function Marquee() {
  return (
    <section className="py-16 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mb-12 text-center">
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
          className="text-3xl md:text-4xl font-bold mt-2"
          style={{ color: 'var(--text)' }}
        >
          Clients & Impact
        </motion.h2>
      </div>

      <div className="marquee-container mb-16">
        <div className="marquee-content">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 px-8 py-4 rounded-full glass-card"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border-gradient hover-lift"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
