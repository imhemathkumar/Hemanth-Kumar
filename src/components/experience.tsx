"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: "Data Analyst",
      company: "SkillForge Technologies",
      location: "Bangalore, India",
      period: "Jun 2024 - Aug 2024",
      description:
        "Helped uncover valuable insights and build smart predictive models using Python and AI to make data easier to understand and decisions faster at SkillForge.",
      achievements: [
        "Analyzed large datasets using Python to uncover actionable insights.",
        "Created compelling visualizations to communicate complex data insights to stakeholders.",
        "Conducted statistical modeling and predictive analysis to forecast business trends. Automated data collection and reporting workflows, reducing manual effort by 40%. ",
      ],
      technologies: ["Python" ,"TensorFlow","Medical Imaging","Computer Vision","CNN"],
    },
    {
      title: "System Security (SELinux Policies)",
      company: "Red Hat Linux",
      location: "Chennai, India",
      period: "Feb 2025 - April 2025",
      description: 
        "Designed and implemented custom SELinux policies to enforce strict access controls and harden system security on Red Hat Linux. Developed automation scripts to streamline policy deployment and enforcement, ensuring robust protection against unauthorized access and threats.",
      achievements: [
        "Authored custom SELinux modules to restrict access to critical system resources based on principle of least privilege.",
        "Utilized audit2allow tool to analyze security logs and generate tailored policies addressing real-time access violations.",
        "Automated policy compilation and enforcement through Python scripts, reducing manual configuration time by 60%.",
      ],
      technologies: ["SELinux", "Red Hat Linux", "audit2allow", "Python", "Bash scripting", "System Security"],
    },
    {
      title: "NPTEL Courses",
      company: "NPTEL",
      location: "Chennai, India",
      period: "2022 - present",
      description:
        "Completed several NPTEL courses, from short 4-week to in-depth 12-week programs, boosting my skills in data visualization, machine learning, and problem-solving while staying committed to continuous learning.",
      achievements: [
        "Gained certification in multiple NPTEL courses, varying from short-term 4-week programs to extensive 12-week sessions.",
        "These courses reinforced analytical thinking, problem-solving, and specialized skills in the data visualization and machine learning.",
        "These programs featured rigorous academic content and practical applications, and highlighting a commitment to continuous learning and skill enhancement in particular areas."
      ],
      technologies: ["Data Visualization tools-Tableau, Matplotlib", "Python","Machine Learning libraries","Statistical Analysis","SQL","Excel"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" className="py-20">
      <div className="lg:container md:container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary">My Journey</span>
          <h2 className="text-3xl font-bold mt-1 mb-4">Professional Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional career, showcasing my growth and achievements in the field of web development.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative mb-12 md:mb-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-6 w-4 h-4 rounded-full bg-primary z-10 ${
                  index % 2 === 0 ? "right-0 md:-right-2" : "left-0 md:-left-2"
                }`}
              />

              <Card className="relative">
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <CardTitle>{exp.title}</CardTitle>
                    <Badge variant="outline" className="text-xs font-normal">
                      {exp.period}
                    </Badge>
                  </div>
                  <div className="text-lg font-medium text-primary">{exp.company}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {exp.location}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{exp.description}</p>

                  <div>
                    <h4 className="font-medium mb-2">Key Achievements:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
