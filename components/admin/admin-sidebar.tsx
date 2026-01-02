"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { LayoutDashboard, FolderKanban, BarChart3, LogOut, Plus, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/contexts/admin-auth-context"

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projets", label: "Projets", icon: FolderKanban },
  { href: "/admin/projets/new", label: "Nouveau projet", icon: Plus },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAdminAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    menuItemsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, delay: index * 0.1 })
      }
    })
  }, [])

  // Fermer le menu quand on change de page sur mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg shadow-lg cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40 transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <div>
            <span className="font-bold text-foreground">MA.DEV</span>
            <span className="block text-xs text-muted-foreground">Administration</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.href} href={item.href}>
              <div
                ref={(el) => {
                  menuItemsRef.current[index] = el
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:translate-x-1",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link href="/" target="_blank">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-medium">Voir le site</span>
          </div>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>

      {user && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
      </aside>
    </>
  )
}
