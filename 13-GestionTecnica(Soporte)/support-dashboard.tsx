"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import ErrorAuctions from "./components/error-auctions"
import UnconfirmedDeliveries from "./components/unconfirmed-deliveries"
import UnsentNotifications from "./components/unsent-notifications"
import { getMockData } from "./lib/mock-data"

export default function SupportDashboard() {
  const [data, setData] = useState(getMockData())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    // Simular una actualización de datos
    setTimeout(() => {
      setData(getMockData())
      setIsRefreshing(false)
    }, 1000)
  }

  const totalIssues = data.errorAuctions.length + data.unconfirmedDeliveries.length + data.unsentNotifications.length

  return (
    <div className="container mx-auto py-6 px-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión Técnica (Soporte)</h1>
          <p className="text-muted-foreground">Monitoreo de problemas técnicos en la plataforma</p>
        </div>

        <div className="flex items-center gap-4">
          {totalIssues > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">
                {totalIssues} problema{totalIssues !== 1 ? "s" : ""} pendiente{totalIssues !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          <Button onClick={refreshData} disabled={isRefreshing} variant="outline">
            {isRefreshing ? "Actualizando..." : "Actualizar datos"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="error-auctions" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 relative">
          <TabsTrigger value="error-auctions" className="relative rounded-md">
            Subastas con errores
            {data.errorAuctions.length > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center absolute -top-1 -right-1 z-10"
              >
                {data.errorAuctions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unconfirmed-deliveries" className="relative rounded-md">
            Entregas no confirmadas
            {data.unconfirmedDeliveries.length > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center absolute -top-1 -right-1 z-10"
              >
                {data.unconfirmedDeliveries.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unsent-notifications" className="relative rounded-md">
            Notificaciones no enviadas
            {data.unsentNotifications.length > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center absolute -top-1 -right-1 z-10"
              >
                {data.unsentNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="error-auctions">
          <Card>
            <CardHeader>
              <CardTitle>Subastas con errores</CardTitle>
              <CardDescription>Subastas que han presentado errores técnicos durante su ejecución</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorAuctions auctions={data.errorAuctions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unconfirmed-deliveries">
          <Card>
            <CardHeader>
              <CardTitle>Entregas no confirmadas</CardTitle>
              <CardDescription>Entregas que no han sido confirmadas por el comprador o vendedor</CardDescription>
            </CardHeader>
            <CardContent>
              <UnconfirmedDeliveries deliveries={data.unconfirmedDeliveries} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unsent-notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones no enviadas</CardTitle>
              <CardDescription>Notificaciones que no pudieron ser enviadas a los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <UnsentNotifications notifications={data.unsentNotifications} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
