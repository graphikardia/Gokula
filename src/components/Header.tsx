import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 py-4 px-6 backdrop-blur bg-black/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">GEETHA</Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/case-studies">Work</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  )
}
