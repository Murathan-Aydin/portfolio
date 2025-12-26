"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
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
    const { data: session, status } = useSession()
    const router = useRouter()

    const user: AdminUser | null = session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
        }
        : null

    const isLoading = status === "loading"

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.ok) {
                router.push("/admin/dashboard")
                return true
            }
            return false
        } catch (error) {
            console.error("Login error:", error)
            return false
        }
    }

    const logout = async () => {
        await signOut({ redirect: false })
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
