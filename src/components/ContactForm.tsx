import { useState, useCallback } from "react"

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error">(null)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sanitized = sanitizeInput(e.target.value)
    setState(s => ({ ...s, [e.target.name]: sanitized }))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!validateEmail(state.email)) {
      setStatus("error")
      return
    }

    setStatus("sending")
    try {
      await fetch("https://formspree.io/f/yourFormId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(state.name),
          email: sanitizeInput(state.email),
          message: sanitizeInput(state.message)
        })
      })
      setStatus("sent")
      setState({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid gap-4">
      <input 
        required 
        name="name"
        value={state.name} 
        onChange={handleChange} 
        placeholder="Name" 
        maxLength={100}
        className="p-3 bg-neutral-900 rounded" 
      />
      <input 
        required 
        name="email"
        type="email"
        value={state.email} 
        onChange={handleChange} 
        placeholder="Email" 
        maxLength={254}
        className="p-3 bg-neutral-900 rounded" 
      />
      <textarea 
        required 
        name="message"
        value={state.message} 
        onChange={handleChange} 
        placeholder="Message" 
        className="p-3 bg-neutral-900 rounded h-40" 
        maxLength={2000}
      />
      <button type="submit" disabled={status === "sending"} className="bg-accent text-black py-3 rounded font-semibold disabled:opacity-50">
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "sent" && <p className="text-green-400">Message sent — I'll reply soon.</p>}
      {status === "error" && <p className="text-red-400">Something went wrong. Try again.</p>}
    </form>
  )
}
