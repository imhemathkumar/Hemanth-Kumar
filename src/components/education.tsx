"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown, ChevronUp, GraduationCap, BookOpen, Code, FileText } from "lucide-react"
import { useTheme } from "next-themes"

export default function Education() {
  // 1. All hooks first
  const [mounted, setMounted] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { theme } = useTheme()

  // 2. Effects
  useEffect(() => {
    setMounted(true)
  }, [])

  // 3. Derived state
  const isDark = mounted ? theme === "dark" : false

  // 4. Helper functions
  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // 5. Early return after all hooks
  if (!mounted) return null

  // 6. JSX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const educationItems = [
    {
      icon: BookOpen,
      iconColor: "text-orange-500",
      institution: "Nagarjuna High School",
      location: "Jaggaiahpet, India",
      period: "2019",
      details: [
        "I scored a solid 9.5 GPA in school by staying focused and developing good study habits.",
        "I took part in different school activities and projects that helped me learn new skills and work well with others.",
        "I managed my schoolwork and activities well, which helped me stay organized and focused on my goals.",
      ],
    },
    {
      icon: FileText,
      iconColor: "text-blue-500",
      institution: "Jr College",
      location: "Jaggaiahpet, India",
      period: "2021",
      details: [
        "Scored 938 marks by staying focused and working hard throughout my two years in intermediate college.",
        "Took part in college activities that helped me build confidence and teamwork skills.",
        "Learned how to manage my time well to balance studies and other responsibilities.",
      ],
    },
    {
      icon: GraduationCap,
      iconColor: "text-red-500",
      institution: "Sathyabama University",
      location: "Chennai, India",
      period: "2022 - 2026",
      details: [
        "Maintaining a CGPA of 8.6 in core computer science courses.",
        "I learned several coding languages and used my logical skills to excel in coding competitions during my 2nd year.",
        "Active participant in the university's coding club.",
      ],
    },
  ]

  return (
    <section id="education" className={isDark ? "py-20" : "py-20 "}>
      <div className="lg:container md:container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
            <span className="text-sm text-center font-medium text-[#a855f7] block mx-auto">My Journey</span>
          <h2 className={`text-3xl text-center font-bold mt-1 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Education & Training
          </h2>
          <div className="h-1 w-20 bg-[#a855f7] mx-auto mb-6" />
          <p className={isDark ? "text-gray-300 max-w-2xl mx-auto mb-8" : "text-gray-600 max-w-2xl mx-auto mb-8"}>
            A detailed overview of my academic background, certifications, and professional development journey.
          </p>

          <div className="space-y-8">
            {educationItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={
                  isDark
                    ? "bg-[#1a2236] rounded-lg overflow-hidden"
                    : "bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                }
              >
                <div className="p-4 flex items-start justify-between cursor-pointer" onClick={() => toggleItem(index)}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${item.iconColor} bg-opacity-20`}>
                      <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"} text-lg`}>
                        {item.institution}
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>{item.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={isDark ? "text-gray-300 text-sm" : "text-gray-500 text-sm"}>{item.period}</span>
                    {expandedItems[index] ? (
                      <ChevronUp className={isDark ? "h-5 w-5 text-white" : "h-5 w-5 text-black"} />
                    ) : (
                      <ChevronDown className={isDark ? "h-5 w-5 text-white" : "h-5 w-5 text-black"} />
                    )}
                  </div>
                </div>

                {expandedItems[index] && (
                  <div className="px-4 pb-4 pt-2">
                    <ul className={`space-y-2 ${isDark ? "text-white" : "text-black"} list-disc pl-12`}>
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
