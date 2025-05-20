"use client"

import { Suspense, useState, useEffect, Component, type ErrorInfo, type ReactNode } from "react"
import About from "@/components/about"
import Contact from "@/components/contact"
import Experience from "@/components/experience"
import LoadingScreen from "@/components/loading-screen"
import Projects from "@/components/projects"
import Education from "@/components/education"
import SkillsGrid from "@/components/skills-grid"
import Footer from "@/components/footer"
import LetsWorkCTA from "@/components/lets-work-cta"

// Custom error boundary component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">We're sorry, but there was an error loading the page.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <ErrorBoundary>
      <main className="relative px-0 sm:px-2 mx-auto overflow-hidden">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
              </div>
            </div>
          }
        >
          {isClient ? (
            <>
              <LoadingScreen />
              <About />
              <Experience />
              <Projects />
              <SkillsGrid />
              <Education />
              <Contact />
              <LetsWorkCTA />
              <Footer />
            </>
          ) : (
            <div className="h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
              </div>
            </div>
          )}
        </Suspense>
      </main>
    </ErrorBoundary>
  )
}
