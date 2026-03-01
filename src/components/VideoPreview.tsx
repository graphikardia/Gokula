import { useRef } from "react"

export default function VideoPreview({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)

  return (
    <div className="rounded-xl overflow-hidden">
      <video
        ref={ref}
        src={src}
        loop
        muted
        playsInline
        poster={poster}
        onMouseEnter={() => ref.current?.play()}
        onMouseLeave={() => ref.current?.pause()}
        preload="metadata"
        className="w-full h-auto object-cover transition-transform hover:scale-105"
      />
    </div>
  )
}
