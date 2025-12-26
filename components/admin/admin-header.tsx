"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-sm sm:text-base text-muted-foreground mt-1">{description}</p>}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="w-full sm:w-64 pl-10 bg-muted/50 text-sm" />
        </div>
        <Button variant="ghost" size="icon" className="relative flex-shrink-0">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
      </div>
    </header>
  )
}
