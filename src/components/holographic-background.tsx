"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function HolographicBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const containerRef = useRef<HTMLDivElement>(null)

  // Effect for mouse movement interaction
  useEffect(() => {
    try {
      const container = containerRef.current
      if (!container) return

      const handleMouseMove = (e: MouseEvent) => {
        try {
          const { clientX, clientY } = e

          // Calculate position with amplified movement
          const amplifier = 1.2
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
        } catch (error) {
          console.error("Error in mouse move handler:", error)
        }
      }

      try {
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
          window.removeEventListener("mousemove", handleMouseMove)
        }
      } catch (error) {
        console.error("Error setting up mouse move listener:", error)
        return () => {}
      }
    } catch (error) {
      console.error("Error in holographic background effect:", error)
      return () => {}
    }
  }, [])

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

      {/* Subtle shimmer effect */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,${
          isDark ? "0.07" : "0.15"
        })_0%,transparent_60%)] mix-blend-soft-light opacity-70`}
        style={{
          backgroundSize: "200% 200%",
          backgroundPosition: "var(--mouse-x) var(--mouse-y)",
          transition: "background-position 0.3s ease-out",
        }}
      />

      {/* Very subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />

      {isDark && (
        // Subtle animated particles for dark mode only
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
