"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/providers/auth-provider"
import { Gavel, Package, Users, TrendingUp } from "lucide-react"

export function OverviewView() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Subastas Activas",
      value: "12",
      description: "3 finalizan hoy",
      icon: Gavel,
      color: "text-blue-600",
    },
    {
      title: "Productos",
      value: "48",
      description: "5 nuevos esta semana",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Usuarios Activos",
      value: "234",
      description: "12 nuevos hoy",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Ventas del Mes",
      value: "$15,420",
      description: "+12% vs mes anterior",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-600">Resumen de actividad del sistema de subastas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subastas Recientes</CardTitle>
            <CardDescription>Últimas subastas creadas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <p className="font-medium">Producto de Ejemplo {item}</p>
                    <p className="text-sm text-gray-600">Finaliza en 2 horas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${(Math.random() * 1000).toFixed(0)}</p>
                    <p className="text-sm text-gray-600">Puja actual</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Nueva puja realizada", time: "Hace 5 min", user: "Usuario123" },
                { action: "Subasta finalizada", time: "Hace 15 min", user: "Sistema" },
                { action: "Nuevo producto agregado", time: "Hace 1 hora", user: "Subastador1" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">por {activity.user}</p>
                  </div>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
