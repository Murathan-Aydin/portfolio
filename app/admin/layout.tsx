import type React from "react"
import { SessionProviderWrapper } from "@/components/admin/session-provider-wrapper"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper"

export const metadata = {
    title: "Admin - MA.DEV",
    description: "Espace d'administration MA.DEV",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProviderWrapper>
            <AdminAuthProvider>
                <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
            </AdminAuthProvider>
        </SessionProviderWrapper>
    )
}
