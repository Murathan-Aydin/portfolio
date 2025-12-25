"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AdminUser {
    id: string
    email: string
    name: string
}

interface AdminAuthContextType {
    user: AdminUser | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // TODO: Replace with NextAuth session check
        // Example: const session = await getSession()
        const storedUser = localStorage.getItem("admin_user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        // TODO: Replace with NextAuth signIn
        // Example: const result = await signIn("credentials", { email, password, redirect: false })

        // Mock login for demo - replace with your NextAuth implementation
        if (email === "REDACTED_ADMIN_EMAIL" && password === "REDACTED_ADMIN_PASSWORD") {
            const mockUser = { id: "1", email, name: "Admin MA.DEV" }
            setUser(mockUser)
            localStorage.setItem("admin_user", JSON.stringify(mockUser))
            return true
        }
        return false
    }

    const logout = () => {
        // TODO: Replace with NextAuth signOut
        // Example: await signOut({ redirect: false })
        setUser(null)
        localStorage.removeItem("admin_user")
        router.push("/admin/login")
    }

    return <AdminAuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext)
    if (context === undefined) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider")
    }
    return context
}
