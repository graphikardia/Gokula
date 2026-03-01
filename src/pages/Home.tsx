import Hero from "../components/Hero"
import WebGLParticles from "../components/WebGLParticles"
import HorizontalScroll from "../components/HorizontalScroll"
import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"
import ScrollPath from "../components/ScrollPath"
import Testimonials from "../components/Testimonials"

export default function Home() {
  return (
    <main>
      <WebGLParticles />
      <Hero />
      <section className="py-24">
        <h2 className="text-4xl text-center mb-12">Featured Work</h2>
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 px-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <HorizontalScroll />
      <ScrollPath />
      <Testimonials />
    </main>
  )
}
