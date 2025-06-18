"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Package, Truck, MapPin, CheckCircle, AlertTriangle, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Prize {
  id: string
  auctionTitle: string
  finalPrice: number
  deliveryStatus: "pending" | "confirmed" | "shipped" | "delivered" | "problem"
  deliveryMethod: "pickup" | "shipping"
  shippingAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
  deliveryDate?: string
  notes?: string
  image: string
}

export function PrizeManagementView() {
  const [prizes, setPrizes] = useState<Prize[]>([
    {
      id: "1",
      auctionTitle: "Reloj Vintage Omega Seamaster",
      finalPrice: 1250,
      deliveryStatus: "shipped",
      deliveryMethod: "shipping",
      shippingAddress: {
        street: "Calle Principal 123",
        city: "Ciudad de México",
        state: "CDMX",
        zipCode: "01000",
        country: "México",
      },
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-20",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: "2",
      auctionTitle: "Guitarra Eléctrica Fender",
      finalPrice: 3200,
      deliveryStatus: "pending",
      deliveryMethod: "pickup",
      image: "/placeholder.svg?height=150&width=200",
    },
  ])

  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null)
  const [isConfirmingDelivery, setIsConfirmingDelivery] = useState(false)
  const [isReportingProblem, setIsReportingProblem] = useState(false)
  const [problemDescription, setProblemDescription] = useState("")

  const [showShippingModal, setShowShippingModal] = useState<Prize | null>(null)
  const [shippingData, setShippingData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmado</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">Enviado</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Entregado</Badge>
      case "problem":
        return <Badge className="bg-red-100 text-red-800">Problema</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-5 w-5 text-yellow-600" />
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-600" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "problem":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const handleConfirmDelivery = (prizeId: string) => {
    setPrizes((prev) =>
      prev.map((prize) =>
        prize.id === prizeId
          ? { ...prize, deliveryStatus: "delivered" as const, deliveryDate: new Date().toISOString().split("T")[0] }
          : prize,
      ),
    )

    toast({
      title: "Entrega confirmada",
      description: "Has confirmado la recepción del premio.",
    })

    setIsConfirmingDelivery(false)
    setSelectedPrize(null)
  }

  const handleReportProblem = (prizeId: string) => {
    setPrizes((prev) =>
      prev.map((prize) =>
        prize.id === prizeId ? { ...prize, deliveryStatus: "problem" as const, notes: problemDescription } : prize,
      ),
    )

    toast({
      title: "Problema reportado",
      description: "Tu reporte ha sido enviado al equipo de soporte.",
    })

    setIsReportingProblem(false)
    setSelectedPrize(null)
    setProblemDescription("")
  }

  const handleConfirmShipping = (prize: Prize) => {
    setShowShippingModal(prize)
    if (prize.shippingAddress) {
      setShippingData(prize.shippingAddress)
    }
  }

  const handleSaveShipping = () => {
    if (!showShippingModal) return

    setPrizes((prev) =>
      prev.map((prize) =>
        prize.id === showShippingModal.id
          ? { ...prize, shippingAddress: shippingData, deliveryStatus: "confirmed" as const }
          : prize,
      ),
    )

    setShowShippingModal(null)
    toast({
      title: "Datos confirmados",
      description: "Los datos de envío han sido confirmados.",
    })
  }

  const handleTrackPackage = (prize: Prize) => {
    // Simular apertura de página de seguimiento
    window.open(`https://tracking.example.com/${prize.trackingNumber}`, "_blank")
    toast({
      title: "Abriendo seguimiento",
      description: "Se ha abierto la página de seguimiento del paquete.",
    })
  }

  const handleContactSupport = (prize: Prize) => {
    toast({
      title: "Contactando soporte",
      description: `Se ha enviado un mensaje de soporte para "${prize.auctionTitle}".`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Premios</h1>
        <p className="text-gray-600">Administra la entrega de tus premios ganados</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {prizes.map((prize) => (
          <Card key={prize.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={prize.image || "/placeholder.svg"}
                  alt={prize.auctionTitle}
                  className="w-32 h-24 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{prize.auctionTitle}</h3>
                      <p className="text-2xl font-bold text-green-600">${prize.finalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(prize.deliveryStatus)}
                      {getStatusBadge(prize.deliveryStatus)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Método de Entrega</h4>
                      <div className="flex items-center space-x-2">
                        {prize.deliveryMethod === "shipping" ? (
                          <Truck className="h-4 w-4 text-blue-600" />
                        ) : (
                          <MapPin className="h-4 w-4 text-green-600" />
                        )}
                        <span className="capitalize">
                          {prize.deliveryMethod === "shipping" ? "Envío a domicilio" : "Recoger en tienda"}
                        </span>
                      </div>
                    </div>

                    {prize.deliveryMethod === "shipping" && prize.shippingAddress && (
                      <div>
                        <h4 className="font-medium mb-2">Dirección de Envío</h4>
                        <div className="text-sm text-gray-600">
                          <p>{prize.shippingAddress.street}</p>
                          <p>
                            {prize.shippingAddress.city}, {prize.shippingAddress.state}
                          </p>
                          <p>
                            {prize.shippingAddress.zipCode}, {prize.shippingAddress.country}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {prize.trackingNumber && (
                    <div>
                      <h4 className="font-medium mb-2">Información de Seguimiento</h4>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm">
                          <strong>Número de seguimiento:</strong> {prize.trackingNumber}
                        </p>
                        {prize.estimatedDelivery && (
                          <p className="text-sm">
                            <strong>Entrega estimada:</strong> {new Date(prize.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {prize.deliveryDate && (
                    <div>
                      <h4 className="font-medium mb-2">Fecha de Entrega</h4>
                      <p className="text-sm text-green-600">
                        Entregado el {new Date(prize.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {prize.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Notas</h4>
                      <p className="text-sm text-gray-600">{prize.notes}</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {prize.deliveryStatus === "shipped" && (
                      <>
                        <Button
                          onClick={() => {
                            setSelectedPrize(prize)
                            setIsConfirmingDelivery(true)
                          }}
                          className="flex-1"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Confirmar Recepción
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedPrize(prize)
                            setIsReportingProblem(true)
                          }}
                          className="flex-1 text-red-600 hover:text-red-700"
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Reportar Problema
                        </Button>
                      </>
                    )}

                    {prize.deliveryStatus === "pending" && (
                      <Button variant="outline" className="flex-1" onClick={() => handleConfirmShipping(prize)}>
                        <MapPin className="mr-2 h-4 w-4" />
                        Confirmar Datos de Envío
                      </Button>
                    )}

                    {prize.trackingNumber && (
                      <Button variant="outline" onClick={() => handleTrackPackage(prize)}>
                        <Truck className="mr-2 h-4 w-4" />
                        Rastrear Pedido
                      </Button>
                    )}

                    <Button variant="outline" onClick={() => handleContactSupport(prize)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Contactar Soporte
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para confirmar entrega */}
      <Dialog open={isConfirmingDelivery} onOpenChange={setIsConfirmingDelivery}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Recepción</DialogTitle>
            <DialogDescription>¿Has recibido tu premio en buenas condiciones?</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedPrize && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium">{selectedPrize.auctionTitle}</h4>
                <p className="text-sm text-gray-600">
                  Al confirmar, estarás indicando que has recibido el producto satisfactoriamente.
                </p>
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsConfirmingDelivery(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={() => selectedPrize && handleConfirmDelivery(selectedPrize.id)} className="flex-1">
                Confirmar Recepción
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para reportar problema */}
      <Dialog open={isReportingProblem} onOpenChange={setIsReportingProblem}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reportar Problema</DialogTitle>
            <DialogDescription>Describe el problema que has encontrado con tu entrega</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedPrize && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium">{selectedPrize.auctionTitle}</h4>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="problem">Descripción del problema</Label>
              <Textarea
                id="problem"
                placeholder="Describe detalladamente el problema..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsReportingProblem(false)} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={() => selectedPrize && handleReportProblem(selectedPrize.id)}
                className="flex-1"
                disabled={!problemDescription.trim()}
              >
                Enviar Reporte
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de datos de envío */}
      {showShippingModal && (
        <Dialog open={!!showShippingModal} onOpenChange={() => setShowShippingModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Datos de Envío</DialogTitle>
              <DialogDescription>Verifica y actualiza tu dirección de envío</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Dirección</Label>
                <Input
                  id="street"
                  value={shippingData.street}
                  onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                  placeholder="Calle Principal 123"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado/Provincia</Label>
                  <Input
                    id="state"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Código Postal</Label>
                  <Input
                    id="zipCode"
                    value={shippingData.zipCode}
                    onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    value={shippingData.country}
                    onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowShippingModal(null)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleSaveShipping} className="flex-1">
                  Confirmar Datos
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
