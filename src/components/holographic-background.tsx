"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function HolographicBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Effect for mouse movement interaction - only on desktop
  useEffect(() => {
    if (isMobile || !containerRef.current) return

    const container = containerRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // Calculate position with reduced movement for performance
      const amplifier = 0.8
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      // Calculate distance from center and amplify
      const distanceX = (clientX - centerX) * amplifier
      const distanceY = (clientY - centerY) * amplifier

      // Calculate new position with amplified movement
      const newX = Math.min(Math.max(((centerX + distanceX) / window.innerWidth) * 100, 0), 100)
      const newY = Math.min(Math.max(((centerY + distanceY) / window.innerHeight) * 100, 0), 100)

      // Update CSS variables for gradient movement
      container.style.setProperty("--mouse-x", `${newX}%`)
      container.style.setProperty("--mouse-y", `${newY}%`)
    }

    // Throttle the mousemove event for better performance
    let lastTime = 0
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime >= 50) {
        // Only process every 50ms
        lastTime = now
        handleMouseMove(e)
      }
    }

    window.addEventListener("mousemove", throttledMouseMove)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
    }
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {isDark ? (
        // Dark mode background matching the navy blue gradient in the image
        <div
          className="absolute inset-0 bg-gradient-radial from-[#1a2c4c] via-[#0f1c33] to-[#0a1525]"
          style={{
            backgroundSize: "200% 200%",
            backgroundPosition: "var(--mouse-x) var(--mouse-y)",
            transition: "background-position 0.3s ease-out",
          }}
        />
      ) : (
        // Light mode background
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-50 to-amber-50"
          style={{
            backgroundSize: "200% 200%",
            backgroundPosition: "var(--mouse-x) var(--mouse-y)",
            transition: "background-position 0.3s ease-out",
          }}
        />
      )}

      {/* Subtle shimmer effect - simplified for mobile */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,${
          isDark ? "0.05" : "0.1"
        })_0%,transparent_60%)] mix-blend-soft-light opacity-70`}
        style={{
          backgroundSize: "200% 200%",
          backgroundPosition: "var(--mouse-x) var(--mouse-y)",
          transition: "background-position 0.3s ease-out",
        }}
      />

      {/* Very subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />

      {/* Animated particles only for dark mode and desktop */}
      {isDark && !isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
