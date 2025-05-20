"use client"

import React, {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type ElementType,
  type MouseEvent,
} from "react"
import { motion } from "framer-motion"
import { useCursor } from "@/context/cursor-context"

interface MagneticElementProps {
  children: ReactNode
  strength?: number
  as?: ElementType
  className?: string
  href?: string
  target?: string
  rel?: string
  onClick?: (e: MouseEvent) => void
  [key: string]: any
}

export default function MagneticElement({
  children,
  strength = 20,
  as = "div",
  className = "",
  ...props
}: MagneticElementProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLAnchorElement & HTMLDivElement & HTMLButtonElement & HTMLSpanElement>(null)
  const { setIsHovering, setHoveredElementDimensions, setMagneticTarget } = useCursor()
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(hover: none)").matches)
    }

    checkTouch()
    window.addEventListener("resize", checkTouch)
    return () => window.removeEventListener("resize", checkTouch)
  }, [])

  const handleMouseMove = (e: MouseEvent) => {
    if (isTouchDevice || !elementRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = elementRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    const magneticX = (distanceX / width) * strength
    const magneticY = (distanceY / height) * strength

    setPosition({ x: magneticX, y: magneticY })
    setMagneticTarget({ x: clientX, y: clientY })
  }

  const handleMouseEnter = () => {
    if (isTouchDevice || !elementRef.current) return

    setIsHovering(true)
    const { width, height } = elementRef.current.getBoundingClientRect()
    const computedStyle = window.getComputedStyle(elementRef.current)
    const borderRadius = computedStyle.borderRadius

    setHoveredElementDimensions({
      width,
      height,
      borderRadius,
    })
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return

    setPosition({ x: 0, y: 0 })
    setIsHovering(false)
    setHoveredElementDimensions(null)
    setMagneticTarget(null)
  }

  const containsAnchor = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === "a"
  )

  const ComponentType = as === "a" && containsAnchor ? "div" : as

  const motionComponents = {
    a: motion.a,
    div: motion.div,
    button: motion.button,
    span: motion.span,
  }

  const Component =
    motionComponents[ComponentType as keyof typeof motionComponents] || motion.div

  if (isTouchDevice) {
    const FallbackComponent = ComponentType as ElementType
    return (
      <FallbackComponent className={className} {...props}>
        {children}
      </FallbackComponent>
    )
  }

  return (
    <Component
      ref={elementRef}
      className={`magnetic-element ${className}`}
      data-custom-cursor="allow"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </Component>
  )
}