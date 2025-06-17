"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { SagaEvent } from "@/lib/types"

interface SagaVisualizerProps {
  sagaEvents: SagaEvent[]
}

export default function SagaVisualizer({ sagaEvents }: SagaVisualizerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredEvents = sagaEvents.filter((event) => {
    const matchesSearch =
      event.sagaId.includes(searchTerm) || event.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || event.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID o descripción..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="completed">Completados</SelectItem>
            <SelectItem value="failed">Fallidos</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div
                className={`h-1 ${event.status === "completed" ? "bg-green-500" : event.status === "failed" ? "bg-red-500" : "bg-yellow-500"}`}
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{event.service}</h3>
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{new Date(event.timestamp).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Saga ID: {event.sagaId}</div>
                  </div>
                </div>

                {event.details && (
                  <div className="mt-4 p-3 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(event.details, null, 2)}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">No se encontraron eventos SAGA</div>
        )}
      </div>
    </div>
  )
}
