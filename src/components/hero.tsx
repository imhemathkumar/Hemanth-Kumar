"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MagneticElement from "./magnetic-element"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import HeroMobile from "./HeroMobile"

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

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

  const ButtonWrapper = isMobile ? "div" : MagneticElement

  return (
    <section id="hero" className=" lg:min-h-screen md:min-h-screen relative overflow-hidden">
      {/* Mobile View */}
      <div className="lg:hidden md:hidden relative z-10">

        <HeroMobile />
      </div>
      
    {/* Desktop View */}
    {/* Large text background */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05]">
        <h1 className="text-[20vw] font-bold tracking-tighter">HEMANTH</h1>
      </div>
      <div className="container mx-auto px-4 pt-36 relative z-10 hidden sm:block"> {/* increased pt-20 to pt-40 */}
        {/* Large name at top */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-7xl md:text-[8rem] lg:top-1/5  text-center font-bold tracking-tight absolute w-full top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-10"
        >
          HEMANTH KUMAR
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.2fr,1fr] gap-12 items-end min-h-[60vh]">
          {/* Left column - Reviews */}
          <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
          >
        <p className="text-sm lg:text-lg">
          Hi, I'm Hemanth, a passionate Full Stack Developer & UI/UX Designer
          dedicated to creating user-friendly digital experiences.
        </p>
        <div className="space-x-4 md:space-y-4">
          <MagneticElement as="div" strength={40}>
          <Link href="#contact">
          <Button
          size="lg"
          className="rounded-xl bg-primary hover:bg-primary/90"
          >
          Get in touch
          </Button>
          </Link>
          </MagneticElement>
          <MagneticElement as="div" strength={40}>
          <Link href="#projects" >
          <Button
          size="lg"
          className="rounded-xl bg-sky-500 text-white hover:bg-gray/90"
          >
          View Projects
          </Button>
          </Link>
          </MagneticElement>
        </div>
          </motion.div>

          {/* Center column - Image */}
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-20"
        >
        <div className="aspect-[3/3.5] relative rounded-2xl overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-500">
          <Image
          src="/images/main.jpg?height=700&width=600"
          alt="Profile"
          fill
          className="object-cover"
          priority
          />
        </div>
        </motion.div>

          {/* Right column - Intro */}
          <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
          >
        <p className="text-sm text-center lg:text-lg">
          Designing digital experiences from the peaceful town of Jaggayyapeta, where creativity meets code and every pixel has a purpose, right here in NTR District, Andhra Pradesh."
        </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
