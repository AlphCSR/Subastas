"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Clock, Truck, Bell, Server, Database, Wifi, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function TechnicalSupportView() {
  const [systemStatus, setSystemStatus] = useState({
    auctions: "operational",
    payments: "operational",
    notifications: "degraded",
    database: "operational",
    api: "operational",
  })

  const erroredAuctions = [
    {
      id: "1",
      title: "Reloj Vintage Omega",
      error: "Error en procesamiento de puja",
      timestamp: "2024-01-15 14:30",
      status: "pending",
    },
    {
      id: "2",
      title: "Pintura Original",
      error: "Fallo en notificación de finalización",
      timestamp: "2024-01-15 12:15",
      status: "resolved",
    },
  ]

  const unconfirmedDeliveries = [
    {
      id: "1",
      auction: "Guitarra Fender",
      winner: "Carlos López",
      shippedDate: "2024-01-10",
      daysOverdue: 5,
    },
    {
      id: "2",
      auction: "Reloj Vintage",
      winner: "Ana Martínez",
      shippedDate: "2024-01-12",
      daysOverdue: 3,
    },
  ]

  const failedNotifications = [
    {
      id: "1",
      type: "Puja superada",
      recipient: "juan@example.com",
      auction: "Reloj Vintage",
      attempts: 3,
      lastAttempt: "2024-01-15 15:45",
    },
    {
      id: "2",
      type: "Subasta finalizada",
      recipient: "maria@example.com",
      auction: "Pintura Original",
      attempts: 2,
      lastAttempt: "2024-01-15 14:20",
    },
  ]

  const handleResolveError = (errorId: string) => {
    // Simular resolución de error
    toast({
      title: "Error resuelto",
      description: "El error ha sido marcado como resuelto.",
    })
  }

  const handleContactUser = (deliveryId: string) => {
    // Simular contacto con usuario
    toast({
      title: "Contactando usuario",
      description: "Se ha enviado un mensaje al usuario sobre la entrega.",
    })
  }

  const handleRetryNotification = (notificationId: string) => {
    // Simular reintento de notificación
    toast({
      title: "Reintentando envío",
      description: "La notificación está siendo reenviada.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-800">Operacional</Badge>
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-800">Degradado</Badge>
      case "down":
        return <Badge className="bg-red-100 text-red-800">Caído</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "down":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Soporte Técnico</h1>
        <p className="text-gray-600">Monitoreo y gestión técnica del sistema</p>
      </div>

      {/* Estado del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Estado del Sistema</span>
          </CardTitle>
          <CardDescription>Estado actual de todos los servicios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { key: "auctions", label: "Subastas", icon: Server },
              { key: "payments", label: "Pagos", icon: Database },
              { key: "notifications", label: "Notificaciones", icon: Bell },
              { key: "database", label: "Base de Datos", icon: Database },
              { key: "api", label: "API", icon: Wifi },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{label}</span>
                </div>
                {getStatusBadge(systemStatus[key as keyof typeof systemStatus])}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="errors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="errors">Subastas con Errores</TabsTrigger>
          <TabsTrigger value="deliveries">Entregas Pendientes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones Fallidas</TabsTrigger>
        </TabsList>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Subastas con Errores</span>
              </CardTitle>
              <CardDescription>Subastas que requieren intervención manual</CardDescription>
            </CardHeader>
            <CardContent>
              {erroredAuctions.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p className="text-gray-600">No hay subastas con errores</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {erroredAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{auction.title}</h4>
                        <p className="text-sm text-red-600">{auction.error}</p>
                        <p className="text-xs text-gray-500">{auction.timestamp}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {auction.status === "resolved" ? (
                          <Badge className="bg-green-100 text-green-800">Resuelto</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Pendiente</Badge>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleResolveError(auction.id)}>
                          Resolver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-orange-600" />
                <span>Entregas No Confirmadas</span>
              </CardTitle>
              <CardDescription>Entregas que no han sido confirmadas por el ganador</CardDescription>
            </CardHeader>
            <CardContent>
              {unconfirmedDeliveries.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p className="text-gray-600">Todas las entregas están confirmadas</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {unconfirmedDeliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{delivery.auction}</h4>
                        <p className="text-sm text-gray-600">Ganador: {delivery.winner}</p>
                        <p className="text-xs text-gray-500">
                          Enviado: {new Date(delivery.shippedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-orange-100 text-orange-800">{delivery.daysOverdue} días vencido</Badge>
                        <Button size="sm" variant="outline" onClick={() => handleContactUser(delivery.id)}>
                          Contactar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-yellow-600" />
                <span>Notificaciones No Enviadas</span>
              </CardTitle>
              <CardDescription>Notificaciones que fallaron al enviarse</CardDescription>
            </CardHeader>
            <CardContent>
              {failedNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p className="text-gray-600">Todas las notificaciones se enviaron correctamente</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {failedNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{notification.type}</h4>
                        <p className="text-sm text-gray-600">
                          Para: {notification.recipient} | Subasta: {notification.auction}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.attempts} intentos | Último: {notification.lastAttempt}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleRetryNotification(notification.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reintentar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alertas del Sistema */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Alertas del Sistema</h2>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            El servicio de notificaciones está experimentando retrasos. Los emails pueden tardar hasta 10 minutos en
            enviarse.
          </AlertDescription>
        </Alert>

        <Alert>
          <Server className="h-4 w-4" />
          <AlertDescription>
            Mantenimiento programado para el domingo 21 de enero de 2:00 AM a 4:00 AM. El sistema estará temporalmente
            no disponible.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
