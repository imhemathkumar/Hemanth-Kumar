"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

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
  setCursorType: React.Dispatch<React.SetStateAction<"default" | "link" | "button" | "interactive" | "hidden">>
  isHovering: boolean
  setIsHovering: (isHovering: boolean) => void
  isInverted: boolean
  setIsInverted: (isInverted: boolean) => void
  magneticTarget: Position | null
  setMagneticTarget: (target: Position | null) => void
  isClicking: boolean
  setIsClicking: (isClicking: boolean) => void
  hoveredElementDimensions: ElementDimensions | null
  setHoveredElementDimensions: (dimensions: ElementDimensions | null) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorType] = useState<"default" | "link" | "button" | "interactive" | "hidden">("default")
  const [isHovering, setIsHovering] = useState(false)
  const [isInverted, setIsInverted] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [magneticTarget, setMagneticTarget] = useState<Position | null>(null)
  const [isClicking, setIsClicking] = useState(false)
  const [hoveredElementDimensions, setHoveredElementDimensions] = useState<ElementDimensions | null>(null)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(hover: none)").matches)
    }

    checkTouch()
    window.addEventListener("resize", checkTouch)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    if (!isTouchDevice) {
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)
    }

    if (!isTouchDevice) {
      document.body.classList.add("cursor-none")
    } else {
      document.body.classList.remove("cursor-none")
    }

    return () => {
      window.removeEventListener("resize", checkTouch)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.classList.remove("cursor-none")
    }
  }, [isTouchDevice])

  useEffect(() => {
    if (isTouchDevice) return

    let isMouseInWindow = true

    const handleMouseMove = (e: MouseEvent) => {
      if (!e.target || !isMouseInWindow) return

      const target = e.target as HTMLElement

      const shouldHideCursor =
        target.hasAttribute("data-hide-cursor") ||
        target.closest("[data-hide-cursor]")

      if (shouldHideCursor) {
        setIsHovering(false)
        setIsInverted(false)
        setCursorType("hidden")
        setHoveredElementDimensions(null)
        return
      }

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive") ||
        target.closest(".interactive") ||
        target.hasAttribute("data-interactive") ||
        target.closest("[data-interactive]") ||
        target.classList.contains("magnetic-element") ||
        target.closest(".magnetic-element") ||
        target.classList.contains("btn") ||
        target.closest(".btn") ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("card") ||
        target.closest(".card") ||
        target.classList.contains("badge") ||
        target.closest(".badge")

      if (isInteractive) {
        setIsHovering(true)
        setIsInverted(true)

        const interactiveElement =
          target.classList.contains("interactive") || target.tagName === "A" || target.tagName === "BUTTON"
            ? target
            : target.closest(".interactive") ||
              target.closest("a") ||
              target.closest("button") ||
              target.closest("[data-interactive]") ||
              target.closest(".magnetic-element") ||
              target.closest(".card") ||
              target.closest(".btn")

        if (interactiveElement) {
          const styles = window.getComputedStyle(interactiveElement)
          const rect = interactiveElement.getBoundingClientRect()

          setHoveredElementDimensions({
            width: rect.width,
            height: rect.height,
            borderRadius: styles.borderRadius,
          })

          if (interactiveElement.tagName === "A" || interactiveElement.closest("a")) {
            setCursorType("link")
          } else if (interactiveElement.tagName === "BUTTON" || interactiveElement.closest("button")) {
            setCursorType("button")
          } else {
            setCursorType("interactive")
          }
        }
      } else if (!target.classList.contains("magnetic-element") && !target.closest(".magnetic-element")) {
        setIsHovering(false)
        setIsInverted(false)
        setCursorType("default")
        setHoveredElementDimensions(null)
      }
    }

    const handleMouseLeave = () => {
      isMouseInWindow = false
      setIsHovering(false)
      setIsInverted(false)
      setCursorType("default")
      setMagneticTarget(null)
      setHoveredElementDimensions(null)
    }

    const handleMouseEnter = () => {
      isMouseInWindow = true
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
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
    throw new Error("useCursor must be used within a CursorProvider")
  }
  return context
}
