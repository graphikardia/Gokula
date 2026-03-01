import { motion } from "framer-motion"

interface InstagramPost {
  id: string
  thumbnail: string
  caption: string
  permalink: string
}

const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    thumbnail: "https://scontent.cdninstagram.com/v/t51.29350-15/475912337_1221076107824695_8547522956647655533_n.jpg?stp=dst-jpg_e15&_nc_cat=107&ccb=1-7&_nc_sid=18de54&efg=eyJpIjoxLCJ2IjoiMSJ9",
    caption: "Creative direction & motion design",
    permalink: "https://www.instagram.com/p/DLGPZqRyj1x/"
  },
  {
    id: "2", 
    thumbnail: "https://scontent.cdninstagram.com/v/t51.29350-15/475785819_1220782541187567_4404849270676526093_n.jpg?stp=dst-jpg_e15&_nc_cat=105&ccb=1-7&_nc_sid=18de54&efg=eyJpIjoxLCJ2IjoiMSJ9",
    caption: "Brand identity showcase",
    permalink: "https://www.instagram.com/p/DLGPE8pyt8kO/"
  },
  {
    id: "3",
    thumbnail: "https://scontent.cdninstagram.com/v/t51.29350-15/475120773_1019056526105419_7797844569987644588_n.jpg?stp=dst-jpg_e15&_nc_cat=108&ccb=1-7&_nc_sid=18de54&efg=eyJpIjoxLCJ2IjoiMSJ9",
    caption: "Digital experience design",
    permalink: "https://www.instagram.com/p/DLGPF0qS_3b/"
  },
  {
    id: "4",
    thumbnail: "https://scontent.cdninstagram.com/v/t51.29350-15/475043577_1018963482817768_8850961279939717225_n.jpg?stp=dst-jpg_e15&_nc_cat=102&ccb=1-7&_nc_sid=18de54&efg=eyJpIjoxLCJ2IjoiMSJ9",
    caption: "Motion graphics & video editing",
    permalink: "https://www.instagram.com/p/DLGPGMSBT5B/"
  },
  {
    id: "5",
    thumbnail: "https://scontent.cdninstagram.com/v/t51.29350-15/474512948_1018311689549286_920176766583095779_n.jpg?stp=dst-jpg_e15&_nc_cat=108&ccb=1-7&_nc_sid=18de54&efg=eyJpIjoxLCJ2IjoiMSJ9",
    caption: "UI/UX design & prototyping",
    permalink: "https://www.instagram.com/p/DLGPHJXs9G8/"
  },
  {
    id: "6",
    thumbnail: "https://scontent.cdninstagram.com/v/t51.29350-15/474221044_1017803776107616_5681171555209499298_n.jpg?stp=dst-jpg_e15&_nc_cat=108&ccb=1-7&_nc_sid=18de54&efg=eyJpIjoxLCJ2IjoiMSJ9",
    caption: "Performance marketing creatives",
    permalink: "https://www.instagram.com/p/DLGPIMXS5wH/"
  }
]

export default function Videos() {
  return (
    <section className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Reels & Videos</h1>
        <p className="text-white/60 text-lg max-w-2xl">
          Latest content from our Instagram @graphikardia — creative direction, 
          motion design, and brand storytelling.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instagramPosts.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900"
          >
            <img
              src={post.thumbnail}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-[#00F5D4] flex items-center justify-center">
                <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-medium">{post.caption}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.a
        href="https://www.instagram.com/graphikardia/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="inline-flex items-center gap-2 mt-12 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span>Follow @graphikardia</span>
      </motion.a>
    </section>
  )
}
