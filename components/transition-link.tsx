"use client"

import { useRouter, usePathname } from "next/navigation"
import { animatePageOut } from "@/lib/animations"

interface TransitionLinkProps {
    href: string
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        onClick?.()

        const currentBase = pathname.split("#")[0]
        const targetBase = href.split("#")[0]

        // Same page with anchor: smooth scroll, no transition
        if (currentBase === targetBase) {
            if (href.includes("#")) {
                const id = href.split("#")[1]
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
            return
        }

        animatePageOut(href, router)
    }

    return (
        <a href={href} className={className} onClick={handleClick}>
            {children}
        </a>
    )
}
