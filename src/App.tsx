import { Suspense, lazy, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useLenis } from "./hooks/useLenis"
import { SoundProvider } from "./hooks/useSound"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cursor from "./components/Cursor"
import ThemeToggle from "./components/ThemeToggle"
import Preloader from "./components/Preloader"
import CinematicTransition from "./components/CinematicTransition"
import Noise from "./components/Noise"
import SoundToggle from "./components/SoundToggle"
const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const CaseStudies = lazy(() => import("./pages/CaseStudies"))
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"))
const Services = lazy(() => import("./pages/Services"))
const Videos = lazy(() => import("./pages/Videos"))
const NotFound = lazy(() => import("./pages/NotFound"))

export default function App() {
  useLenis()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  return (
    <SoundProvider>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <Header />
          <Cursor />
          <ThemeToggle />
          <SoundToggle />
          <Noise />
          
          <Suspense fallback={<div />}>
            <CinematicTransition>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CinematicTransition>
          </Suspense>
          
          <Footer />
        </>
      )}
    </SoundProvider>
  )
}
