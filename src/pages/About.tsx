import { motion } from "framer-motion"

const skills = [
  "Strategic Planning", "Social Commerce", "Creative Direction", "Digital Marketing",
  "Brand Identity", "Business Analytics", "Photography", "Meta Ads", "Google Ads",
  "Video Production", "Content Strategy", "Adobe Creative Suite"
]

const awards = [
  "YUVA Summit India Winner",
  "Best Core Organizing Team (RANVITA 2024)",
  "NCC 'C' Certificate Holder"
]

const experiences = [
  {
    period: "Oct 2024 – Present",
    role: "Senior Graphic Designer & Video Editor",
    company: "Altius Multi-speciality Hospital, Bengaluru",
    highlights: [
      "23% increase in patient inflow through digital marketing",
      "High-impact multimedia content including reels & ads",
      "24-hour rapid turnaround for event-based assets"
    ]
  },
  {
    period: "Sep 2025 – Dec 2025",
    role: "Social Media Manager",
    company: "Medella Homoeo Clinic (Remote)",
    highlights: [
      "Scaled Instagram from 700 to 18,000 views in 90 days",
      "93% increase in overall account reach",
      "212% surge in profile activity"
    ]
  },
  {
    period: "2024",
    role: "Digital Impact Strategy Lead",
    company: "Graphikardia",
    highlights: [
      "Doubled account visibility from 12k to 24k views",
      "40% increase in unique reach",
      "Maintained 4,000+ views per video benchmark"
    ]
  }
]

const education = [
  {
    degree: "MBA in Digital Marketing & Business Analytics",
    school: "CMR University, Bengaluru",
    period: "2022 – 2024"
  },
  {
    degree: "Bachelor of Commerce (B.Com)",
    school: "CMR University, Bengaluru",
    period: "2018 – 2021"
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

export default function About() {
  return (
    <section className="min-h-screen py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[#00f5d4] uppercase tracking-wider text-sm font-body"
              >
                About Me
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold mt-4 mb-6 font-display"
                style={{ color: 'var(--text)' }}
              >
                Geetha <span className="gradient-text">Gokula P</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <img 
                  src="https://lookaside.fbsbx.com/lookaside/crawler/instagram/graphikardia/profile_pic.jpg" 
                  alt="Geetha Gokula P"
                  className="w-32 h-32 rounded-2xl object-cover mb-8"
                />
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 px-2 -right-4 py-2 bg-[#00f5d4] text-black text-sm font-bold rounded-full"
                >
                  Available
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg leading-relaxed font-body"
                style={{ color: 'var(--text-secondary)' }}
              >
                Innovative <span className="text-[#00f5d4]">Creative Lead</span> specializing in 
                <span className="text-white"> authentic storytelling</span>, 
                <span className="text-white"> high-impact video production</span>, and 
                <span className="text-white"> strategic social media management</span> for brand elevation.
              </motion.p>
            </div>

            <div className="space-y-6">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="p-6 rounded-2xl glass-card hover-lift border-gradient"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00f5d4]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#00f5d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold font-display" style={{ color: 'var(--text)' }}>{award}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 font-display" style={{ color: 'var(--text)' }}>
              Work <span className="gradient-text">Experience</span>
            </h2>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f5d4] via-[#8b5cf6] to-transparent" />
                  <div className="ml-8 p-8 rounded-2xl glass-card hover-lift">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <span className="text-[#00f5d4] text-sm font-body">{exp.period}</span>
                        <h3 className="text-xl font-bold mt-1 font-display" style={{ color: 'var(--text)' }}>{exp.role}</h3>
                        <p className="font-body" style={{ color: 'var(--text-secondary)' }}>{exp.company}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (i * 0.05) }}
                          className="flex items-start gap-3 font-body"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] mt-2 flex-shrink-0" />
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-display" style={{ color: 'var(--text)' }}>
                <span className="gradient-text">Education</span>
              </h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl glass-card hover-lift"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00f5d4]/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#00f5d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold font-display" style={{ color: 'var(--text)' }}>{edu.degree}</h3>
                        <p className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>{edu.school}</p>
                      </div>
                    </div>
                    <span className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>{edu.period}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-display" style={{ color: 'var(--text)' }}>
                <span className="gradient-text">Skills</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full glass-card font-body text-sm cursor-default hover:text-[#00f5d4] transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl glass-card border-gradient text-center"
          >
            <h2 className="text-2xl font-bold mb-8 font-display" style={{ color: 'var(--text)' }}>
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <motion.a
                href="tel:+917975594203"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 p-4 rounded-xl glass-card hover-lift"
                style={{ color: 'var(--text)' }}
              >
                <svg className="w-6 h-6 text-[#00f5d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-body">+91 7975594203</span>
              </motion.a>
              <motion.a
                href="mailto:graphikardia@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 p-4 rounded-xl glass-card hover-lift"
                style={{ color: 'var(--text)' }}
              >
                <svg className="w-6 h-6 text-[#00f5d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-body">graphikardia@gmail.com</span>
              </motion.a>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
