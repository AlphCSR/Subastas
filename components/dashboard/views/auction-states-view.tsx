"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Play, Square, CheckCircle, AlertTriangle, Clock, Gavel, Package, CreditCard, Truck } from "lucide-react"

interface AuctionState {
  id: string
  title: string
  currentState:
    | "draft"
    | "scheduled"
    | "active"
    | "ending"
    | "ended"
    | "payment_pending"
    | "payment_completed"
    | "shipped"
    | "delivered"
    | "disputed"
    | "cancelled"
  startTime: string
  endTime: string
  currentBid: number
  bidsCount: number
  winner?: string
  paymentStatus?: "pending" | "completed" | "failed"
  shippingStatus?: "pending" | "shipped" | "delivered"
}

export function AuctionStatesView() {
  const [auctions, setAuctions] = useState<AuctionState[]>([
    {
      id: "1",
      title: "Reloj Vintage Omega",
      currentState: "active",
      startTime: "2024-01-15T10:00:00",
      endTime: "2024-01-15T18:00:00",
      currentBid: 1250,
      bidsCount: 23,
    },
    {
      id: "2",
      title: "Pintura Original",
      currentState: "payment_pending",
      startTime: "2024-01-14T12:00:00",
      endTime: "2024-01-14T20:00:00",
      currentBid: 2100,
      bidsCount: 18,
      winner: "María García",
      paymentStatus: "pending",
    },
    {
      id: "3",
      title: "Guitarra Fender",
      currentState: "shipped",
      startTime: "2024-01-12T14:00:00",
      endTime: "2024-01-12T22:00:00",
      currentBid: 3200,
      bidsCount: 31,
      winner: "Carlos López",
      paymentStatus: "completed",
      shippingStatus: "shipped",
    },
  ])

  const { toast } = useToast()

  const stateTransitions = {
    draft: ["scheduled", "cancelled"],
    scheduled: ["active", "cancelled"],
    active: ["ending", "cancelled"],
    ending: ["ended"],
    ended: ["payment_pending", "cancelled"],
    payment_pending: ["payment_completed", "disputed", "cancelled"],
    payment_completed: ["shipped"],
    shipped: ["delivered", "disputed"],
    delivered: [],
    disputed: ["payment_completed", "cancelled"],
    cancelled: [],
  }

  const getStateInfo = (state: string) => {
    const stateConfig = {
      draft: { label: "Borrador", color: "bg-gray-100 text-gray-800", icon: Package },
      scheduled: { label: "Programada", color: "bg-blue-100 text-blue-800", icon: Clock },
      active: { label: "Activa", color: "bg-green-100 text-green-800", icon: Play },
      ending: { label: "Finalizando", color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
      ended: { label: "Finalizada", color: "bg-purple-100 text-purple-800", icon: Square },
      payment_pending: { label: "Pago Pendiente", color: "bg-yellow-100 text-yellow-800", icon: CreditCard },
      payment_completed: { label: "Pago Completado", color: "bg-green-100 text-green-800", icon: CheckCircle },
      shipped: { label: "Enviado", color: "bg-blue-100 text-blue-800", icon: Truck },
      delivered: { label: "Entregado", color: "bg-green-100 text-green-800", icon: CheckCircle },
      disputed: { label: "En Disputa", color: "bg-red-100 text-red-800", icon: AlertTriangle },
      cancelled: { label: "Cancelada", color: "bg-red-100 text-red-800", icon: Square },
    }

    return stateConfig[state as keyof typeof stateConfig] || stateConfig.draft
  }

  const handleStateChange = (auctionId: string, newState: string) => {
    setAuctions((prev) =>
      prev.map((auction) =>
        auction.id === auctionId ? { ...auction, currentState: newState as AuctionState["currentState"] } : auction,
      ),
    )

    toast({
      title: "Estado actualizado",
      description: `El estado de la subasta ha sido cambiado a ${getStateInfo(newState).label}`,
    })
  }

  const getAvailableTransitions = (currentState: string) => {
    return stateTransitions[currentState as keyof typeof stateTransitions] || []
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Estados de Subastas</h1>
        <p className="text-gray-600">Administra el ciclo de vida completo de las subastas</p>
      </div>

      {/* Diagrama de Estados */}
      <Card>
        <CardHeader>
          <CardTitle>Flujo de Estados</CardTitle>
          <CardDescription>Ciclo de vida de una subasta desde creación hasta entrega</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.keys(stateTransitions).map((state) => {
              const stateInfo = getStateInfo(state)
              const Icon = stateInfo.icon
              return (
                <div key={state} className="text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className={stateInfo.color}>{stateInfo.label}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Subastas */}
      <Card>
        <CardHeader>
          <CardTitle>Subastas Activas</CardTitle>
          <CardDescription>Gestiona el estado de cada subasta individualmente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auctions.map((auction) => {
              const stateInfo = getStateInfo(auction.currentState)
              const Icon = stateInfo.icon
              const availableTransitions = getAvailableTransitions(auction.currentState)

              return (
                <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{auction.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Puja actual: ${auction.currentBid.toLocaleString()}</span>
                        <span>{auction.bidsCount} pujas</span>
                        {auction.winner && <span>Ganador: {auction.winner}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge className={stateInfo.color}>{stateInfo.label}</Badge>

                    {availableTransitions.length > 0 && (
                      <Select onValueChange={(value) => handleStateChange(auction.id, value)}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Cambiar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTransitions.map((transition) => {
                            const transitionInfo = getStateInfo(transition)
                            return (
                              <SelectItem key={transition} value={transition}>
                                {transitionInfo.label}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alertas y Notificaciones */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Alertas del Sistema</h2>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Hay 2 subastas con pagos pendientes que requieren seguimiento.</AlertDescription>
        </Alert>

        <Alert>
          <Gavel className="h-4 w-4" />
          <AlertDescription>3 subastas están programadas para finalizar en las próximas 2 horas.</AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
