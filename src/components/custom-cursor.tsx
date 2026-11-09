
"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring } from "framer-motion"
import { useCursor } from "@/context/cursor-context"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const {
    cursorType,
    isHovering,
    isInverted,
    magneticTarget,
    isClicking,
    hoveredElementDimensions,
  } = useCursor()

  const mousePositionRef = useRef({ x: 0, y: 0 })

  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [dotSize, setDotSize] = useState(3)

  const { theme } = useTheme()

  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const springConfig = {
    damping: 15,
    stiffness: 400,
    mass: 0.3,
  }

  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const scale = useSpring(1, {
    damping: 10,
    stiffness: 300,
  })

  const dotScale = useSpring(1, {
    damping: 15,
    stiffness: 400,
  })

  const width = useSpring(30, {
    damping: 10,
    stiffness: 300,
  })

  const height = useSpring(30, {
    damping: 10,
    stiffness: 300,
  })

  const borderRadius = useSpring("50%", {
    damping: 10,
    stiffness: 300,
  })

  // Detect devices with a real mouse / trackpad.
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

  // Calculate precision dot size safely.
  useEffect(() => {
    const updateDotSize = () => {
      setDotSize(
        Math.max(2, Math.min(window.innerWidth / 640, 4))
      )
    }

    updateDotSize()

    window.addEventListener("resize", updateDotSize)

    return () => {
      window.removeEventListener("resize", updateDotSize)
    }
  }, [])

  // Mouse tracking.
  useEffect(() => {
    if (isTouchDevice) return

    const initCursor = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      x.set(e.clientX)
      y.set(e.clientY)

      setIsVisible(true)
    }

    const updateMousePosition = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      if (!magneticTarget) {
        x.set(e.clientX)
        y.set(e.clientY)
      }

      setIsVisible(true)
    }

    document.addEventListener("mousemove", initCursor, {
      once: true,
    })

    document.addEventListener("mousemove", updateMousePosition)

    return () => {
      document.removeEventListener("mousemove", initCursor)
      document.removeEventListener(
        "mousemove",
        updateMousePosition
      )
    }
  }, [isTouchDevice, magneticTarget, x, y])

  // Hover expansion and click animation.
  useEffect(() => {
    if (isHovering && hoveredElementDimensions) {
      const {
        width: elementWidth,
        height: elementHeight,
        borderRadius: elementBorderRadius,
      } = hoveredElementDimensions

      width.set(elementWidth + 4)
      height.set(elementHeight + 4)
      borderRadius.set(elementBorderRadius)
      dotScale.set(0.5)
    } else {
      width.set(30)
      height.set(30)
      borderRadius.set("50%")
      dotScale.set(1)
    }

    if (isClicking) {
      scale.set(0.9)

      const timeout = window.setTimeout(() => {
        if (!isHovering) {
          scale.set(1)
        }
      }, 150)

      return () => window.clearTimeout(timeout)
    } else {
      scale.set(1)
    }
  }, [
    isHovering,
    isClicking,
    hoveredElementDimensions,
    width,
    height,
    borderRadius,
    scale,
    dotScale,
  ])

  // Magnetic cursor positioning.
  useEffect(() => {
    if (!magneticTarget) return

    x.set(magneticTarget.x)
    y.set(magneticTarget.y)
  }, [magneticTarget, x, y])

  // Hide cursor outside the browser viewport.
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      )

      document.removeEventListener(
        "mouseenter",
        handleMouseEnter
      )
    }
  }, [isTouchDevice])

  // Support elements that use the default browser cursor.
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null

      const defaultCursor = target?.closest(
        '[data-custom-cursor="default"]'
      )

      setIsVisible(!defaultCursor)
    }

    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      document.removeEventListener(
        "mouseover",
        handleMouseOver
      )
    }
  }, [isTouchDevice])

  // Do not render a custom cursor on touch devices.
  if (isTouchDevice) return null

  return (
    <>
      {/* Main dynamic cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        style={{
          width,
          height,
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
          borderRadius,
          left: 0,
          top: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale,
        }}
      />

      {/* Precision dot */}
      <motion.div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          backgroundColor:
            theme === "dark" ? "white" : "black",
          left: 0,
          top: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale: dotScale,
        }}
      />

      {/* Click animation effect */}
      {isClicking && isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999] mix-blend-difference"
          initial={{
            scale: 0.5,
            opacity: 0.8,
          }}
          animate={{
            scale: 1.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          style={{
            width,
            height,
            borderRadius,
            border: "2px solid white",
            left: 0,
            top: 0,
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </>
  )
}
