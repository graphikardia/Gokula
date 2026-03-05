import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("theme") as "dark" | "light") || "dark"
  )

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    if (theme === "light") {
      root.classList.add("light")
      body.classList.add("light")
    } else {
      root.classList.remove("light")
      body.classList.remove("light")
    }
    
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header className="fixed top-0 w-full z-40 py-4 px-6 backdrop-blur" style={{ background: 'var(--header-bg)' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-lg tracking-wider z-50" style={{ color: 'var(--text)' }}>
            <span style={{ color: '#ff6b00' }}>⚔️</span> GOKULA
          </Link>
          
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/case-studies" className="hover:text-orange-400 transition-colors" style={{ color: 'var(--text)' }}>Work</Link>
            <Link to="/videos" className="hover:text-orange-400 transition-colors" style={{ color: 'var(--text)' }}>Videos</Link>
            <Link to="/services" className="hover:text-orange-400 transition-colors" style={{ color: 'var(--text)' }}>Services</Link>
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>
            <motion.a
              href="mailto:graphikardia@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 font-medium rounded-full text-sm"
              style={{ background: 'linear-gradient(135deg, #ff6b00, #ff8c00)', color: '#000' }}
            >
              Contact
            </motion.a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 block"
                style={{ background: 'var(--text)' }}
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 block"
                style={{ background: 'var(--text)' }}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 block"
                style={{ background: 'var(--text)' }}
              />
            </div>
          </button>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 backdrop-blur md:hidden"
        style={{ background: 'var(--bg)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold"
            style={{ color: 'var(--text)' }}
          >
            <span className="text-[#ff6b00]">GEETHA</span> GOKULA P
          </Link>
          <Link 
            to="/case-studies" 
            onClick={() => setIsOpen(false)}
            className="text-xl hover:text-[#ff6b00] transition-colors"
            style={{ color: 'var(--text)' }}
          >
            Work
          </Link>
          <Link 
            to="/videos" 
            onClick={() => setIsOpen(false)}
            className="text-xl hover:text-[#ff6b00] transition-colors"
            style={{ color: 'var(--text)' }}
          >
            Videos
          </Link>
          <Link 
            to="/services" 
            onClick={() => setIsOpen(false)}
            className="text-xl hover:text-[#ff6b00] transition-colors"
            style={{ color: 'var(--text)' }}
          >
            Services
          </Link>
          
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>

          <motion.a
            href="mailto:graphikardia@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#ff6b00] text-black font-bold rounded-full"
          >
            Contact
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}
