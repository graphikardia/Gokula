import { Suspense, lazy, useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useLenis } from "./hooks/useLenis"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cursor from "./components/Cursor"
import ThemeToggle from "./components/ThemeToggle"
import Preloader from "./components/Preloader"
import PageTransition from "./components/PageTransition"
import Noise from "./components/Noise"
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

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Header />
      <Cursor />
      <ThemeToggle />
      <Noise />
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <Suspense fallback={<div />}>
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PageTransition>
                      <About />
                    </PageTransition>
                  }
                />
                <Route
                  path="/case-studies"
                  element={
                    <PageTransition>
                      <CaseStudies />
                    </PageTransition>
                  }
                />
                <Route
                  path="/projects/:slug"
                  element={
                    <PageTransition>
                      <ProjectDetail />
                    </PageTransition>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <PageTransition>
                      <Services />
                    </PageTransition>
                  }
                />
                <Route
                  path="/videos"
                  element={
                    <PageTransition>
                      <Videos />
                    </PageTransition>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        )}
      </AnimatePresence>
      <Footer />
    </>
  )
}
