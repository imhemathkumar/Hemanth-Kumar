
"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"

interface Position {
  x: number
  y: number
}

interface ElementDimensions {
  width: number
  height: number
  borderRadius: string
}

interface CursorContextType {
  cursorType: "default" | "link" | "button" | "interactive" | "hidden"
  setCursorType: React.Dispatch<
    React.SetStateAction<
      "default" | "link" | "button" | "interactive" | "hidden"
    >
  >
  isHovering: boolean
  setIsHovering: (isHovering: boolean) => void
  isInverted: boolean
  setIsInverted: (isInverted: boolean) => void
  magneticTarget: Position | null
  setMagneticTarget: (target: Position | null) => void
  isClicking: boolean
  setIsClicking: (isClicking: boolean) => void
  hoveredElementDimensions: ElementDimensions | null
  setHoveredElementDimensions: (
    dimensions: ElementDimensions | null
  ) => void
}

const CursorContext = createContext<CursorContextType | undefined>(
  undefined
)

export function CursorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cursorType, setCursorType] = useState<
    "default" | "link" | "button" | "interactive" | "hidden"
  >("default")

  const [isHovering, setIsHovering] = useState(false)
  const [isInverted, setIsInverted] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [magneticTarget, setMagneticTarget] =
    useState<Position | null>(null)
  const [isClicking, setIsClicking] = useState(false)

  const [hoveredElementDimensions, setHoveredElementDimensions] =
    useState<ElementDimensions | null>(null)

  // Detect devices that support a mouse or trackpad.
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    )

    const checkTouch = () => {
      setIsTouchDevice(!mediaQuery.matches)
    }

    checkTouch()
    mediaQuery.addEventListener("change", checkTouch)

    return () => {
      mediaQuery.removeEventListener("change", checkTouch)
    }
  }, [])

  // Hide native cursor and handle clicks.
  useEffect(() => {
    if (isTouchDevice) {
      document.body.classList.remove("cursor-none")
      return
    }

    document.body.classList.add("cursor-none")

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("blur", handleMouseUp)

    return () => {
      document.body.classList.remove("cursor-none")
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("blur", handleMouseUp)
    }
  }, [isTouchDevice])

  // Detect interactive and magnetic elements.
  useEffect(() => {
    if (isTouchDevice) return

    const interactiveSelector = [
      "a",
      "button",
      '[role="button"]',
      ".interactive",
      "[data-interactive]",
      ".magnetic-element",
      ".btn",
      ".card",
      ".badge",
      "input",
      "select",
      "textarea",
    ].join(",")

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target

      if (!(target instanceof HTMLElement)) return

      // Elements that explicitly hide the custom cursor.
      const hiddenElement = target.closest("[data-hide-cursor]")

      if (hiddenElement) {
        setIsHovering(false)
        setIsInverted(false)
        setCursorType("hidden")
        setHoveredElementDimensions(null)
        setMagneticTarget(null)
        return
      }

      // Find the nearest interactive element.
      const interactiveElement = target.closest(
        interactiveSelector
      ) as HTMLElement | null

      if (!interactiveElement) {
        setIsHovering(false)
        setIsInverted(false)
        setCursorType("default")
        setHoveredElementDimensions(null)
        setMagneticTarget(null)
        return
      }

      setIsHovering(true)
      setIsInverted(true)

      // Get dimensions for cursor expansion.
      const rect = interactiveElement.getBoundingClientRect()
      const styles = window.getComputedStyle(interactiveElement)

      setHoveredElementDimensions({
        width: rect.width,
        height: rect.height,
        borderRadius: styles.borderRadius,
      })

      // Determine cursor type.
      if (
        interactiveElement.tagName === "A" ||
        interactiveElement.closest("a")
      ) {
        setCursorType("link")
      } else if (
        interactiveElement.tagName === "BUTTON" ||
        interactiveElement.closest("button")
      ) {
        setCursorType("button")
      } else {
        setCursorType("interactive")
      }

      // ACTUAL MAGNETIC CURSOR CALCULATION.
      const magneticElement = target.closest(
        ".magnetic-element"
      ) as HTMLElement | null

      if (magneticElement) {
        const magneticRect =
          magneticElement.getBoundingClientRect()

        const centerX =
          magneticRect.left + magneticRect.width / 2

        const centerY =
          magneticRect.top + magneticRect.height / 2

        // Magnetic strength: 25%.
        const strength = 0.25

        setMagneticTarget({
          x: centerX + (e.clientX - centerX) * strength,
          y: centerY + (e.clientY - centerY) * strength,
        })
      } else {
        setMagneticTarget(null)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsInverted(false)
      setCursorType("default")
      setMagneticTarget(null)
      setHoveredElementDimensions(null)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isTouchDevice])

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        setCursorType,
        isHovering,
        setIsHovering,
        isInverted,
        setIsInverted,
        magneticTarget,
        setMagneticTarget,
        isClicking,
        setIsClicking,
        hoveredElementDimensions,
        setHoveredElementDimensions,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)

  if (context === undefined) {
    throw new Error(
      "useCursor must be used within a CursorProvider"
    )
  }

  return context
}
