"use client"

import { useAnalytics } from "@/lib/analytics"

interface AnalyticsProviderProps {
    clientId: string
    apiUrl?: string
    excludePaths?: string[]
}

export function AnalyticsProvider({ clientId, apiUrl, excludePaths }: AnalyticsProviderProps) {
    useAnalytics({
        clientId,
        apiUrl: apiUrl || process.env.NEXT_PUBLIC_API_URL,
        excludePaths: excludePaths || ["/admin", "/api"],
    })

    return null
}

