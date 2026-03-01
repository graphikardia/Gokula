import { motion } from "framer-motion"

const skills = [
  "Strategic Planning", "Social Commerce", "Creative Direction", "Digital Marketing",
  "Brand Identity", "Business Analytics", "Photography", "Meta Ads", "Google Ads",
  "Video Production", "Content Strategy", "Adobe Creative Suite"
]

const certifications = [
  "Google Digital Marketing Fundamentals",
  "Strategic Management",
  "Financial Marketing & Stock Markets"
]

const awards = [
  "YUVA Summit India Winner",
  "Best Core Organizing Team (RANVITA 2024)",
  "NCC 'C' Certificate Holder"
]

export default function About() {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[#00F5D4] uppercase tracking-wider text-sm">About Me</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-8">Geetha Gokula P</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 text-lg text-white/70"
        >
          <p>
            Innovative Creative Lead specializing in <span className="text-white">authentic storytelling</span>, 
            <span className="text-white"> high-impact video production</span>, and 
            <span className="text-white"> strategic social media management</span> for brand elevation. 
            Expert in managing on-ground content capture and Meta/Google Ads to foster community 
            engagement and deliver measurable results in fast-paced environments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          
          <div className="space-y-8">
            <div className="border-l-2 border-[#00F5D4] pl-6">
              <span className="text-[#00F5D4] text-sm">Oct 2024 – Present</span>
              <h3 className="text-xl font-semibold mt-1">Senior Graphic Designer & Video Editor</h3>
              <p className="text-white/60">Altius Multi-speciality Hospital, Bengaluru</p>
              <ul className="mt-4 space-y-2 text-white/70">
                <li>• Spearheaded end-to-end digital marketing and creative strategy, resulting in a 23% increase in patient inflow</li>
                <li>• Produced high-impact multimedia content including reels, WhatsApp Blasts, and Meta/Google Ad assets</li>
                <li>• Maintained a rapid 24-hour turnaround for event-based assets</li>
              </ul>
            </div>

            <div className="border-l-2 border-white/20 pl-6">
              <span className="text-white/40 text-sm">Sep 2025 – Dec 2025</span>
              <h3 className="text-xl font-semibold mt-1">Social Media Manager</h3>
              <p className="text-white/60">Medella Homoeo Clinic (Remote)</p>
              <ul className="mt-4 space-y-2 text-white/70">
                <li>• Established clinic's Instagram & Google Profile from ground up</li>
                <li>• Scaled account reach from 700 to 18,000 views within 90 days</li>
                <li>• Achieved 93% increase in overall account reach and 212% surge in profile activity</li>
              </ul>
            </div>

            <div className="border-l-2 border-white/20 pl-6">
              <span className="text-white/40 text-sm">2024</span>
              <h3 className="text-xl font-semibold mt-1">Digital Impact Strategy Lead</h3>
              <p className="text-white/60">Graphikardia</p>
              <ul className="mt-4 space-y-2 text-white/70">
                <li>• Doubled account visibility from 12k to 24k views in 90 days</li>
                <li>• Achieved 40% increase in unique reach</li>
                <li>• Maintained 4,000+ views per video benchmark</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold">MBA in Digital Marketing & Business Analytics</h3>
                <p className="text-white/60">CMR University, Bengaluru</p>
              </div>
              <span className="text-[#00F5D4]">2022 – 2024</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Bachelor of Commerce (B.Com)</h3>
                <p className="text-white/60">CMR University, Bengaluru</p>
              </div>
              <span className="text-white/40">2018 – 2021</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div>
            <h2 className="text-2xl font-bold mb-6">Certifications</h2>
            <ul className="space-y-2">
              {certifications.map((cert, i) => (
                <li key={i} className="text-white/70 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00F5D4] rounded-full" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Awards & Honors</h2>
            <ul className="space-y-2">
              {awards.map((award, i) => (
                <li key={i} className="text-white/70 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00F5D4] rounded-full" />
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="tel:+917975594203" className="flex items-center gap-4 text-white/70 hover:text-[#00F5D4] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 7975594203
            </a>
            <a href="mailto:graphikardia@gmail.com" className="flex items-center gap-4 text-white/70 hover:text-[#00F5D4] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              graphikardia@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
