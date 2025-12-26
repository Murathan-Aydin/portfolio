"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/contexts/admin-auth-context"
import { gsap } from "gsap"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAdminAuth()
  const router = useRouter()
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/admin/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (isLoading && loaderRef.current) {
      gsap.to(loaderRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none",
      })
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div
          ref={loaderRef}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
