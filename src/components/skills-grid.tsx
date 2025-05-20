"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import MagneticElement from "./magnetic-element"

interface Skill {
  name: string
  imageSrc: string
  category: string
}

export default function SkillsGrid() {
  // 1. Declare all hooks at the top of the component
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { theme } = useTheme()

  // 2. Effects after state/ref hooks
  useEffect(() => {
    setMounted(true)
  }, [])

  // 3. Derived state
  const isDark = mounted ? theme === "dark" : false

  // 4. Early return for non-mounted state
  if (!mounted) return null

  // 5. Rest of the component logic
  const skills: Skill[] = [
    // Frontend
    { name: "HTML 5", imageSrc: "/images/skills/HTML.svg", category: "frontend" },
    { name: "CSS 3", imageSrc: "/images/skills/CSS3.svg", category: "frontend" },
    { name: "JavaScript", imageSrc: "/images/skills/JavaScript.svg", category: "frontend" },
    { name: "TypeScript", imageSrc: "/images/skills/Typescript.svg", category: "frontend" },
    { name: "React JS", imageSrc: "/images/skills/React.svg", category: "frontend" },
    { name: "Next JS", imageSrc: "/images/skills/nextjs.svg", category: "frontend" },
    { name: "Tailwind CSS", imageSrc: "/images/skills/Tailwind_CSS.svg", category: "frontend" },

    // Backend
    { name: "Node.js", imageSrc: "/images/skills/nodejs.svg", category: "backend" },
    { name: "Python", imageSrc: "/images/skills/Python.svg", category: "backend" },
    { name: "Java", imageSrc: "/images/skills/java.svg", category: "backend" },
    { name: "MongoDB", imageSrc: "/images/skills/mongodb.svg", category: "backend" },
    { name: "Firebase", imageSrc: "/images/skills/firebase.svg", category: "backend" },

    // Other
    { name: "Artificial Intelligence", imageSrc: "/images/skills/artificial-intelligence.svg", category: "other" },
    { name: "Git", imageSrc: "/images/skills/git.svg", category: "other" },
    { name: "Docker", imageSrc: "/images/skills/docker.svg", category: "other" },
    { name: "AWS", imageSrc: "/images/skills/aws.svg", category: "other" },
  ]

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className={isDark ? "py-20" : "py-20"}>
      <div className="lg:container md:container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-[#a855f7]">My Expertise</span>
          <h2 className={`text-3xl font-bold mt-1 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Skills & Proficiency
          </h2>
          <div className="h-1 w-20 bg-[#a855f7] mx-auto mb-6" />
          <p className={isDark ? "text-gray-300 max-w-2xl mx-auto mb-8" : "text-gray-600 max-w-2xl mx-auto mb-8"}>
            A comprehensive overview of my technical skills and proficiency levels across various technologies and
            tools.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <MagneticElement as="div" strength={10}>
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-[#a855f7] hover:bg-[#9333ea]" : ""}
            >
              All Skills
            </Button>
            </MagneticElement>
            <MagneticElement as="div" strength={10}>
            <Button
              variant={activeCategory === "frontend" ? "default" : "outline"}
              onClick={() => setActiveCategory("frontend")}
              className={activeCategory === "frontend" ? "bg-[#a855f7] hover:bg-[#9333ea]" : ""}
            >
              Frontend
            </Button>
            </MagneticElement>
            <MagneticElement as="div" strength={10}>
            <Button
              variant={activeCategory === "backend" ? "default" : "outline"}
              onClick={() => setActiveCategory("backend")}
              className={activeCategory === "backend" ? "bg-[#a855f7] hover:bg-[#9333ea]" : ""}
            >
              Backend
            </Button>
            </MagneticElement>
            <MagneticElement as="div" strength={10}>
            <Button
              variant={activeCategory === "other" ? "default" : "outline"}
              onClick={() => setActiveCategory("other")}
              className={activeCategory === "other" ? "bg-[#a855f7] hover:bg-[#9333ea]" : ""}
            >
              Tools & Others
            </Button>
          </MagneticElement>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <MagneticElement as="div" strength={10} key={index}>
            <motion.div key={index} variants={itemVariants}>
              <div
                className={`${
                  isDark ? "bg-[#111827]/50 text-white" : "bg-white/50 text-gray-900 border border-gray-200"
                } rounded-lg p-6 flex flex-col items-center justify-center gap-4 h-full transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg`}
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <Image
                    src={skill.imageSrc || "/placeholder.svg"}
                    alt={skill.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <span className="text-center ">{skill.name}</span>
              </div>
            </motion.div>
            </MagneticElement>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
