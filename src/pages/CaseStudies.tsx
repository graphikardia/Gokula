import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"

export default function CaseStudies() {
  return (
    <section className="min-h-screen py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl mb-8">Case Studies</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
