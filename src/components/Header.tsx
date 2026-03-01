import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 py-4 px-6 backdrop-blur bg-black/30">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg tracking-wider">
          <span className="text-[#00F5D4]">GEETHA</span> GOKULA P
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/case-studies" className="hover:text-[#00F5D4] transition-colors">Work</Link>
          <Link to="/videos" className="hover:text-[#00F5D4] transition-colors">Videos</Link>
          <Link to="/services" className="hover:text-[#00F5D4] transition-colors">Services</Link>
          <motion.a
            href="mailto:cmrgokula2000@gmail.com"
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-[#00F5D4] text-black font-medium rounded-full text-sm"
          >
            Contact
          </motion.a>
        </nav>
      </div>
    </header>
  )
}
