"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search } from "lucide-react"

export function HistoryView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  const activities = [
    {
      id: "1",
      action: "Puja realizada",
      description: 'Puja de $850 en "Reloj Vintage Omega"',
      user: "Juan Pérez",
      timestamp: "2024-01-15 14:30:00",
      type: "bid",
      ip: "192.168.1.100",
    },
    {
      id: "2",
      action: "Subasta creada",
      description: 'Nueva subasta "Pintura Original" creada',
      user: "María García",
      timestamp: "2024-01-15 10:15:00",
      type: "auction",
      ip: "192.168.1.101",
    },
    {
      id: "3",
      action: "Usuario registrado",
      description: "Nuevo usuario registrado en el sistema",
      user: "Carlos López",
      timestamp: "2024-01-15 09:45:00",
      type: "user",
      ip: "192.168.1.102",
    },
    {
      id: "4",
      action: "Subasta finalizada",
      description: 'Subasta "Guitarra Vintage" finalizada',
      user: "Sistema",
      timestamp: "2024-01-14 18:00:00",
      type: "auction",
      ip: "N/A",
    },
    {
      id: "5",
      action: "Perfil actualizado",
      description: "Información de perfil modificada",
      user: "Ana Martínez",
      timestamp: "2024-01-14 16:20:00",
      type: "profile",
      ip: "192.168.1.103",
    },
  ]

  const getActionBadge = (type: string) => {
    switch (type) {
      case "bid":
        return <Badge className="bg-green-100 text-green-800">Puja</Badge>
      case "auction":
        return <Badge className="bg-blue-100 text-blue-800">Subasta</Badge>
      case "user":
        return <Badge className="bg-purple-100 text-purple-800">Usuario</Badge>
      case "profile":
        return <Badge className="bg-orange-100 text-orange-800">Perfil</Badge>
      default:
        return <Badge variant="secondary">Sistema</Badge>
    }
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = actionFilter === "all" || activity.type === actionFilter
    return matchesSearch && matchesAction
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Historial de Actividad</h1>
        <p className="text-gray-600">Registro completo de todas las acciones del sistema</p>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar actividad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las acciones</SelectItem>
            <SelectItem value="bid">Pujas</SelectItem>
            <SelectItem value="auction">Subastas</SelectItem>
            <SelectItem value="user">Usuarios</SelectItem>
            <SelectItem value="profile">Perfil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Registro de Actividades</span>
          </CardTitle>
          <CardDescription>{filteredActivities.length} actividades encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{activity.action}</h3>
                      {getActionBadge(activity.type)}
                    </div>
                    <span className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>

                  <p className="text-gray-600 mb-2">{activity.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Usuario: {activity.user}</span>
                    {activity.ip !== "N/A" && <span>IP: {activity.ip}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
