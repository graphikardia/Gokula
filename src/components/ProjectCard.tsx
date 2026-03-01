import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import VideoPreview from "./VideoPreview"

export default function ProjectCard({ project }: any) {
  return (
    <motion.article whileHover={{ scale: 1.02 }} className="rounded-xl overflow-hidden bg-neutral-900/40 p-4">
      <Link to={`/projects/${project.slug}`}>
        <div className="mb-4">
          <img src={project.hero} alt={project.title} className="w-full rounded" />
        </div>
        <h3 className="text-2xl font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-400 mt-2">{project.role} • {project.year}</p>
      </Link>
    </motion.article>
  )
}
