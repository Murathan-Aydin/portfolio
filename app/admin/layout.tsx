import type React from "react"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"

export const metadata = {
  title: "Admin - MA.DEV",
  description: "Espace d'administration MA.DEV",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>
}
