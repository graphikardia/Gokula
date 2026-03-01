import { useParams } from "react-router-dom"
import { projects } from "../data/projects"
import {
  CaseStudyHero,
  CaseStudyResults,
  ChallengeSolution,
  CaseStudyCTA,
  CaseStudyNavigation
} from "../components/CaseStudyLayout"
import VideoPreview from "../components/VideoPreview"

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <article>
      <CaseStudyHero
        title={project.title}
        category={project.category}
        year={project.year}
        client={project.client}
        image={project.hero}
      />
      
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <p className="text-xl leading-relaxed text-white/80">
          {project.summary}
        </p>
      </section>
      
      {project.hero && (
        <section className="px-6 pb-24">
          <img 
            src={project.hero} 
            alt={project.title} 
            className="w-full max-w-6xl mx-auto rounded-2xl shadow-2xl"
          />
        </section>
      )}
      
      <ChallengeSolution
        challenge="The client needed a modern, performant solution that would engage users while maintaining brand consistency across all touchpoints. Key challenges included optimizing for multiple devices and ensuring fast load times."
        solution="We developed a comprehensive solution leveraging modern technologies and best practices. The result is a seamless, performant experience that exceeded expectations and delivered measurable business value."
      />
      
      <CaseStudyResults
        stats={project.outcomes?.map(o => ({ value: o.v, label: o.k })) || [
          { value: "150%", label: "ROI Increase" },
          { value: "40%", label: "Conversion Boost" },
          { value: "2x", label: "User Engagement" },
          { value: "99.9%", label: "Uptime" }
        ]}
      />
      
      {(project.video || project.instagramUrl) && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">Project Preview</h3>
            <VideoPreview 
              src={project.video} 
              poster={project.hero}
              instagramUrl={project.instagramUrl}
            />
          </div>
        </section>
      )}
      
      <CaseStudyCTA
        title="Ready to start your project?"
        subtitle="Let's create something amazing together. My team is ready to bring your vision to life."
        buttonText="Get in Touch"
        buttonLink="/contact"
      />
      
      <CaseStudyNavigation 
        prev={prevProject ? `/projects/${prevProject.slug}` : undefined}
        next={nextProject ? `/projects/${nextProject.slug}` : undefined}
      />
    </article>
  )
}
