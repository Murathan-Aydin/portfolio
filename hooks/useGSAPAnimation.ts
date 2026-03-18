import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Enregistrer ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface UseGSAPAnimationOptions {
    trigger?: string | Element | null
    start?: string
    end?: string
    once?: boolean
    mobile?: boolean
}

export function useGSAPAnimation(
    animation: (targets: gsap.TweenTarget) => gsap.core.Tween,
    options: UseGSAPAnimationOptions = {}
) {
    const ref = useRef<HTMLElement>(null)
    const { once = true, mobile = true } = options

    useEffect(() => {
        if (!ref.current) return

        // Désactiver les animations sur mobile si demandé
        if (!mobile && window.innerWidth < 768) {
            return
        }

        const element = ref.current
        const ctx = gsap.context(() => {
            if (options.trigger || options.start) {
                // Animation avec ScrollTrigger
                const animationInstance = animation(element)
                ScrollTrigger.create({
                    trigger: options.trigger || element,
                    start: options.start || "top 80%",
                    end: options.end,
                    animation: animationInstance,
                    once,
                    invalidateOnRefresh: true,
                })
            } else {
                // Animation simple
                animation(element)
            }
        })

        return () => ctx.revert()
    }, [])

    return ref
}

export function useStaggerAnimation(
    selector: string,
    animation: (targets: gsap.TweenTarget) => gsap.core.Tween,
    options: UseGSAPAnimationOptions = {}
) {
    const containerRef = useRef<HTMLElement>(null)
    const { once = true, mobile = true } = options

    useEffect(() => {
        if (!containerRef.current) return

        // Désactiver les animations sur mobile si demandé
        if (!mobile && window.innerWidth < 768) {
            return
        }

        const container = containerRef.current
        const ctx = gsap.context(() => {
            const elements = container.querySelectorAll(selector)
            if (elements.length === 0) return

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: options.trigger || container,
                    start: options.start || "top 80%",
                    end: options.end,
                    once,
                    invalidateOnRefresh: true,
                },
            })

            elements.forEach((element, index) => {
                timeline.add(animation(element), index * 0.1)
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return containerRef
}

