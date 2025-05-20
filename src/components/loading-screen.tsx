"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "./hero"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const fullText = "Hemanth Kumar"
  const [typingComplete, setTypingComplete] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [shouldExit, setShouldExit] = useState(false)

  useEffect(() => {
    // Set a timeout to ensure loading screen doesn't get stuck
    const maxLoadingTime = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Force exit after 5 seconds max

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 150)

    return () => {
      clearInterval(interval)
      clearTimeout(maxLoadingTime)
    }
  }, [])

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      setTypingComplete(true)
    }
  }, [text, fullText])

  useEffect(() => {
    if (progress === 100 && typingComplete) {
      const timer = setTimeout(() => {
        setShouldExit(true)
        setTimeout(() => {
          setIsLoading(false)
          try {
            window.dispatchEvent(new CustomEvent("loadingComplete"))
          } catch (e) {
            console.error("Error dispatching loadingComplete event:", e)
          }
        }, 1000)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [progress, typingComplete])

  useEffect(() => {
    try {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    } catch (e) {
      console.error("Error accessing window dimensions:", e)
      // Set fallback dimensions
      setWindowSize({
        width: 1200,
        height: 800,
      })
    }
  }, [])

  return (
    <>
      {/* Always render main content */}
      <motion.div className="relative z-0">
        <motion.div
          className="fixed inset-0 bg-black z-40 pointer-events-none"
          initial={{ clipPath: "ellipse(150% 150% at 50% 100%)" }}
          animate={
            !isLoading
              ? {
                  clipPath: "ellipse(150% 0% at 50% 100%)",
                  transition: {
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.2,
                  },
                }
              : {}
          }
        />
        <motion.div
          className="reveal-content"
          initial={{ opacity: 0, y: 40 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 1,
            ease: [0.33, 1, 0.68, 1],
            delay: 1,
          }}
        >
          <MainContent />
        </motion.div>
      </motion.div>

      {/* Loading overlay (non-blocking, visually on top) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-background z-50 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: "easeInOut",
              },
            }}
          >
            <motion.div
              className="text-center pointer-events-none"
              animate={shouldExit ? { scale: 1.1, opacity: 0, y: -20 } : { scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 pb-2"
                initial={{ filter: "blur(8px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {text}
                <span className="animate-pulse">|</span>
              </motion.h1>

              <motion.p
                className="text-sm md:text-base text-muted-foreground mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Full Stack Developer & UI/UX Designer
              </motion.p>

              <motion.div
                className="w-48 md:w-64 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto mt-8 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.div>

              <motion.p
                className="text-sm text-muted-foreground mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {progress < 100 ? "Loading..." : "Welcome"}
              </motion.p>
            </motion.div>

            {/* Background floating circles - simplified for performance */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              {windowSize.width > 0 &&
                [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/5"
                    initial={{
                      x: Math.random() * windowSize.width,
                      y: Math.random() * windowSize.height,
                      scale: 0,
                    }}
                    animate={
                      shouldExit
                        ? { scale: 0, opacity: 0 }
                        : {
                            x: Math.random() * windowSize.width,
                            y: Math.random() * windowSize.height,
                            scale: Math.random() * 2 + 1,
                          }
                    }
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: `${Math.random() * 150 + 50}px`,
                      height: `${Math.random() * 150 + 50}px`,
                    }}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MainContent() {
  return <Hero />
}
