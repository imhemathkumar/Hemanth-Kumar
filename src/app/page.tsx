"use client"

import { Suspense, useState, useEffect } from "react"
import About from "@/components/about"
import Contact from "@/components/contact"
import Experience from "@/components/experience"
import LoadingScreen from "@/components/loading-screen"
import Projects from "@/components/projects"
import Education from "@/components/education"
import SkillsGrid from "@/components/skills-grid"
import Footer from "@/components/footer"
import LetsWorkCTA from "@/components/lets-work-cta"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="mb-4">We're sorry, but there was an error loading the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
