export default function Noise() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none opacity-10 mix-blend-overlay"
      style={{
        backgroundImage: "url('/assets/noise.png')",
        backgroundRepeat: "repeat",
        zIndex: 20
      }}
    />
  )
}
