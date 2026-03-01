import { useCallback, useEffect } from "react"
import { useSound } from "./useSound"

export function useSoundHover(element: HTMLElement | null) {
  const { playHover } = useSound()

  useEffect(() => {
    if (!element) return

    element.addEventListener("mouseenter", playHover)
    return () => element.removeEventListener("mouseenter", playHover)
  }, [element, playHover])
}

export function withSound<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function SoundfulComponent(props: P) {
    const { playClick, playHover } = useSound()

    const handleMouseEnter = useCallback(() => {
      playHover()
    }, [playHover])

    const handleClick = useCallback(() => {
      playClick()
    }, [playClick])

    return (
      <Component
        {...props}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      />
    )
  }
}
