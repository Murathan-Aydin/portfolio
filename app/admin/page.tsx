// cette page redirige vers la page de login

import { redirect } from "next/navigation"

export default function AdminPage() {
    redirect("/admin/login")
}