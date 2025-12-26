"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isLoginPage = pathname === "/admin/login"

    return (
        <>
            {!isLoginPage && <AdminSidebar />}
            {children}
        </>
    )
}

