export const ease = [0.76, 0, 0.24, 1] as const

export const motionVariants = {
  pageEnter: {
    initial: { y: "100%" },
    animate: { y: "0%" },
    exit: { y: "-100%" },
    transition: { duration: 0.9, ease }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease }
  }
}
