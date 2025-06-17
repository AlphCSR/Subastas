"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  description?: string
  trend?: "up" | "down" | "neutral"
}

export function StatsCard({ title, value, change, icon, description, trend }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {change !== undefined && (
          <div className={`flex items-center mt-2 text-xs ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {change >= 0 ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
            <span>{Math.abs(change)}% desde el mes pasado</span>
          </div>
        )}
      </CardContent>
      {trend && (
        <div
          className={`absolute top-0 right-0 w-1 h-full ${
            trend === "up" ? "bg-green-500" : trend === "down" ? "bg-red-500" : "bg-gray-300"
          }`}
        />
      )}
    </Card>
  )
}
