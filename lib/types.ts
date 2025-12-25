export interface Project {
    _id?: string
    slug: string
    title: string
    description: string
    longDescription: string
    tags: string[]
    image: string
    gallery: string[]
    clientName: string
    projectDate: string
    projectUrl?: string
    features: string[]
    createdAt?: Date
    updatedAt?: Date
}

export interface AnalyticsData {
    date: string
    visitors: number
    pageViews: number
    uniqueVisitors: number
}

export interface DashboardStats {
    totalProjects: number
    totalVisitors: number
    pageViews: number
    conversionRate: number
    devisRequests: number
}

export interface User {
    _id?: string
    email: string
    name: string
    role: "admin" | "editor"
}
