import Hero from "../components/Hero"
import WebGLParticles from "../components/WebGLParticles"
import HorizontalScroll from "../components/HorizontalScroll"
import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"
import Testimonials from "../components/Testimonials"

export default function Home() {
  return (
    <main>
      <WebGLParticles />
      <Hero />
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-[#00F5D4] uppercase tracking-wider text-sm">Featured Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">Selected Projects</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <HorizontalScroll />
      <Testimonials />
    </main>
  )
}
