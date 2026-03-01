import { motion } from "framer-motion"

const list = [
  { q: "Transformed our reels growth — 10x views.", a: "Head of Marketing, Clinic A" },
  { q: "Rapid creatives with measurable lift.", a: "Founder, Medbrand" },
  { q: "Professional, fast turnaround for events.", a: "Hospital admin" }
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <h2 className="text-4xl text-center mb-8">What clients say</h2>
      <motion.div className="flex gap-6 overflow-x-auto px-6">
        {list.map((t, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="min-w-[320px] bg-neutral-900/40 rounded-xl p-6">
            <p className="mb-4">“{t.q}”</p>
            <p className="text-sm text-gray-300">{t.a}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
