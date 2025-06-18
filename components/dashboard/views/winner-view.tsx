"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trophy, CreditCard, Truck, CheckCircle, AlertCircle, Package } from "lucide-react"

interface WonAuction {
  id: string
  title: string
  finalPrice: number
  endDate: string
  image: string
  paymentStatus: "paid" | "pending" | "failed"
  deliveryStatus: "delivered" | "shipped" | "pending" | "preparing"
  trackingNumber?: string
  estimatedDelivery?: string
}

export function WinnerView() {
  const [selectedAuction, setSelectedAuction] = useState<string | null>(null)

  const wonAuctions: WonAuction[] = [
    {
      id: "1",
      title: "Reloj Vintage Omega Seamaster",
      finalPrice: 1250,
      endDate: "2024-01-14T18:00:00",
      image: "/placeholder.svg?height=200&width=300",
      paymentStatus: "pending",
      deliveryStatus: "pending",
      estimatedDelivery: "2024-01-25",
    },
    {
      id: "2",
      title: "Guitarra Eléctrica Fender",
      finalPrice: 3200,
      endDate: "2024-01-12T16:15:00",
      image: "/placeholder.svg?height=200&width=300",
      paymentStatus: "paid",
      deliveryStatus: "shipped",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-20",
    },
  ]

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "preparing":
        return <Package className="h-5 w-5 text-orange-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Trophy className="h-8 w-8 text-yellow-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">¡Felicitaciones!</h1>
          <p className="text-gray-600">Has ganado {wonAuctions.length} subasta(s)</p>
        </div>
      </div>

      {wonAuctions.map((auction) => (
        <Card key={auction.id} className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="flex items-center space-x-3">
              <Trophy className="h-6 w-6 text-yellow-600" />
              <div>
                <CardTitle className="text-xl">¡Ganaste esta subasta!</CardTitle>
                <CardDescription>Finalizada el {new Date(auction.endDate).toLocaleDateString()}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información del producto */}
              <div className="space-y-4">
                <img
                  src={auction.image || "/placeholder.svg"}
                  alt={auction.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{auction.title}</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">${auction.finalPrice.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Precio final ganador</p>
                </div>
              </div>

              {/* Estado y acciones */}
              <div className="space-y-6">
                {/* Estado del pago */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {getPaymentStatusIcon(auction.paymentStatus)}
                    <h4 className="font-semibold">Estado del Pago</h4>
                  </div>

                  {auction.paymentStatus === "pending" && (
                    <Alert>
                      <CreditCard className="h-4 w-4" />
                      <AlertDescription>Pago pendiente. Completa tu pago para proceder con el envío.</AlertDescription>
                    </Alert>
                  )}

                  {auction.paymentStatus === "paid" && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">Pago completado exitosamente.</AlertDescription>
                    </Alert>
                  )}

                  {auction.paymentStatus === "pending" && (
                    <Button className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Completar Pago
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Estado del envío */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {getDeliveryStatusIcon(auction.deliveryStatus)}
                    <h4 className="font-semibold">Estado del Envío</h4>
                  </div>

                  {auction.deliveryStatus === "pending" && (
                    <Alert>
                      <Package className="h-4 w-4" />
                      <AlertDescription>Envío pendiente. Se procesará después del pago.</AlertDescription>
                    </Alert>
                  )}

                  {auction.deliveryStatus === "preparing" && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <Package className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">Preparando tu pedido para envío.</AlertDescription>
                    </Alert>
                  )}

                  {auction.deliveryStatus === "shipped" && (
                    <div className="space-y-2">
                      <Alert className="border-blue-200 bg-blue-50">
                        <Truck className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">Tu pedido ha sido enviado.</AlertDescription>
                      </Alert>

                      {auction.trackingNumber && (
                        <div className="text-sm space-y-1">
                          <p>
                            <strong>Número de seguimiento:</strong> {auction.trackingNumber}
                          </p>
                          <p>
                            <strong>Entrega estimada:</strong>{" "}
                            {new Date(auction.estimatedDelivery!).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Rastrear Pedido
                        </Button>
                        <Button variant="outline" size="sm">
                          Confirmar Recepción
                        </Button>
                      </div>
                    </div>
                  )}

                  {auction.deliveryStatus === "delivered" && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">Pedido entregado exitosamente.</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Separator />

                {/* Acciones adicionales */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Ver Factura
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contactar Soporte
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    Reportar Problema
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
