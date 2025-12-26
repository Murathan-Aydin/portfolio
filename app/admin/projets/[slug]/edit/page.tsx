"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Save, ArrowLeft, Plus, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { getProjectBySlug, type Project } from "@/lib/projects-data"
import Link from "next/link"

export default function EditProjectPage() {
    const router = useRouter()
    const params = useParams()
    const slug = params.slug as string

    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [formData, setFormData] = useState<Project | null>(null)
    const [newTag, setNewTag] = useState("")
    const [newFeature, setNewFeature] = useState("")

    useEffect(() => {
        // TODO: Replace with API call to your MongoDB backend
        // const project = await fetch(`/api/projects/${slug}`).then(res => res.json())
        const project = getProjectBySlug(slug)
        if (project) {
            setFormData(project)
        }
        setIsFetching(false)
    }, [slug])

    const addTag = () => {
        if (formData && newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
            setNewTag("")
        }
    }

    const removeTag = (tag: string) => {
        if (formData) {
            setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
        }
    }

    const addFeature = () => {
        if (formData && newFeature.trim()) {
            setFormData({ ...formData, features: [...formData.features, newFeature.trim()] })
            setNewFeature("")
        }
    }

    const removeFeature = (index: number) => {
        if (formData) {
            setFormData({
                ...formData,
                features: formData.features.filter((_, i) => i !== index),
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return

        setIsLoading(true)

        try {
            // TODO: Replace with API call to your MongoDB backend
            // await fetch(`/api/projects/${slug}`, {
            //   method: 'PUT',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData),
            // })

            await new Promise((resolve) => setTimeout(resolve, 1000))
            router.push("/admin/projets")
        } catch (error) {
            console.error("Error updating project:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isFetching) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-background">
                    <AdminSidebar />
                    <main className="ml-64 p-8 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </main>
                </div>
            </ProtectedRoute>
        )
    }

    if (!formData) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-background">
                    <AdminSidebar />
                    <main className="ml-64 p-8">
                        <div className="text-center py-12">
                            <p className="text-muted-foreground mb-4">Projet non trouvé</p>
                            <Link href="/admin/projets">
                                <Button>Retour aux projets</Button>
                            </Link>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        )
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <AdminSidebar />

                <main className="ml-64 p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Link href="/admin/projets">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <AdminHeader title={`Modifier: ${formData.title}`} description="Modifiez les informations du projet" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informations générales</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="title">Titre du projet *</Label>
                                                <Input
                                                    id="title"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="slug">Slug (URL)</Label>
                                                <Input
                                                    id="slug"
                                                    value={formData.slug}
                                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description courte *</Label>
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                rows={2}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="longDescription">Description détaillée</Label>
                                            <Textarea
                                                id="longDescription"
                                                value={formData.longDescription}
                                                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                                rows={5}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="clientName">Nom du client *</Label>
                                                <Input
                                                    id="clientName"
                                                    value={formData.clientName}
                                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="projectDate">Date du projet</Label>
                                                <Input
                                                    id="projectDate"
                                                    value={formData.projectDate}
                                                    onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="projectUrl">URL du projet</Label>
                                            <Input
                                                id="projectUrl"
                                                type="url"
                                                value={formData.projectUrl || ""}
                                                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Technologies & Fonctionnalités</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label>Technologies utilisées</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    placeholder="Ex: Next.js, React..."
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault()
                                                            addTag()
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={addTag} variant="outline">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {tag}
                                                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Fonctionnalités clés</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={newFeature}
                                                    onChange={(e) => setNewFeature(e.target.value)}
                                                    placeholder="Ex: Design responsive..."
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault()
                                                            addFeature()
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={addFeature} variant="outline">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <ul className="space-y-2 mt-2">
                                                {formData.features.map((feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded-lg"
                                                    >
                                                        <span className="text-sm">{feature}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFeature(index)}
                                                            className="text-muted-foreground hover:text-destructive"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Image principale</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {formData.image && (
                                                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                                                    <img
                                                        src={formData.image || "/placeholder.svg"}
                                                        alt={formData.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <Label htmlFor="imageUrl">URL de l'image</Label>
                                                <Input
                                                    id="imageUrl"
                                                    type="url"
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Enregistrement...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Enregistrer
                                                </>
                                            )}
                                        </Button>
                                        <Link href="/admin/projets" className="block">
                                            <Button type="button" variant="outline" className="w-full bg-transparent">
                                                Annuler
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    )
}
