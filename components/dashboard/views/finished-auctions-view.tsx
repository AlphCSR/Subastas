"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Search, Download, Eye, Trophy, Calendar, Star, MessageSquare, FileText, CreditCard, Truck } from "lucide-react"

interface FinishedAuction {
  id: string
  title: string
  finalPrice: number
  winner: {
    name: string
    email: string
    avatar?: string
    rating: number
  }
  endDate: string
  category: string
  totalBids: number
  image: string
  paymentStatus: "paid" | "pending" | "failed"
  deliveryStatus: "delivered" | "shipped" | "pending"
  seller: string
  startingBid: number
  description: string
  condition: string
}

export function FinishedAuctionsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [participationFilter, setParticipationFilter] = useState("all")
  const [selectedAuction, setSelectedAuction] = useState<FinishedAuction | null>(null)
  const [showWinnerDetails, setShowWinnerDetails] = useState(false)
  const { toast } = useToast()

  const finishedAuctions: FinishedAuction[] = [
    {
      id: "1",
      title: "Reloj Vintage Omega Seamaster Professional",
      finalPrice: 1250,
      winner: {
        name: "Juan Pérez",
        email: "juan@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      endDate: "2024-01-14T18:00:00",
      category: "Relojes",
      totalBids: 23,
      image: "/placeholder.svg?height=150&width=200",
      paymentStatus: "paid",
      deliveryStatus: "shipped",
      seller: "RelojeroExperto",
      startingBid: 500,
      description: "Reloj clásico en excelente estado",
      condition: "Excelente",
    },
    {
      id: "2",
      title: "Pintura Original Contemporánea",
      finalPrice: 2100,
      winner: {
        name: "María García",
        email: "maria@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      endDate: "2024-01-13T20:30:00",
      category: "Arte",
      totalBids: 18,
      image: "/placeholder.svg?height=150&width=200",
      paymentStatus: "pending",
      deliveryStatus: "pending",
      seller: "GaleríaArte",
      startingBid: 800,
      description: "Obra de arte contemporánea",
      condition: "Nuevo",
    },
    {
      id: "3",
      title: "Guitarra Eléctrica Fender Stratocaster",
      finalPrice: 3200,
      winner: {
        name: "Carlos López",
        email: "carlos@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      endDate: "2024-01-12T16:15:00",
      category: "Instrumentos",
      totalBids: 31,
      image: "/placeholder.svg?height=150&width=200",
      paymentStatus: "paid",
      deliveryStatus: "delivered",
      seller: "MúsicaPro",
      startingBid: 1500,
      description: "Stratocaster americana del 2010",
      condition: "Muy bueno",
    },
  ]

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Pagado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getDeliveryStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Entregado</Badge>
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800">Enviado</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const handleViewDetails = (auction: FinishedAuction) => {
    setSelectedAuction(auction)
  }

  const handleContactWinner = (auction: FinishedAuction) => {
    toast({
      title: "Contactando ganador",
      description: `Se ha enviado un mensaje a ${auction.winner.name}`,
    })
  }

  const handleGenerateInvoice = (auction: FinishedAuction) => {
    toast({
      title: "Generando factura",
      description: "La factura se descargará en breve",
    })
  }

  const handleExportReport = () => {
    toast({
      title: "Exportando reporte",
      description: "El reporte se está generando...",
    })
  }

  const handleManagePrize = (auction: FinishedAuction) => {
    toast({
      title: "Redirigiendo",
      description: `Abriendo gestión de premio para "${auction.title}".`,
    })
    // En una aplicación real, esto redirigiría a la vista de gestión de premios
    // o abriría un modal específico para gestionar el premio
  }

  const filteredAuctions = finishedAuctions.filter((auction) => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || auction.category.toLowerCase() === categoryFilter
    const matchesParticipation = participationFilter === "all" || participationFilter === "participated"
    return matchesSearch && matchesCategory && matchesParticipation
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subastas Finalizadas</h1>
          <p className="text-gray-600">
            Historial completo de subastas completadas ({filteredAuctions.length} subastas)
          </p>
        </div>

        <Button onClick={handleExportReport}>
          <Download className="mr-2 h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar subastas finalizadas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="relojes">Relojes</SelectItem>
                <SelectItem value="arte">Arte</SelectItem>
                <SelectItem value="instrumentos">Instrumentos</SelectItem>
                <SelectItem value="fotografía">Fotografía</SelectItem>
              </SelectContent>
            </Select>

            <Select value={participationFilter} onValueChange={setParticipationFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Mi participación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las subastas</SelectItem>
                <SelectItem value="participated">Solo donde participé</SelectItem>
                <SelectItem value="won">Solo las que gané</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de subastas */}
      <div className="grid grid-cols-1 gap-6">
        {filteredAuctions.map((auction) => (
          <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={auction.image || "/placeholder.svg"}
                  alt={auction.title}
                  className="w-32 h-24 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{auction.title}</h3>
                      <p className="text-sm text-gray-600">
                        {auction.category} • {auction.condition}
                      </p>
                      <p className="text-sm text-gray-600">Vendedor: {auction.seller}</p>
                    </div>
                    <Badge variant="outline">{auction.totalBids} pujas</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Precio Final</p>
                      <p className="text-2xl font-bold text-green-600">${auction.finalPrice.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Inicial: ${auction.startingBid.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Ganador</p>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={auction.winner.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{auction.winner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-sm">{auction.winner.name}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">{auction.winner.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Estado</p>
                      <div className="space-y-1">
                        {getPaymentStatusBadge(auction.paymentStatus)}
                        {getDeliveryStatusBadge(auction.deliveryStatus)}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Finalizada</p>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{new Date(auction.endDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-gray-500">{new Date(auction.endDate).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(auction)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleContactWinner(auction)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contactar Ganador
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleGenerateInvoice(auction)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Generar Factura
                      </Button>
                    </div>

                    {auction.winner.name === "Usuario Actual" && (
                      <Button size="sm" onClick={() => handleManagePrize(auction)}>
                        <Trophy className="mr-2 h-4 w-4" />
                        Gestionar Premio
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de detalles */}
      {selectedAuction && (
        <Dialog open={!!selectedAuction} onOpenChange={() => setSelectedAuction(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedAuction.title}</DialogTitle>
              <DialogDescription>Detalles completos de la subasta finalizada</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="summary" className="space-y-4">
              <TabsList>
                <TabsTrigger value="summary">Resumen</TabsTrigger>
                <TabsTrigger value="winner">Ganador</TabsTrigger>
                <TabsTrigger value="bids">Historial de Pujas</TabsTrigger>
                <TabsTrigger value="payment">Pago y Entrega</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedAuction.image || "/placeholder.svg"}
                      alt={selectedAuction.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Información General</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Categoría:</span> {selectedAuction.category}
                        </p>
                        <p>
                          <span className="font-medium">Condición:</span> {selectedAuction.condition}
                        </p>
                        <p>
                          <span className="font-medium">Vendedor:</span> {selectedAuction.seller}
                        </p>
                        <p>
                          <span className="font-medium">Descripción:</span> {selectedAuction.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Resultados de la Subasta</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Precio inicial:</span> $
                          {selectedAuction.startingBid.toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">Precio final:</span>{" "}
                          <span className="text-green-600 font-bold">
                            ${selectedAuction.finalPrice.toLocaleString()}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">Total de pujas:</span> {selectedAuction.totalBids}
                        </p>
                        <p>
                          <span className="font-medium">Finalizada:</span>{" "}
                          {new Date(selectedAuction.endDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="winner" className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedAuction.winner.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedAuction.winner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{selectedAuction.winner.name}</h4>
                    <p className="text-gray-600">{selectedAuction.winner.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{selectedAuction.winner.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">• Ganador de la subasta</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button size="sm" onClick={() => handleContactWinner(selectedAuction)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contactar
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bids" className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {/* Simulación de historial de pujas */}
                  {[
                    {
                      amount: selectedAuction.finalPrice,
                      bidder: selectedAuction.winner.name,
                      time: selectedAuction.endDate,
                      isWinning: true,
                    },
                    {
                      amount: selectedAuction.finalPrice - 25,
                      bidder: "Usuario***45",
                      time: "2024-01-14T17:58:00",
                      isWinning: false,
                    },
                    {
                      amount: selectedAuction.finalPrice - 50,
                      bidder: "Colec***89",
                      time: "2024-01-14T17:55:00",
                      isWinning: false,
                    },
                  ].map((bid, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">${bid.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{bid.bidder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{new Date(bid.time).toLocaleString()}</p>
                        {bid.isWinning && <Badge className="bg-green-100 text-green-800">Ganadora</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <CreditCard className="h-5 w-5" />
                        <h4 className="font-semibold">Estado del Pago</h4>
                      </div>
                      {getPaymentStatusBadge(selectedAuction.paymentStatus)}
                      <p className="text-sm text-gray-600 mt-2">
                        {selectedAuction.paymentStatus === "paid"
                          ? "Pago completado exitosamente"
                          : "Esperando confirmación de pago"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Truck className="h-5 w-5" />
                        <h4 className="font-semibold">Estado de Entrega</h4>
                      </div>
                      {getDeliveryStatusBadge(selectedAuction.deliveryStatus)}
                      <p className="text-sm text-gray-600 mt-2">
                        {selectedAuction.deliveryStatus === "delivered"
                          ? "Producto entregado al ganador"
                          : selectedAuction.deliveryStatus === "shipped"
                            ? "Producto en camino"
                            : "Preparando envío"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
