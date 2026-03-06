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
        fontSize: "clamp(8rem, 18vw, 16rem)",
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
  const kanji = ["創", "美", "魂", "雅"]

  return (
    <section className="min-h-screen py-24 px-4 md:px-6" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {kanji.map((char, i) => (
        <FloatingKanji key={i} char={char} delay={i * 2.5} />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="uppercase tracking-[0.3em] text-sm"
                style={{ color: "#ff1493", lineHeight: 2 }}
              >
                About Me
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold mt-4 mb-6"
                style={{ color: '#f0e6d3', lineHeight: 1.2 }}
              >
                Geetha <span style={{ color: '#ff1493' }}>Gokula P</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative inline-block mb-8"
              >
                <img 
                  src="https://lookaside.fbsbx.com/lookaside/crawler/instagram/graphikardia/profile_pic.jpg" 
                  alt="Geetha Gokula P"
                  className="w-32 h-32 rounded-2xl object-cover"
                  style={{ boxShadow: "0 0 30px rgba(255,20,147,0.3)" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 -right-4 px-3 py-2 text-xs font-bold rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
                    color: "white",
                  }}
                >
                  Available
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg leading-relaxed"
                style={{ color: 'rgba(240,230,211,0.7)', lineHeight: 1.8 }}
              >
                Innovative <span style={{ color: '#ff1493' }}>Creative Lead</span> specializing in 
                <span style={{ color: '#f0e6d3' }}> authentic storytelling</span>, 
                <span style={{ color: '#f0e6d3' }}> high-impact video production</span>, and 
                <span style={{ color: '#f0e6d3' }}> strategic social media management</span> for brand elevation.
              </motion.p>
            </div>

            <div className="space-y-5">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-2xl cursor-pointer"
                  style={{ 
                    background: "rgba(255,20,147,0.05)",
                    border: "1px solid rgba(255,20,147,0.1)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,20,147,0.1)" }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#ff1493" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#f0e6d3', lineHeight: 1.4 }}>{award}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#f0e6d3', lineHeight: 1.3 }}>
              Work <span style={{ color: '#ff1493' }}>Experience</span>
            </h2>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{
                      background: "linear-gradient(to bottom, #ff1493, rgba(255,20,147,0.3), transparent)",
                    }}
                  />
                  <div className="ml-8 p-6 rounded-2xl" style={{ 
                    background: "rgba(255,20,147,0.03)",
                    border: "1px solid rgba(255,20,147,0.1)",
                  }}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <span style={{ color: "#ff1493", lineHeight: 1.5 }}>{exp.period}</span>
                        <h3 className="text-xl font-bold mt-1" style={{ color: '#f0e6d3', lineHeight: 1.4 }}>{exp.role}</h3>
                        <p style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.6 }}>{exp.company}</p>
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
                          className="flex items-start gap-3"
                          style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.6 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#ff1493" }} />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#f0e6d3', lineHeight: 1.3 }}>
                <span style={{ color: '#ff1493' }}>Education</span>
              </h2>
              <div className="space-y-5">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl cursor-pointer"
                    style={{ 
                      background: "rgba(255,20,147,0.03)",
                      border: "1px solid rgba(255,20,147,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,20,147,0.1)" }}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#ff1493" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: '#f0e6d3', lineHeight: 1.4 }}>{edu.degree}</h3>
                        <p className="text-sm" style={{ color: 'rgba(240,230,211,0.6)', lineHeight: 1.5 }}>{edu.school}</p>
                      </div>
                    </div>
                    <span className="text-sm" style={{ color: 'rgba(240,230,211,0.4)', lineHeight: 1.6 }}>{edu.period}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#f0e6d3', lineHeight: 1.3 }}>
                <span style={{ color: '#ff1493' }}>Skills</span>
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
                    className="px-4 py-2 rounded-full text-sm cursor-default"
                    style={{ 
                      background: "rgba(255,20,147,0.08)",
                      border: "1px solid rgba(255,20,147,0.15)",
                      color: 'rgba(240,230,211,0.7)',
                      lineHeight: 1.5,
                    }}
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
            className="p-8 rounded-3xl text-center"
            style={{ 
              background: "rgba(255,20,147,0.03)",
              border: '1px solid rgba(255,20,147,0.1)',
            }}
          >
            <h2 className="text-2xl font-bold mb-8" style={{ color: '#f0e6d3', lineHeight: 1.3 }}>
              Let's <span style={{ color: '#ff1493' }}>Connect</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <motion.a
                href="tel:+917975594203"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 p-4 rounded-xl"
                style={{ 
                  background: "rgba(255,20,147,0.05)",
                  border: "1px solid rgba(255,20,147,0.1)",
                  color: '#f0e6d3',
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#ff1493" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 7975594203</span>
              </motion.a>
              <motion.a
                href="mailto:graphikardia@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 p-4 rounded-xl"
                style={{ 
                  background: "rgba(255,20,147,0.05)",
                  border: "1px solid rgba(255,20,147,0.1)",
                  color: '#f0e6d3',
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#ff1493" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>graphikardia@gmail.com</span>
              </motion.a>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
