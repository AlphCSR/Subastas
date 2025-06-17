"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { estadisticasDetalladas } from "@/lib/mock-data"

interface AdvancedChartProps {
  title: string
  description: string
  dataKey: keyof (typeof estadisticasDetalladas)[0]
  color?: string
}

export function AdvancedChart({ title, description, dataKey, color = "bg-primary" }: AdvancedChartProps) {
  const maxValue = Math.max(...estadisticasDetalladas.map((item) => Number(item[dataKey])))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <div className="flex h-full items-end justify-between gap-2">
            {estadisticasDetalladas.map((item, index) => {
              const height = (Number(item[dataKey]) / maxValue) * 100
              return (
                <div key={item.periodo} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full group">
                    <div
                      className={`w-full ${color} rounded-t-md transition-all duration-300 hover:opacity-80`}
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item[dataKey].toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{item.periodo}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Últimos 6 meses</span>
          <span className="font-medium">
            Total: {estadisticasDetalladas.reduce((acc, item) => acc + Number(item[dataKey]), 0).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
