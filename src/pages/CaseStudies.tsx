import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"

export default function CaseStudies() {
  return (
    <section className="min-h-screen py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="text-[#00F5D4] uppercase tracking-wider text-sm">Portfolio</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Case Studies</h1>
        <p className="text-xl text-white/60 max-w-2xl">
          A showcase of my work in digital marketing, video production, and brand strategy. 
          Each project represents measurable results and creative excellence.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
