"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { BrainCircuit, Briefcase, GraduationCap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import MagneticElement from "./magnetic-element"
import MobileAbout from "./MobileAbout"



export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
const aboutContent = {
    title: "About Me",
    description: `I’m currently in my 4th year of a B.E./B.Tech program and I’m a passionate web developer based in Chennai🌴. My main technical skills include Java, Python, C/C++, React, Next.js, Node.js, and MongoDB, which I leverage to create scalable and user-friendly🕊️web applications.`,
    location: "Chennai",
    additionalInfo: `Web development and design are not only my areas of expertise but also my true passion💓. I take great pride in crafting functional and visually appealing digital💡solutions. When I’m not coding, I enjoy 🤸 playing cricket and kabaddi, listening to music🎧, and engaging in creative challenges.`
  }
  const personalInfo = {
    name: "Hemanth Kumar Telukuntla",
    title: "Developer",
    birthday: "May 08, 2003",
    phone: "+91 93929-61094",
    email: "hemanthkumartelukuntla143@gmail.com",
    location: "Chennai, India",
    languages: "English, Telugu, Hindi, Tamil",
    freelance: "Available"
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
    <section id="about" className="py-10">
      
      <div className="container mx-auto px-4">
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center hidden sm:block mb-8"
    >
      <span className="text-sm  font-medium text-primary">About Me</span>
      <h2 className="text-3xl font-bold mt-1 mb-4">{aboutContent.title}</h2>
      <div className="h-1 w-20 bg-primary mx-auto" />
    </motion.div>
        {/* Mobile View */}
            <div className="lg:hidden md:hidden relative z-10">
      
              <MobileAbout />
            </div>
        <div className="w-full hidden sm:block px-0 sm:px-4  mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="relative h-full">
              <div className="relative w-full h-full min-h-[600px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/profile.jpg?height=800&width=600" alt="Hemanth Kumar" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10" />
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
              <motion.div
                className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </motion.div>

            <div>
              <motion.div variants={itemVariants} className="mb-6">
                <h2 className="text-3xl font-bold mt-1 mb-4">Professional Background</h2>
                <div className="h-1 w-20 bg-primary mb-6" />
                <p className="text-muted-foreground mb-4">
                  I am a developer with a passion for coding and the continuous upgrading of my skills. My websites are
                  dynamic and user-friendly, integrating technical skills with creative problem-solving. Always excited
                  about innovative ideas and collaborations.
                </p>

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold">Personal Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name:</p>
                      <p className="font-medium">Hemanth Kumar Telukuntla</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Birthday:</p>
                      <p className="font-medium">May 08, 2003</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone:</p>
                      <p className="font-medium">+91 93929-61094</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location:</p>
                      <p className="font-medium">Chennai, India</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email:</p>
                      <p className="font-medium">hemanthkumartelukuntla143@gmail.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Languages:</p>
                      <p className="font-medium">English, Telugu, Hindi, Tamil</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Freelance:</p>
                      <p className="font-medium">Available</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <MagneticElement strength={30} as="div">
                      <Button className="bg-primary hover:bg-primary/90" asChild>
                        <a href="/resume.pdf" download>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Download CV
                        </a>
                      </Button>
                    </MagneticElement>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-2 rounded-md">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Problem Solver</h3>
                      <p className="text-sm text-muted-foreground">
                        Analytical thinker transforming complex challenges into intuitive, elegant solutions.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-2 rounded-md">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Professional</h3>
                      <p className="text-sm text-muted-foreground">Hands-on experience building and deploying real-world projects with practical problem-solving.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-2 rounded-md">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Continuous Learner</h3>
                      <p className="text-sm text-muted-foreground">Always exploring new technologies</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-2 rounded-md">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Passionate</h3>
                      <p className="text-sm text-muted-foreground">Dedicated to creating exceptional user experiences</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
                </div>
          <motion.div
            className="max-w-10xl relative mt-16 lg:px-24 px-8 space-y-8 sm:block hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
>
            <p style={{ textAlign: 'justify' }} className="text-xl text-black-300 dark:text-gray-300">{aboutContent.description}</p>
            <p style={{ textAlign: 'justify' }} className="text-xl text-black-300 dark:text-gray-300">
             I&rsquo;ve had the opportunity to work 👨🏻‍💻 as a Data Analyst at Skillforge, where I honed my analytical skills and appreciated the importance of teamwork and collaboration 🤝. In addition to my professional experience, I possess 🧠 strong problem-solving abilities, team management skills, and leadership qualities, which enable me to thrive in both academic and project environments.

            </p>
            <p style={{ textAlign: 'justify' }} className="text-xl text-black-300 dark:text-gray-300">{aboutContent.additionalInfo}</p>
            <p style={{ textAlign: 'justify' }} className="text-xl text-black-300 dark:text-gray-300">I&rsquo;m excited to continue my growth as a developer and contribute to meaningful projects that blend innovation with an excellent user experience. I&rsquo;m ready to connect and create some digital magic together! ✨ </p>
            <div className="flex gap-6">
              <motion.a
                href="https://www.instagram.com/hemanth_kumar_telukuntla?igsh=MWFucmlreGwwdGdhMA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.153-1.772 4.902 4.902 0 01-1.772-1.153c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/hemanth-kumar-telukuntla-14a8572b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://github.com/imhemathkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
    </section>
  )
}
