"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import { useCursor } from "@/context/cursor-context"
import MagneticElement from "./magnetic-element"
import CustomCursor from "./custom-cursor"

interface Technology {
  name: string
}

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  bgColor: {
    dark: string
    light: string
  }
  technologies: Technology[]
  extraTechCount?: number
  demoUrl: string
  githubUrl: string
  category: string
}

export default function Projects() {
  const [mounted, setMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState("all")

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { theme } = useTheme()
  const { setCursorType, setIsHovering, setIsInverted, setHoveredElementDimensions } = useCursor()

  const isDark = theme === "dark"

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!isDialogOpen) return
    const handleMouseMove = (e: MouseEvent) => {
      const dialogElement = document.querySelector('[role="dialog"]')
      if (!dialogElement) return
      const rect = dialogElement.getBoundingClientRect()
      const isOverDialog =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      if (isOverDialog) {
        setCursorType("default")
        setIsHovering(false)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isDialogOpen, setCursorType, setIsHovering])

  const projects: Project[] = [
    {
      id: "brain-tumor",
      title: "Brain Tumor Image Classification",
      description: "Machine learning model for analyzing MRI scans",
      longDescription: "Machine learning model for analyzing MRI scans and identifying brain tumors. This project showcases the application of deep learning in medical imaging.",
      image: "/images/Brain-Tumor.png",
      bgColor: {
        dark: "from-rose-500/70 to-rose-800/90",
        light: "from-rose-300/70 to-rose-500/90"
      },
      technologies: [
        { name: "Python" },
        { name: "TensorFlow" },
        { name: "Deep Learning" },
        { name: "Medical Imaging" }
      ],
      demoUrl: "#",
      githubUrl: "https://github.com/imhemathkumar/Brain_tumor_classification",
      category: "ai"
    },
    {
      id: "weather-app",
      title: "Weather App",
      description: "Real-time weather forecasting application",
      longDescription: "Real-time weather forecasting web application using OpenWeatherMap API. Get accurate weather information for any location with a sleek, user-friendly interface.",
      image: "/images/Nimbusvue.png",
      bgColor: {
        dark: "from-teal-500/70 to-teal-800/90",
        light: "from-teal-300/70 to-teal-600/90",
      },
      technologies: [
        { name: "Next.js" },
        { name: "React" },
        { name: "Node.js" },
        { name: "TypeScript" },
        { name: "Tailwind" },
        { name: "API Integration" }
      ],
      demoUrl: "https://nimbusvue.vercel.app/",
      githubUrl: "#",
      category: "frontend",
    },
    {
      id: "fashion-mnist",
      title: "Fashion-MNIST",
      description: "Clothing item classification model",
      longDescription: "Image classification model for fashion items using the Fashion-MNIST dataset. This project demonstrates the power of convolutional neural networks in recognizing and categorizing clothing items.",
      image: "/images/Fashion-Mnist.png",
      bgColor: {
        dark: "from-blue-500/70 to-blue-800/90",
        light: "from-blue-300/70 to-blue-600/90",
      },
      technologies: [
        { name: "Python" },
        { name: "TensorFlow" },
        { name: "CNN" },
        { name: "Computer Vision" }
      ],
      demoUrl: "#",
      githubUrl: "https://github.com/imhemathkumar/Fashion-Mnist-CNN",
      category: "ai",
    },
    {
      id: "trustcert",
      title: "TrustCert",
      description: "Web application for certificate generation",
      longDescription: "Web application for online certificate generation and validation. Streamline the process of creating, issuing, and verifying digital certificates with enhanced security features.",
      image: "/images/Trustcert.png",
      bgColor: {
        dark: "from-purple-500/70 to-purple-800/90",
        light: "from-purple-300/70 to-purple-500/90",
      },
      technologies: [
        { name: "React" },
        { name: "Vite" },
        { name: "Node.js" },
        { name: "JavaScript" },
        { name: "Cryptography" }
      ],
      demoUrl: "https://example.com/trustcert",
      githubUrl: "#",
      category: "security",
    },
    {
      id: "selinux-policy",
      title: "SELinux Policy For System Security Enforcement",
      description: "SELinux Policy for System Security Enforcement",
      longDescription: "SELinux Policy for System Security Enforcement ensures mandatory access control by defining and enforcing strict security rules on system processes and resources.",
      image: "/images/SElinux.png",
      bgColor: {
        dark: "from-green-500/70 to-green-800/90",
        light: "from-green-300/70 to-green-600/90",
      },
      technologies: [
        { name: "selinux-policy-devel" },
        { name: "checkpolicy" },
        { name: "audit" },
        { name: "policycoreutils" },
        { name: "policycoreutils-python-utils" }
      ],
      demoUrl: "#",
      githubUrl: "https://github.com/imhemathkumar/SELinux-policies",
      category: "security",
    },
    {
      id: "todo-list",
      title: "To-Do-List",
      description: "A To-Do List Web Application",
      longDescription: "A To-Do List Web Application that helps users organize, manage, and prioritize tasks with features like drag-and-drop, due dates, tags, and theme customization.",
      image: "/images/todo.png",
      bgColor: {
        dark: "from-blue-500/70 to-blue-800/90",
        light: "from-blue-300/70 to-blue-600/90",
      },
      technologies: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" }
      ],
      demoUrl: "https://todolist-hemanth.vercel.app/",
      githubUrl: "#",
      category: "frontend",
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "Personal portfolio and blog",
      longDescription: "Responsive portfolio website showcasing projects and skills. A modern, interactive platform to highlight professional achievements and technical expertise.",
      image: "/images/portfolio.png",
      bgColor: {
        dark: "from-yellow-400/70 to-yellow-600/90",
        light: "from-yellow-300/70 to-yellow-500/90",
      },
      technologies: [
        { name: "Next.js" },
        { name: "React" },
        { name: "Node.js" },
        { name: "TypeScript" },
        { name: "Tailwind" },
        { name: "Framer Motion" }
      ],
      demoUrl: "https://hemanthkumar-one.vercel.app/",
      githubUrl: "#",
      category: "frontend",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.category === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  if (!mounted) return null

  return (
    <section id="projects" className="py-10 px-4">
      <div className="lg:container md:container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-[#a855f7]">Featured Projects</span>
          <h2 className={`text-4xl font-bold mt-1 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6" />
          <p className={isDark ? "text-gray-300 max-w-2xl mx-auto mb-8" : "text-gray-600 max-w-2xl mx-auto mb-8"}>
            A collection of my recent projects showcasing my skills and expertise in various technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["all", "frontend", "ai", "blockchain", "security"].map(category => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
              >
                {category === "ai" ? "AI/ML" : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="cursor-pointer interactive"
              onClick={() => openProjectDialog(project)}
            >
              <div className="relative h-64 rounded-lg overflow-hidden group">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="text-black dark:text-white object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    isDark ? project.bgColor.dark : project.bgColor.light
                  } transition-opacity duration-300`}
                  style={{ opacity: 0.6 }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="font-normal bg-white/20 text-black dark:text-white hover:bg-white/30"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                    {project.extraTechCount && (
                      <Badge variant="secondary" className="font-normal bg-white/20 text-white hover:bg-white/30">
                        +{project.extraTechCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={open => {
          setIsDialogOpen(open)
          if (!open) {
            setCursorType("default")
            setIsHovering(false)
          }
        }}
      >
        <DialogContent
          className={`lg:max-w-3xl md:max-w-3xl p-0 rounded-xl overflow-hidden ${
            isDark ? "bg-[#1a2236] text-white border-none" : "bg-white text-gray-900 border-gray-200"
          }`}
          data-custom-cursor="allow"
        >
          {selectedProject && (
            <>
              <div className="relative h-72 w-full">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                
              </div>

              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="mt-2">
                    {selectedProject.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-2 mt-6">
                  {selectedProject.technologies.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className={`font-normal ${
                        isDark
                          ? "bg-white/20 text-white hover:bg-white/30"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  <MagneticElement as="a" strength={40} href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:underline" >
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </MagneticElement>
                  <MagneticElement
                    as="a"
                    strength={40}
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Code
                  </MagneticElement>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
