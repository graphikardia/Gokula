import VideoPreview from "../components/VideoPreview"
import { projects } from "../data/projects"

export default function Videos() {
  return (
    <section className="min-h-screen py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl mb-8">Video Work</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map(p => (
          <VideoPreview key={p.slug} src={p.video ?? "/assets/hero-video.mp4"} poster={p.hero} />
        ))}
      </div>
    </section>
  )
}
