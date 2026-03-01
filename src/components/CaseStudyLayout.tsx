import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface CaseStudyHeroProps {
  title: string
  category: string
  year: string
  client: string
  image: string
}

export function CaseStudyHero({ title, category, year, client, image }: CaseStudyHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-end pb-24 px-6">
      <div className="absolute inset-0 z-0">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#00F5D4] uppercase tracking-wider text-sm"
        >
          {category}
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mt-4 mb-8"
        >
          {title}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-8"
        >
          <div>
            <span className="text-white/40 text-sm uppercase tracking-wider">Client</span>
            <p className="text-xl mt-1">{client}</p>
          </div>
          <div>
            <span className="text-white/40 text-sm uppercase tracking-wider">Year</span>
            <p className="text-xl mt-1">{year}</p>
          </div>
          <div>
            <span className="text-white/40 text-sm uppercase tracking-wider">Services</span>
            <p className="text-xl mt-1">{category}</p>
          </div>
          <div>
            <span className="text-white/40 text-sm uppercase tracking-wider">Role</span>
            <p className="text-xl mt-1">Full Service</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface StatProps {
  value: string
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold text-[#00F5D4]">{value}</div>
      <div className="text-white/60 mt-2">{label}</div>
    </motion.div>
  )
}

interface CaseStudyResultsProps {
  stats: { value: string; label: string }[]
}

export function CaseStudyResults({ stats }: CaseStudyResultsProps) {
  return (
    <section className="py-24 px-6 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-16"
        >
          Results & Impact
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <Stat key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ChallengeSolutionProps {
  challenge: string
  solution: string
}

export function ChallengeSolution({ challenge, solution }: ChallengeSolutionProps) {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#00F5D4] uppercase tracking-wider text-sm">The Challenge</span>
          <h3 className="text-2xl font-bold mt-4 mb-6">What We Faced</h3>
          <p className="text-white/70 leading-relaxed">{challenge}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#00F5D4] uppercase tracking-wider text-sm">Our Solution</span>
          <h3 className="text-2xl font-bold mt-4 mb-6">How We Solved It</h3>
          <p className="text-white/70 leading-relaxed">{solution}</p>
        </motion.div>
      </div>
    </section>
  )
}

interface CaseStudyCTAProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export function CaseStudyCTA({ title, subtitle, buttonText, buttonLink }: CaseStudyCTAProps) {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F5D4]/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 mb-10"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to={buttonLink}
            className="inline-block px-10 py-4 bg-[#00F5D4] text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export function CaseStudyNavigation({ prev, next }: { prev?: string; next?: string }) {
  return (
    <section className="py-16 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between">
        {prev ? (
          <Link to={prev} className="text-white/60 hover:text-[#00F5D4] transition-colors">
            ← Previous Project
          </Link>
        ) : <div />}
        
        {next ? (
          <Link to={next} className="text-white/60 hover:text-[#00F5D4] transition-colors">
            Next Project →
          </Link>
        ) : <div />}
      </div>
    </section>
  )
}
