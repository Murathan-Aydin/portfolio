"use client"

import { motion } from "framer-motion"

export function FloatingBlobs() {
  return (
    <div className="relative w-full h-full">
      {/* Main large blob */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/30 blur-3xl"
      />

      {/* Secondary blob */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/4 right-1/4 w-48 h-48 md:w-56 md:h-56 rounded-full bg-accent/40 blur-2xl"
      />

      {/* Tertiary blob */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 left-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full bg-secondary/60 blur-2xl"
      />

      {/* Geometric shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/3 left-1/3 w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 rounded-3xl"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute bottom-1/3 right-1/3 w-24 h-24 md:w-32 md:h-32 border-4 border-accent/30 rounded-2xl"
      />

      {/* Small circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 w-8 h-8 rounded-full bg-primary"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-1/3 left-1/3 w-6 h-6 rounded-full bg-accent"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-2/3 right-1/4 w-10 h-10 rounded-full bg-primary/60"
      />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 gap-6 p-8">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          ))}
        </div>
      </div>
    </div>
  )
}
