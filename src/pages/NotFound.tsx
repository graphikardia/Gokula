import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-6">404</h1>
        <p className="mb-6">Page not found</p>
        <Link to="/" className="underline">Back home</Link>
      </div>
    </section>
  )
}
