"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BidModal } from "../components/bid-modal"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Clock, Eye, Heart, Share2, User, Package, Shield, TrendingUp, MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AuctionDetail {
  id: string
  title: string
  description: string
  currentBid: number
  minIncrement: number
  startingBid: number
  endTime: Date
  startTime: Date
  images: string[]
  category: string
  condition: string
  seller: {
    name: string
    rating: number
    totalSales: number
    avatar: string
  }
  bids: {
    id: string
    amount: number
    bidder: string
    timestamp: string
    isWinning: boolean
  }[]
  specifications: { [key: string]: string }
  shippingInfo: {
    cost: number
    methods: string[]
    estimatedDays: string
  }
  views: number
  watchers: number
  questions: {
    id: string
    question: string
    answer?: string
    askedBy: string
    timestamp: string
  }[]
}

interface AuctionDetailViewProps {
  auctionId: string
  onBack: () => void
}

export function AuctionDetailView({ auctionId, onBack }: AuctionDetailViewProps) {
  const [auction, setAuction] = useState<AuctionDetail | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBidModal, setShowBidModal] = useState(false)
  const [isWatching, setIsWatching] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("")
  const { toast } = useToast()

  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [showSellerModal, setShowSellerModal] = useState(false)

  useEffect(() => {
    // Simular carga de datos de subasta
    const mockAuction: AuctionDetail = {
      id: auctionId,
      title: "Reloj Vintage Omega Seamaster Professional",
      description: `Reloj Omega Seamaster Professional en excelente estado de conservación. 
      
      Este icónico reloj de buceo fue fabricado en 1995 y ha sido mantenido regularmente. Incluye:
      - Caja original de Omega
      - Documentos de autenticidad
      - Manual de usuario
      - Correa de acero inoxidable original
      
      El reloj funciona perfectamente y mantiene una precisión excelente. Ideal para coleccionistas o uso diario.`,
      currentBid: 1250,
      minIncrement: 25,
      startingBid: 500,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      category: "Relojes",
      condition: "Excelente",
      seller: {
        name: "RelojeroExperto",
        rating: 4.8,
        totalSales: 156,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      bids: [
        { id: "1", amount: 1250, bidder: "Usuario***23", timestamp: "2024-01-15T14:30:00", isWinning: true },
        { id: "2", amount: 1225, bidder: "Colec***89", timestamp: "2024-01-15T14:25:00", isWinning: false },
        { id: "3", amount: 1200, bidder: "Reloj***45", timestamp: "2024-01-15T14:20:00", isWinning: false },
        { id: "4", amount: 1175, bidder: "Omega***12", timestamp: "2024-01-15T14:15:00", isWinning: false },
        { id: "5", amount: 1150, bidder: "Vinta***67", timestamp: "2024-01-15T14:10:00", isWinning: false },
      ],
      specifications: {
        Marca: "Omega",
        Modelo: "Seamaster Professional",
        Año: "1995",
        "Material de la caja": "Acero inoxidable",
        Diámetro: "41mm",
        Movimiento: "Automático",
        "Resistencia al agua": "300m",
        Cristal: "Zafiro",
      },
      shippingInfo: {
        cost: 25,
        methods: ["Envío estándar", "Envío express", "Recogida en tienda"],
        estimatedDays: "3-5 días laborables",
      },
      views: 234,
      watchers: 18,
      questions: [
        {
          id: "1",
          question: "¿El reloj incluye la garantía original?",
          answer:
            "No incluye garantía original ya que es de 1995, pero ofrezco garantía de funcionamiento por 6 meses.",
          askedBy: "Comprador***34",
          timestamp: "2024-01-14T16:30:00",
        },
        {
          id: "2",
          question: "¿Se puede ver el reloj antes de la compra?",
          answer: "Sí, puedes verlo en mi tienda en el centro de la ciudad con cita previa.",
          askedBy: "Local***78",
          timestamp: "2024-01-14T12:15:00",
        },
      ],
    }

    setAuction(mockAuction)
  }, [auctionId])

  useEffect(() => {
    if (!auction) return

    const updateTimer = () => {
      const now = new Date()
      const diff = auction.endTime.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining("Finalizada")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`)
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [auction])

  const handleBidPlaced = (amount: number) => {
    if (!auction) return

    const newBid = {
      id: Date.now().toString(),
      amount,
      bidder: "Tú",
      timestamp: new Date().toISOString(),
      isWinning: true,
    }

    setAuction({
      ...auction,
      currentBid: amount,
      bids: [newBid, ...auction.bids.map((bid) => ({ ...bid, isWinning: false }))],
    })

    setShowBidModal(false)
  }

  const handleWatch = () => {
    setIsWatching(!isWatching)
    toast({
      title: isWatching ? "Eliminado de seguimiento" : "Agregado a seguimiento",
      description: isWatching
        ? "Ya no recibirás notificaciones de esta subasta"
        : "Recibirás notificaciones sobre esta subasta",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Enlace copiado",
      description: "El enlace de la subasta ha sido copiado al portapapeles",
    })
  }

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe tu pregunta.",
        variant: "destructive",
      })
      return
    }

    // Simular envío de pregunta
    const question = {
      id: Date.now().toString(),
      question: newQuestion,
      askedBy: "Usuario Actual",
      timestamp: new Date().toISOString(),
    }

    setAuction((prev) =>
      prev
        ? {
            ...prev,
            questions: [question, ...prev.questions],
          }
        : null,
    )

    setNewQuestion("")
    setShowQuestionModal(false)

    toast({
      title: "Pregunta enviada",
      description: "Tu pregunta ha sido enviada al vendedor.",
    })
  }

  const handleViewSeller = () => {
    setShowSellerModal(true)
  }

  if (!auction) {
    return <div className="flex items-center justify-center h-64">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Eye className="h-4 w-4" />
          <span>{auction.views} vistas</span>
          <Heart className="h-4 w-4" />
          <span>{auction.watchers} siguiendo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Imágenes y detalles */}
        <div className="lg:col-span-2 space-y-6">
          {/* Galería de imágenes */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={auction.images[selectedImage] || "/placeholder.svg"}
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {auction.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                        selectedImage === index ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descripción y especificaciones */}
          <Tabs defaultValue="description" className="space-y-4">
            <TabsList>
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="shipping">Envío</TabsTrigger>
              <TabsTrigger value="questions">Preguntas</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción del producto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {auction.description.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                    <Badge>{auction.category}</Badge>
                    <Badge variant="outline">Estado: {auction.condition}</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications">
              <Card>
                <CardHeader>
                  <CardTitle>Especificaciones técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(auction.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping">
              <Card>
                <CardHeader>
                  <CardTitle>Información de envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Costo de envío</h4>
                    <p className="text-2xl font-bold text-green-600">${auction.shippingInfo.cost}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Métodos disponibles</h4>
                    <ul className="space-y-1">
                      {auction.shippingInfo.methods.map((method, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Package className="h-4 w-4" />
                          <span>{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tiempo estimado</h4>
                    <p>{auction.shippingInfo.estimatedDays}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions">
              <Card>
                <CardHeader>
                  <CardTitle>Preguntas y respuestas</CardTitle>
                  <CardDescription>Preguntas realizadas por otros usuarios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {auction.questions.map((qa) => (
                    <div key={qa.id} className="border-b pb-4">
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 mt-1 text-blue-600" />
                          <div>
                            <p className="font-medium">{qa.question}</p>
                            <p className="text-sm text-gray-600">
                              Por {qa.askedBy} • {new Date(qa.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {qa.answer && (
                          <div className="ml-6 bg-gray-50 p-3 rounded">
                            <p>{qa.answer}</p>
                            <p className="text-sm text-gray-600 mt-1">Respuesta del vendedor</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => setShowQuestionModal(true)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Hacer una pregunta
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Columna derecha - Información de puja */}
        <div className="space-y-6">
          {/* Información de puja actual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Puja actual</span>
                <div className="flex items-center space-x-2 text-orange-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{timeRemaining}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-green-600">${auction.currentBid.toLocaleString()}</div>
                <p className="text-sm text-gray-600">{auction.bids.length} pujas realizadas</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Puja inicial:</span> ${auction.startingBid.toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Incremento mínimo:</span> ${auction.minIncrement}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowBidModal(true)}
                  disabled={timeRemaining === "Finalizada"}
                >
                  {timeRemaining === "Finalizada" ? "Subasta finalizada" : "Realizar puja"}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleWatch}>
                    <Heart className={`mr-2 h-4 w-4 ${isWatching ? "fill-current text-red-500" : ""}`} />
                    {isWatching ? "Siguiendo" : "Seguir"}
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información del vendedor */}
          <Card>
            <CardHeader>
              <CardTitle>Vendedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={auction.seller.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{auction.seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{auction.seller.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>⭐ {auction.seller.rating}</span>
                    <span>•</span>
                    <span>{auction.seller.totalSales} ventas</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Shield className="h-4 w-4" />
                <span>Vendedor verificado</span>
              </div>

              <Button variant="outline" className="w-full" onClick={() => setShowSellerModal(true)}>
                <User className="mr-2 h-4 w-4" />
                Ver perfil del vendedor
              </Button>
            </CardContent>
          </Card>

          {/* Historial de pujas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Historial de pujas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {auction.bids.map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">${bid.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{bid.bidder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{new Date(bid.timestamp).toLocaleTimeString()}</p>
                      {bid.isWinning && <Badge className="bg-green-100 text-green-800">Ganando</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de puja */}
      {showBidModal && (
        <BidModal
          auction={{
            id: auction.id,
            title: auction.title,
            currentBid: auction.currentBid,
            minIncrement: auction.minIncrement,
          }}
          onClose={() => setShowBidModal(false)}
          onBidPlaced={handleBidPlaced}
        />
      )}

      {/* Modal de hacer pregunta */}
      <Dialog open={showQuestionModal} onOpenChange={setShowQuestionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hacer una Pregunta</DialogTitle>
            <DialogDescription>Pregunta al vendedor sobre este producto</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Tu pregunta</Label>
              <Textarea
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowQuestionModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleSubmitQuestion} className="flex-1">
                Enviar Pregunta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de perfil del vendedor */}
      <Dialog open={showSellerModal} onOpenChange={setShowSellerModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perfil del Vendedor</DialogTitle>
            <DialogDescription>{auction?.seller.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={auction?.seller.avatar || "/placeholder.svg"} />
                <AvatarFallback>{auction?.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{auction?.seller.name}</h3>
                <div className="flex items-center space-x-2">
                  <span>⭐ {auction?.seller.rating}</span>
                  <span>•</span>
                  <span>{auction?.seller.totalSales} ventas</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Información del vendedor</h4>
              <p className="text-sm text-gray-600">
                Vendedor verificado con {auction?.seller.totalSales} transacciones exitosas. Calificación promedio de{" "}
                {auction?.seller.rating} estrellas.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />
                Enviar Mensaje
              </Button>
              <Button variant="outline" className="flex-1">
                Ver Otras Subastas
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
