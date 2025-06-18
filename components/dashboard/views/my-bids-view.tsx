"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BidModal } from "../components/bid-modal"
import { useToast } from "@/hooks/use-toast"
import { Trophy, DollarSign, Eye, TrendingUp, Search, AlertTriangle, Heart, Share2 } from "lucide-react"

interface MyBid {
  id: string
  auctionId: string
  auctionTitle: string
  myBid: number
  currentBid: number
  status: "winning" | "outbid" | "won" | "lost"
  endTime: string
  image: string
  category: string
  seller: string
  myMaxBid?: number
  bidHistory: {
    amount: number
    timestamp: string
    isAutomatic: boolean
  }[]
}

export function MyBidsView() {
  const [myBids, setMyBids] = useState<MyBid[]>([
    {
      id: "1",
      auctionId: "1",
      auctionTitle: "Reloj Vintage Omega",
      myBid: 850,
      currentBid: 875,
      status: "outbid",
      endTime: "2024-01-15T18:00:00",
      image: "/placeholder.svg?height=100&width=150",
      category: "Relojes",
      seller: "RelojeroExperto",
      bidHistory: [
        { amount: 850, timestamp: "2024-01-15T14:30:00", isAutomatic: false },
        { amount: 825, timestamp: "2024-01-15T14:00:00", isAutomatic: true },
        { amount: 800, timestamp: "2024-01-15T13:30:00", isAutomatic: false },
      ],
    },
    {
      id: "2",
      auctionId: "2",
      auctionTitle: "Pintura Original",
      myBid: 1200,
      currentBid: 1200,
      status: "winning",
      endTime: "2024-01-15T20:00:00",
      image: "/placeholder.svg?height=100&width=150",
      category: "Arte",
      seller: "GaleríaArte",
      myMaxBid: 1500,
      bidHistory: [
        { amount: 1200, timestamp: "2024-01-15T15:00:00", isAutomatic: true },
        { amount: 1150, timestamp: "2024-01-15T14:45:00", isAutomatic: false },
      ],
    },
    {
      id: "3",
      auctionId: "3",
      auctionTitle: "Guitarra Vintage",
      myBid: 1800,
      currentBid: 1800,
      status: "won",
      endTime: "2024-01-14T16:00:00",
      image: "/placeholder.svg?height=100&width=150",
      category: "Instrumentos",
      seller: "MúsicaPro",
      bidHistory: [
        { amount: 1800, timestamp: "2024-01-14T15:58:00", isAutomatic: false },
        { amount: 1750, timestamp: "2024-01-14T15:30:00", isAutomatic: true },
      ],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBid, setSelectedBid] = useState<MyBid | null>(null)
  const [showBidModal, setShowBidModal] = useState<MyBid | null>(null)
  const [showDetailModal, setShowDetailModal] = useState<MyBid | null>(null)
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "winning":
        return <Badge className="bg-green-100 text-green-800">Ganando</Badge>
      case "outbid":
        return <Badge className="bg-red-100 text-red-800">Superado</Badge>
      case "won":
        return <Badge className="bg-blue-100 text-blue-800">Ganada</Badge>
      case "lost":
        return <Badge className="bg-gray-100 text-gray-800">Perdida</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getTimeRemaining = (endTime: string) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Finalizada"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const handleNewBid = (bidData: MyBid, amount: number) => {
    setMyBids((prev) =>
      prev.map((bid) =>
        bid.id === bidData.id
          ? {
              ...bid,
              myBid: amount,
              currentBid: amount,
              status: "winning" as const,
              bidHistory: [{ amount, timestamp: new Date().toISOString(), isAutomatic: false }, ...bid.bidHistory],
            }
          : bid,
      ),
    )

    toast({
      title: "¡Puja realizada!",
      description: `Nueva puja de $${amount.toLocaleString()} en ${bidData.auctionTitle}`,
    })
  }

  const handleViewDetails = (bid: MyBid) => {
    setShowDetailModal(bid)
  }

  const handleWatchAuction = (bid: MyBid) => {
    toast({
      title: "Agregado a seguimiento",
      description: `Ahora sigues la subasta "${bid.auctionTitle}"`,
    })
  }

  const handleShareAuction = (bid: MyBid) => {
    navigator.clipboard.writeText(`${window.location.origin}/auction/${bid.auctionId}`)
    toast({
      title: "Enlace copiado",
      description: "El enlace de la subasta ha sido copiado al portapapeles",
    })
  }

  const handleSetAlert = (bid: MyBid) => {
    toast({
      title: "Alerta configurada",
      description: `Recibirás notificaciones cuando seas superado en "${bid.auctionTitle}"`,
    })
  }

  const filteredBids = myBids.filter((bid) => {
    const matchesSearch = bid.auctionTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || bid.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    activeBids: myBids.filter((b) => ["winning", "outbid"].includes(b.status)).length,
    wonAuctions: myBids.filter((b) => b.status === "won").length,
    totalInvested: myBids.filter((b) => ["winning", "outbid"].includes(b.status)).reduce((sum, b) => sum + b.myBid, 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mis Pujas</h1>
        <p className="text-gray-600">Seguimiento de todas tus participaciones en subastas</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pujas Activas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBids}</div>
            <p className="text-xs text-muted-foreground">En subastas activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subastas Ganadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.wonAuctions}</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalInvested.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">En pujas activas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar mis pujas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="winning">Ganando</SelectItem>
                <SelectItem value="outbid">Superado</SelectItem>
                <SelectItem value="won">Ganadas</SelectItem>
                <SelectItem value="lost">Perdidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de pujas */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pujas</CardTitle>
          <CardDescription>Todas tus participaciones en subastas ({filteredBids.length} pujas)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBids.map((bid) => (
              <div key={bid.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <img
                  src={bid.image || "/placeholder.svg"}
                  alt={bid.auctionTitle}
                  className="w-20 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{bid.auctionTitle}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>Mi puja: ${bid.myBid.toLocaleString()}</span>
                    <span>Puja actual: ${bid.currentBid.toLocaleString()}</span>
                    <span>{bid.category}</span>
                    <span>Vendedor: {bid.seller}</span>
                  </div>
                  {bid.myMaxBid && (
                    <div className="text-sm text-blue-600 mt-1">
                      Puja automática hasta: ${bid.myMaxBid.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="text-right space-y-2">
                  {getStatusBadge(bid.status)}
                  <p className="text-sm text-gray-600">
                    {bid.status === "won" || bid.status === "lost" ? "Finalizada" : getTimeRemaining(bid.endTime)}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  {bid.status === "outbid" && (
                    <Button size="sm" onClick={() => setShowBidModal(bid)}>
                      Pujar de nuevo
                    </Button>
                  )}

                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(bid)}>
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleWatchAuction(bid)}>
                      <Heart className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleShareAuction(bid)}>
                      <Share2 className="h-4 w-4" />
                    </Button>

                    {["winning", "outbid"].includes(bid.status) && (
                      <Button variant="outline" size="sm" onClick={() => handleSetAlert(bid)}>
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de nueva puja */}
      {showBidModal && (
        <BidModal
          auction={{
            id: showBidModal.auctionId,
            title: showBidModal.auctionTitle,
            currentBid: showBidModal.currentBid,
            minIncrement: 25,
          }}
          onClose={() => setShowBidModal(null)}
          onBidPlaced={(amount) => {
            handleNewBid(showBidModal, amount)
            setShowBidModal(null)
          }}
        />
      )}

      {/* Modal de detalles */}
      {showDetailModal && (
        <Dialog open={!!showDetailModal} onOpenChange={() => setShowDetailModal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de mi puja</DialogTitle>
              <DialogDescription>{showDetailModal.auctionTitle}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src={showDetailModal.image || "/placeholder.svg"}
                    alt={showDetailModal.auctionTitle}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Estado:</span> {getStatusBadge(showDetailModal.status)}
                  </div>
                  <div>
                    <span className="font-medium">Mi puja más alta:</span> ${showDetailModal.myBid.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Puja actual:</span> ${showDetailModal.currentBid.toLocaleString()}
                  </div>
                  {showDetailModal.myMaxBid && (
                    <div>
                      <span className="font-medium">Límite automático:</span> $
                      {showDetailModal.myMaxBid.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Historial de mis pujas</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {showDetailModal.bidHistory.map((historyBid, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>${historyBid.amount.toLocaleString()}</span>
                      <div className="flex items-center space-x-2">
                        <span>{new Date(historyBid.timestamp).toLocaleString()}</span>
                        {historyBid.isAutomatic && <Badge variant="outline">Auto</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
