"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Plus, Pencil, Trash2, Eye, MoreVertical, Search, Filter, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProtectedRoute } from "@/components/admin/protected-route"
import type { Project } from "@/lib/types"

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [deleteProject, setDeleteProject] = useState<Project | null>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchProjects()
    }, [])

    useEffect(() => {
        if (!isLoading && gridRef.current && projects.length > 0) {
            const cards = gridRef.current.children
            gsap.fromTo(
                Array.from(cards),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }
            )
        }
    }, [isLoading, projects])

    const fetchProjects = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/projects")
            const data = await response.json()

            if (data.success) {
                setProjects(data.data)
            }
        } catch (error) {
            console.error("Error fetching projects:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.clientName.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleDelete = async () => {
        if (!deleteProject) return

        try {
            const response = await fetch(`/api/projects/${deleteProject.slug}`, {
                method: "DELETE",
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la suppression")
            }

            setProjects(projects.filter((p) => p.slug !== deleteProject.slug))
            setDeleteProject(null)
        } catch (error: any) {
            console.error("Error deleting project:", error)
            alert(error.message || "Erreur lors de la suppression du projet")
        }
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <main className="ml-64 p-8">
                    <AdminHeader title="Projets" description="Gérez vos projets et réalisations" />

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher un projet..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-80 pl-10"
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>

                        <Link href="/admin/projets/new">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                <Plus className="w-4 h-4 mr-2" />
                                Nouveau projet
                            </Button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <div key={project.slug}>
                                        <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                                            <div className="relative aspect-video overflow-hidden">
                                                <img
                                                    src={project.image || "/placeholder.svg"}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <Link href={`/projets/${project.slug}`} target="_blank">
                                                        <Button size="sm" variant="secondary">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/projets/${project.slug}/edit`}>
                                                        <Button size="sm" variant="secondary">
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{project.clientName}</p>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <Link href={`/projets/${project.slug}`} target="_blank">
                                                                <DropdownMenuItem>
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    Voir
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <Link href={`/admin/projets/${project.slug}/edit`}>
                                                                <DropdownMenuItem>
                                                                    <Pencil className="w-4 h-4 mr-2" />
                                                                    Modifier
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive"
                                                                onClick={() => setDeleteProject(project)}
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Supprimer
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-3">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-3">{project.projectDate}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                        </div>
                    )}

                    {!isLoading && filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                {searchQuery ? "Aucun projet trouvé" : "Aucun projet pour le moment"}
                            </p>
                        </div>
                    )}
                </main>

                <AlertDialog open={!!deleteProject} onOpenChange={() => setDeleteProject(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer ce projet ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer "{deleteProject?.title}" ? Cette action est irréversible.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                                Supprimer
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </ProtectedRoute>
    )
}
