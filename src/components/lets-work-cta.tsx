"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import MagneticElement from "./magnetic-element"

export default function LetsWorkCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-32 md:py-40 lg:py-48">
      <div className="lg:container md:container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="justify-left"
        >
          <p className="text-xl mb-6">Have a project in mind?<span className="text-4xl">💖</span></p>
          </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <MagneticElement as="div" strength={40} className="cursor-none">
          <Link 
            href="mailto:hemanthkumartelukuntla143@gmail.com" 
            className="inline-block cursor-none" 
            data-hide-cursor
          >
            <h2 className="text-7xl md:text-9xl lg:text-[12rem] xl:text-[12rem] font-black tracking-tight transition-colors duration-300 items-center justify-center gap-4 leading-none cursor-none">
             <div>LET'S WORK</div>
            </h2>
          </Link>
          </MagneticElement>
        </motion.div>
        <MagneticElement as="div" strength={40} className="mt-6 float-right">
          <Link href="https://contra.com/hemanth_kumar_telukuntl_p7th08mi">
          <Button
          size="lg" className="text-lg bg-[#EA6A47] dark:bg-primary text-white  dark:text-white px-4 lg:px-6 md:px-6 py-5 rounded-xl inline-flex gap-2">
              <img src="/logo.svg" alt="" className="w-5 h-5" />
              Hire Me on Contra
          </Button> 
          </Link> 
        </MagneticElement>
      </div>
    </section>
  )
}
