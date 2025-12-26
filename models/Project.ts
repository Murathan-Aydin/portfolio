import mongoose, { Schema, Document, Model } from "mongoose"

export interface IProject extends Document {
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
    createdAt: Date
    updatedAt: Date
}

const ProjectSchema: Schema = new Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        longDescription: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        image: {
            type: String,
            required: true,
            default: "/placeholder.svg",
        },
        gallery: {
            type: [String],
            default: [],
        },
        clientName: {
            type: String,
            required: true,
        },
        projectDate: {
            type: String,
            required: true,
        },
        projectUrl: {
            type: String,
            default: "",
        },
        features: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

// Index pour améliorer les performances de recherche
ProjectSchema.index({ slug: 1 })
ProjectSchema.index({ title: "text", description: "text" })

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)

export default Project

