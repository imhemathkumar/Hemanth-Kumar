"use client"

import React from "react"
import { motion } from "framer-motion"

interface SectionProps {
  id: string
  onAnimationComplete: (id: string) => void
  children: React.ReactNode
}

export function Section({ id, onAnimationComplete, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => onAnimationComplete(id)}
      className="min-h-screen py-20"
    >
      {children}
    </motion.section>
  )
}
