import { useParams, Link } from "react-router-dom"
import { projects } from "../data/projects"
import VideoPreview from "../components/VideoPreview"

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>

  return (
    <section className="min-h-screen py-20 px-6 max-w-6xl mx-auto">
      <Link to="/case-studies" className="text-sm underline mb-8 inline-block">← Back</Link>
      <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-400 mb-8">{project.summary}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={project.hero} alt={project.title} className="rounded-xl shadow-lg" />
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Outcomes</h4>
          <ul className="space-y-2">
            {project.outcomes?.map((o: any, i: number) => (
              <li key={i} className="text-gray-200">
                <strong>{o.k}:</strong> {o.v}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4">Preview</h4>
            {project.video ? <VideoPreview src={project.video} /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
