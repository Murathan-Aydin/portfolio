import mongoose, { Schema, Model, Document } from "mongoose"

export interface IAnalytics extends Document {
    date: Date
    path: string
    visitorId?: string
    sessionId?: string
    userAgent?: string
    referrer?: string
    device?: "desktop" | "mobile" | "tablet"
    country?: string
    duration?: number
    createdAt: Date
    updatedAt: Date
}

const AnalyticsSchema = new Schema<IAnalytics>(
    {
        date: {
            type: Date,
            required: true,
            index: true,
        },
        path: {
            type: String,
            required: true,
            index: true,
        },
        visitorId: {
            type: String,
            index: true,
        },
        sessionId: {
            type: String,
            index: true,
        },
        userAgent: String,
        referrer: String,
        device: {
            type: String,
            enum: ["desktop", "mobile", "tablet"],
        },
        country: String,
        duration: Number,
    },
    {
        timestamps: true,
    }
)

// Index composé pour les requêtes de date et path
AnalyticsSchema.index({ date: 1, path: 1 })
AnalyticsSchema.index({ date: -1 })

const Analytics: Model<IAnalytics> = mongoose.models.Analytics || mongoose.model<IAnalytics>("Analytics", AnalyticsSchema)

export default Analytics

