"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BidModal } from "../components/bid-modal"
import { AuctionDetailView } from "./auction-detail-view"
import { Clock, Search, Eye, Heart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Auction {
  id: string
  title: string
  description: string
  currentBid: number
  minIncrement: number
  endTime: Date
  image: string
  category: string
  bidsCount: number
  isWatched: boolean
  condition: string
  seller: string
}

export function AuctionsView() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("ending_soon")
  const [showDetailView, setShowDetailView] = useState<string | null>(null)

  useEffect(() => {
    // Simular carga de subastas
    const mockAuctions: Auction[] = [
      {
        id: "1",
        title: "Reloj Vintage Omega Seamaster",
        description: "Reloj clásico en excelente estado de conservación",
        currentBid: 1250,
        minIncrement: 25,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas
        image: "/placeholder.svg?height=200&width=300",
        category: "Relojes",
        bidsCount: 23,
        isWatched: false,
        condition: "Excelente",
        seller: "RelojeroExperto",
      },
      {
        id: "2",
        title: "Pintura Original Contemporánea",
        description: "Obra de arte contemporánea de artista reconocido",
        currentBid: 2100,
        minIncrement: 50,
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 horas
        image: "/placeholder.svg?height=200&width=300",
        category: "Arte",
        bidsCount: 18,
        isWatched: true,
        condition: "Nuevo",
        seller: "GaleríaArte",
      },
      {
        id: "3",
        title: "Guitarra Eléctrica Fender Stratocaster",
        description: "Stratocaster americana del 2010 en perfecto estado",
        currentBid: 3200,
        minIncrement: 100,
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
        image: "/placeholder.svg?height=200&width=300",
        category: "Instrumentos",
        bidsCount: 31,
        isWatched: false,
        condition: "Muy bueno",
        seller: "MúsicaPro",
      },
      {
        id: "4",
        title: "Cámara Vintage Leica M3",
        description: "Cámara clásica de colección en funcionamiento",
        currentBid: 1800,
        minIncrement: 75,
        endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 horas
        image: "/placeholder.svg?height=200&width=300",
        category: "Fotografía",
        bidsCount: 15,
        isWatched: false,
        condition: "Bueno",
        seller: "FotoVintage",
      },
    ]
    setAuctions(mockAuctions)
  }, [])

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Finalizada"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const handleWatch = (auctionId: string) => {
    setAuctions((prev) =>
      prev.map((auction) => (auction.id === auctionId ? { ...auction, isWatched: !auction.isWatched } : auction)),
    )
  }

  const handleViewDetails = (auctionId: string) => {
    setShowDetailView(auctionId)
  }

  const sortAuctions = (auctions: Auction[]) => {
    switch (sortBy) {
      case "ending_soon":
        return [...auctions].sort((a, b) => a.endTime.getTime() - b.endTime.getTime())
      case "highest_bid":
        return [...auctions].sort((a, b) => b.currentBid - a.currentBid)
      case "most_bids":
        return [...auctions].sort((a, b) => b.bidsCount - a.bidsCount)
      case "newest":
        return [...auctions].sort((a, b) => b.id.localeCompare(a.id))
      default:
        return auctions
    }
  }

  const filteredAuctions = sortAuctions(
    auctions.filter(
      (auction) =>
        (auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          auction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          auction.seller.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === "all" || auction.category.toLowerCase() === categoryFilter),
    ),
  )

  if (showDetailView) {
    return <AuctionDetailView auctionId={showDetailView} onBack={() => setShowDetailView(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subastas Activas</h1>
          <p className="text-gray-600">
            Explora y participa en las subastas disponibles ({filteredAuctions.length} subastas)
          </p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por título, categoría o vendedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="relojes">Relojes</SelectItem>
                <SelectItem value="arte">Arte</SelectItem>
                <SelectItem value="instrumentos">Instrumentos</SelectItem>
                <SelectItem value="fotografía">Fotografía</SelectItem>
                <SelectItem value="joyas">Joyas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending_soon">Finalizan pronto</SelectItem>
                <SelectItem value="highest_bid">Mayor puja</SelectItem>
                <SelectItem value="most_bids">Más pujas</SelectItem>
                <SelectItem value="newest">Más recientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de subastas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuctions.map((auction) => (
          <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge>{auction.category}</Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-white">
                  {auction.condition}
                </Badge>
              </div>
              {auction.isWatched && (
                <div className="absolute bottom-2 right-2">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                </div>
              )}
            </div>

            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{auction.title}</CardTitle>
              <CardDescription className="line-clamp-2">{auction.description}</CardDescription>
              <div className="text-sm text-gray-600">
                Vendedor: <span className="font-medium">{auction.seller}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">${auction.currentBid.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{auction.bidsCount} pujas</p>
                </div>

                <div className="text-right">
                  <div className="flex items-center text-orange-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-medium">{formatTimeRemaining(auction.endTime)}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  className="flex-1"
                  onClick={() => setSelectedAuction(auction)}
                  disabled={formatTimeRemaining(auction.endTime) === "Finalizada"}
                >
                  Pujar
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleViewDetails(auction.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleWatch(auction.id)}>
                  <Heart className={`h-4 w-4 ${auction.isWatched ? "text-red-500 fill-current" : ""}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAuctions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron subastas</h3>
            <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
          </CardContent>
        </Card>
      )}

      {/* Modal de puja */}
      {selectedAuction && (
        <BidModal
          auction={selectedAuction}
          onClose={() => setSelectedAuction(null)}
          onBidPlaced={(amount) => {
            // Actualizar la puja en el estado
            setAuctions((prev) =>
              prev.map((a) =>
                a.id === selectedAuction.id ? { ...a, currentBid: amount, bidsCount: a.bidsCount + 1 } : a,
              ),
            )
            setSelectedAuction(null)
          }}
        />
      )}
    </div>
  )
}
