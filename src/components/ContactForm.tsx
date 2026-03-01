import { useState } from "react"

export default function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error">(null)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setStatus("sending")
    try {
      // Replace with your Formspree endpoint or your API
      await fetch("https://formspree.io/f/yourFormId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      })
      setStatus("sent")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid gap-4">
      <input required value={state.name} onChange={e => setState(s => ({ ...s, name: e.target.value }))} placeholder="Name" className="p-3 bg-neutral-900 rounded" />
      <input required value={state.email} onChange={e => setState(s => ({ ...s, email: e.target.value }))} placeholder="Email" className="p-3 bg-neutral-900 rounded" />
      <textarea required value={state.message} onChange={e => setState(s => ({ ...s, message: e.target.value }))} placeholder="Message" className="p-3 bg-neutral-900 rounded h-40" />
      <button type="submit" className="bg-accent text-black py-3 rounded font-semibold">
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "sent" && <p className="text-green-400">Message sent — I’ll reply soon.</p>}
      {status === "error" && <p className="text-red-400">Something went wrong. Try again.</p>}
    </form>
  )
}
