'use client'

import { Button } from "@/components/ui/button"
import { useHasMounted } from "@/hooks/useHasMounted"
import { motion } from "framer-motion"
import { ArrowRight, Download } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      type: "spring",
      stiffness: 300
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeInOut"
    }
  }
}

export default function HeroMobile() {
  const hasMounted = useHasMounted()

  // Don't render anything until mounted to prevent hydration mismatch
  if (!hasMounted) {
    return null
  }

return (
    <div className="text-center px-4 relative"> {/* Removed pb-4 */}
            {/* Large text background */}
    <div className="md:hidden absolute inset-0 -top-20 flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] -z-10">
    <h1 className="text-[120vw] font-extrabold tracking-tighter leading-none">HEMANTH</h1>
    </div>
        <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/20 dark:border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/20 dark:border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] border border-primary/20 dark:border-primary/20 rotate-45 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[200px] h-[200px] border border-primary/20 dark:border-primary/20 -rotate-45 animate-pulse" />
                </div>
        <motion.div 
            className="space-y-1" // Changed from space-y-2 to space-y-1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-32 h-32 mb-8 mx-auto">
                <Image
                    src="/images/pic.jpg"
                    alt="Profile photo"
                    fill
                    className="rounded-full border-4 border-cyan-500  dark:border-white object-cover"
                />
                <span className="absolute bottom-1 right-1 text-4xl "> 👋 </span>
            </div>
            <div className="mb-8 ">
            <h3 className="text-[2rem] font-bold mb-8 tracking-tight dark:text-primary text-primary">
                Hi There, I&apos;m Hemanth Kumar
            </h3>
            </div>
            
            <p className="text-lg text-muted-foreground mt-6 dark:text-gray-300 max-w-md mx-auto">
                I&apos;m a Web Developer with expertise in full-stack development, UI/UX design, and modern web technologies.
            </p>
            <div className="flex flex-col gap-4 max-w-xs mx-auto w-full">
                <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="mt-6"
                >
                    
                    <Link href="#contact" className="w-full">
                        <Button 
                            size="lg" 
                            className="w-auto bg-primary dark:bg-primary hover:bg-black/90 dark:hover:bg-white/90 text-white dark:text-white hover:dark:text-black rounded-full transition-all hover:shadow-lg"
                        >
                            Get in touch
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
                
                <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="mb-6"
                >
                    <Link 
                        href="/resume.pdf"
                        className="w-full"
                        download="resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button 
                            variant="secondary"
                            size="lg" 
                            className="w-auto dark:bg-orange-400 bg-orange-400 hover:text-black dark:hover:text-white dark:hover:bg-transparent text-white rounded-full"
                        >
                            Download CV
                            <Download className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
            <div className="flex justify-center gap-4 pb-2"> {/* Added pb-2 to reduce space before About section */}
                <motion.a
                    href="https://www.linkedin.com/in/hemanth-kumar-telukuntla-14a8572b3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-transparent text-blue-500 hover:text-yellow-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </motion.a>
                <motion.a
                    href="https://github.com/imhemathkumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-transparent text-yellow-500 hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
      </motion.div>
    </div>
  )
}

