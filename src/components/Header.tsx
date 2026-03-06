import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import AnimatedLogo from "./AnimatedLogo"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("theme") as "dark" | "light") || "dark"
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const navLinks = [
    { to: "/case-studies", label: "Work", jp: "仕事" },
    { to: "/videos", label: "Videos", jp: "動画" },
    { to: "/services", label: "Services", jp: "サービス" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 px-4 md:px-6 py-3"
        style={{
          background: scrolled 
            ? "rgba(10, 6, 16, 0.9)" 
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled 
            ? "1px solid rgba(255,20,147,0.1)" 
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 z-50">
            <AnimatedLogo size="sm" showText={false} />
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-lg tracking-[0.2em]"
              style={{ color: '#f0e6d3', lineHeight: 1.3 }}
            >
              GOKULA
            </motion.span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Link 
                  to={link.to}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg group"
                >
                  <span 
                    className="text-sm tracking-[0.15em] transition-colors"
                    style={{ color: 'rgba(240,230,211,0.7)', lineHeight: 1.5 }}
                  >
                    {link.label}
                  </span>
                  <span 
                    className="text-xs opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ color: '#ff1493', lineHeight: 1.5 }}
                  >
                    {link.jp}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-4 right-4 h-px"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    style={{ background: "linear-gradient(90deg, #ff1493, transparent)" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full"
              style={{ 
                background: "rgba(255,20,147,0.1)", 
                border: "1px solid rgba(255,20,147,0.2)",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="#ffd700" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="#1a1a1a" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>

            <motion.a
              href="mailto:graphikardia@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 font-medium rounded-full text-sm relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
                color: 'white',
              }}
            >
              <span className="relative z-10">Contact</span>
              <motion.div
                className="absolute inset-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                style={{
                  background: "linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)",
                }}
              />
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8, width: "100%" } : { rotate: 0, y: 0, width: "60%" }}
                className="h-0.5 block"
                style={{ background: '#ff1493' }}
              />
              <motion.span
                animate={isOpen ? { opacity: 0, width: "100%" } : { opacity: 1, width: "100%" }}
                className="h-0.5 block"
                style={{ background: '#ff1493' }}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8, width: "100%" } : { rotate: 0, y: 0, width: "40%" }}
                className="h-0.5 block"
                style={{ background: '#ff1493' }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ 
              background: "linear-gradient(180deg, rgba(10,6,16,0.98) 0%, rgba(20,10,25,0.98) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <AnimatedLogo size="lg" />
              </motion.div>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link 
                    to={link.to} 
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center gap-1"
                  >
                    <span 
                      className="text-2xl font-light tracking-[0.3em]"
                      style={{ color: '#f0e6d3', lineHeight: 1.4 }}
                    >
                      {link.label}
                    </span>
                    <span 
                      className="text-sm tracking-widest"
                      style={{ color: '#ff1493', lineHeight: 1.5 }}
                    >
                      {link.jp}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-full"
                  style={{ 
                    background: "rgba(255,20,147,0.1)", 
                    border: "1px solid rgba(255,20,147,0.3)",
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <svg className="w-6 h-6" fill="#ffd700" viewBox="0 0 24 24">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="#1a1a1a" viewBox="0 0 24 24">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </motion.button>
              </motion.div>

              <motion.a
                href="mailto:graphikardia@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-8 py-4 font-bold rounded-full"
                style={{
                  background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)",
                  color: 'white',
                  boxShadow: "0 0 30px rgba(255,20,147,0.4)",
                }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
