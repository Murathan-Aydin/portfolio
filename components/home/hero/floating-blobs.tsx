"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function FloatingBlobs() {
  const mainBlobRef = useRef<HTMLDivElement>(null)
  const secondaryBlobRef = useRef<HTMLDivElement>(null)
  const tertiaryBlobRef = useRef<HTMLDivElement>(null)
  const shape1Ref = useRef<HTMLDivElement>(null)
  const shape2Ref = useRef<HTMLDivElement>(null)
  const circle1Ref = useRef<HTMLDivElement>(null)
  const circle2Ref = useRef<HTMLDivElement>(null)
  const circle3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Main blob animation
    if (mainBlobRef.current) {
      gsap.to(mainBlobRef.current, {
        y: -20,
        rotate: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    // Secondary blob
    if (secondaryBlobRef.current) {
      gsap.to(secondaryBlobRef.current, {
        y: 15,
        x: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      })
    }

    // Tertiary blob
    if (tertiaryBlobRef.current) {
      gsap.to(tertiaryBlobRef.current, {
        y: -15,
        x: 15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      })
    }

    // Geometric shapes rotation
    if (shape1Ref.current) {
      gsap.to(shape1Ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }

    if (shape2Ref.current) {
      gsap.to(shape2Ref.current, {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
      })
    }

    // Small circles
    if (circle1Ref.current) {
      gsap.to(circle1Ref.current, {
        scale: 1.2,
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    if (circle2Ref.current) {
      gsap.to(circle2Ref.current, {
        scale: 1.3,
        opacity: 0.8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.75,
      })
    }

    if (circle3Ref.current) {
      gsap.to(circle3Ref.current, {
        scale: 1.15,
        opacity: 0.6,
        duration: 1.75,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.25,
      })
    }

    return () => {
      gsap.killTweensOf([
        mainBlobRef.current,
        secondaryBlobRef.current,
        tertiaryBlobRef.current,
        shape1Ref.current,
        shape2Ref.current,
        circle1Ref.current,
        circle2Ref.current,
        circle3Ref.current,
      ])
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Main large blob */}
      <div
        ref={mainBlobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-primary/30 blur-3xl"
      />

      {/* Secondary blob */}
      <div
        ref={secondaryBlobRef}
        className="absolute top-1/4 right-1/4 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-accent/40 blur-2xl"
      />

      {/* Tertiary blob */}
      <div
        ref={tertiaryBlobRef}
        className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-secondary/60 blur-2xl"
      />

      {/* Geometric shapes */}
      <div
        ref={shape1Ref}
        className="absolute top-1/3 left-1/3 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 border-primary/20 rounded-3xl"
      />

      <div
        ref={shape2Ref}
        className="absolute bottom-1/3 right-1/3 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-4 border-accent/30 rounded-2xl"
      />

      {/* Small circles */}
      <div
        ref={circle1Ref}
        className="absolute top-1/4 left-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary"
      />

      <div
        ref={circle2Ref}
        className="absolute bottom-1/3 left-1/3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent"
      />

      <div
        ref={circle3Ref}
        className="absolute top-2/3 right-1/4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/60"
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
