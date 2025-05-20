"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      // Reduced particle count for better visibility
      const particleCount = Math.floor(window.innerWidth / 30)

      for (let i = 0; i < particleCount; i++) {
        // Increased particle size for better visibility
        const radius = Math.random() * 3 + 1.5
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: getRandomColor(),
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          // Increased base opacity for better visibility
          opacity: Math.random() * 0.6 + 0.3,
        })
      }
    }

    const getRandomColor = () => {
      // Enhanced contrast colors based on theme
      const isDark = theme === "dark"

      if (isDark) {
        // For dark theme: brighter colors (180-255)
        const grayValue = Math.floor(Math.random() * 75) + 180
        return `rgba(${grayValue}, ${grayValue}, ${grayValue}, 1)`
      } else {
        // For light theme: darker colors (20-100)
        const grayValue = Math.floor(Math.random() * 80) + 20
        return `rgba(${grayValue}, ${grayValue}, ${grayValue}, 1)`
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("1)", `${particle.opacity})`)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }
      })

      // Connect particles with lines if they're close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Increased connection distance for more visible connections
          if (distance < 150) {
            ctx.beginPath()
            // Enhanced line visibility
            const isDark = theme === "dark"
            const grayValue = isDark ? 200 : 50
            // Increased line opacity and made it more visible at greater distances
            const lineOpacity = 0.3 * (1 - distance / 150)
            ctx.strokeStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${lineOpacity})`
            // Increased line width for better visibility
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      // Increased opacity for better visibility and removed grayscale filter
      style={{ opacity: 0.7 }}
    />
  )
}
