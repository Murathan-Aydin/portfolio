"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Eye, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Globe, Monitor } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProtectedRoute } from "@/components/admin/protected-route"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data - Replace with real data from your analytics backend
const visitorsData = [
  { date: "01 Dec", visitors: 145, pageViews: 420 },
  { date: "05 Dec", visitors: 232, pageViews: 680 },
  { date: "10 Dec", visitors: 189, pageViews: 540 },
  { date: "15 Dec", visitors: 278, pageViews: 820 },
  { date: "20 Dec", visitors: 312, pageViews: 950 },
  { date: "25 Dec", visitors: 198, pageViews: 580 },
]

const topPagesData = [
  { page: "Accueil", views: 3420, percentage: 35 },
  { page: "Projets", views: 2180, percentage: 22 },
  { page: "Services", views: 1540, percentage: 16 },
  { page: "Contact", views: 1230, percentage: 13 },
  { page: "Devis", views: 980, percentage: 10 },
]

const deviceData = [
  { name: "Desktop", value: 58, color: "#40c9a2" },
  { name: "Mobile", value: 35, color: "#a3f7b5" },
  { name: "Tablet", value: 7, color: "#e5f9e0" },
]

const sourceData = [
  { source: "Direct", visitors: 1240 },
  { source: "Google", visitors: 980 },
  { source: "Social", visitors: 540 },
  { source: "Référent", visitors: 320 },
]

const stats = [
  {
    title: "Visiteurs uniques",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Pages vues",
    value: "12,493",
    change: "+8.2%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Durée moyenne",
    value: "2m 34s",
    change: "+15%",
    trend: "up",
    icon: Clock,
  },
  {
    title: "Taux de rebond",
    value: "42.3%",
    change: "-3.1%",
    trend: "up",
    icon: TrendingUp,
  },
]

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("month")

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminSidebar />

        <main className="ml-64 p-8">
          <div className="flex items-center justify-between mb-6">
            <AdminHeader title="Analytics" description="Statistiques de votre site web" />
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">7 derniers jours</SelectItem>
                <SelectItem value="month">30 derniers jours</SelectItem>
                <SelectItem value="quarter">3 derniers mois</SelectItem>
                <SelectItem value="year">12 derniers mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          stat.trend === "up" ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Visiteurs et pages vues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      visitors: {
                        label: "Visiteurs",
                        color: "#40c9a2",
                      },
                      pageViews: {
                        label: "Pages vues",
                        color: "#a3f7b5",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={visitorsData}>
                        <defs>
                          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#40c9a2" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#40c9a2" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a3f7b5" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#a3f7b5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="visitors"
                          stroke="#40c9a2"
                          fillOpacity={1}
                          fill="url(#colorVisitors)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="pageViews"
                          stroke="#a3f7b5"
                          fillOpacity={1}
                          fill="url(#colorPageViews)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    Appareils
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {deviceData.map((device) => (
                      <div key={device.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                        <span className="text-sm text-muted-foreground">
                          {device.name} ({device.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Pages les plus vues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPagesData.map((page, index) => (
                      <div key={page.page} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{page.page}</span>
                          <span className="text-sm text-muted-foreground">{page.views.toLocaleString()} vues</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${page.percentage}%` }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Sources de trafic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      visitors: {
                        label: "Visiteurs",
                        color: "#40c9a2",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sourceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis type="number" stroke="#6b7280" fontSize={12} />
                        <YAxis dataKey="source" type="category" stroke="#6b7280" fontSize={12} width={80} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="visitors" fill="#40c9a2" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Les données affichées sont des exemples. Connectez votre backend MongoDB pour afficher vos vraies
              statistiques.
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
