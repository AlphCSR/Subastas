"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Info, ArrowUp, Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CountdownTimer } from "@/components/countdown-timer"
import { BidHistory } from "@/components/bid-history"
import { BidModal } from "@/components/bid-modal"
import { AutoBidConfigComponent } from "@/components/auto-bid-config"
import { getAuctionById, addBidToAuction } from "@/lib/mock-data"
import { formatCurrency, getAuctionTypeLabel } from "@/lib/utils"
import type { Auction, Bid, AutoBidConfig } from "@/types/auction"

// Mock WebSocket connection
const mockWebSocketConnection = (auctionId: string, onBidReceived: (bid: Bid) => void) => {
  // Simulate receiving bids every 10-30 seconds
  const interval = setInterval(
    () => {
      // 30% chance of receiving a bid
      if (Math.random() > 0.7) {
        const currentAuction = getAuctionById(auctionId)
        if (!currentAuction) return

        const amount = currentAuction.currentPrice + Math.floor(Math.random() * 3 + 1) * currentAuction.minIncrement
        const newBid: Bid = {
          id: `bid-${Date.now()}`,
          userId: `user-${Math.floor(Math.random() * 100)}`,
          userName: `User ${Math.floor(Math.random() * 100)}`,
          userAvatar: `/placeholder.svg?height=40&width=40`,
          amount: amount,
          timestamp: new Date(),
          isAutoBid: Math.random() > 0.7,
        }

        onBidReceived(newBid)
      }
    },
    Math.random() * 20000 + 10000,
  ) // Random interval between 10-30 seconds

  return () => clearInterval(interval)
}

// Mock auto-bidding system
const mockAutoBidSystem = (auctionId: string, autoBidConfig: AutoBidConfig, onAutoBidPlaced: (bid: Bid) => void) => {
  // This function would be called when a new bid is received
  return (newBid: Bid) => {
    if (!autoBidConfig.active) return
    if (newBid.userId === autoBidConfig.userId) return // Don't auto-bid against yourself

    const currentAuction = getAuctionById(auctionId)
    if (!currentAuction) return

    // If the new bid is higher than our current bid and we haven't reached our max
    if (newBid.amount < autoBidConfig.maxAmount) {
      // Calculate our new bid
      const autoBidAmount = Math.min(newBid.amount + autoBidConfig.incrementAmount, autoBidConfig.maxAmount)

      // Create auto bid
      const autoBid: Bid = {
        id: `auto-bid-${Date.now()}`,
        userId: autoBidConfig.userId,
        userName: "You (Auto)",
        userAvatar: "/placeholder.svg?height=40&width=40",
        amount: autoBidAmount,
        timestamp: new Date(Date.now() + 1000), // 1 second after the triggering bid
        isAutoBid: true,
      }

      // Simulate a slight delay for the auto-bid
      setTimeout(() => {
        onAutoBidPlaced(autoBid)
      }, 1500)
    }
  }
}

interface RealtimeBidderPageProps {
  params: {
    id: string
  }
}

export default function RealtimeBidderPage({ params }: RealtimeBidderPageProps) {
  const router = useRouter()
  const [auction, setAuction] = useState<Auction | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [autoBidConfig, setAutoBidConfig] = useState<AutoBidConfig | null>(null)
  const [notifications, setNotifications] = useState<boolean>(true)
  const [lastBidNotification, setLastBidNotification] = useState<string | null>(null)

  useEffect(() => {
    // Fetch auction data
    const fetchedAuction = getAuctionById(params.id)
    if (fetchedAuction) {
      setAuction(fetchedAuction)
    }
    setLoading(false)

    // Set up WebSocket connection
    if (fetchedAuction) {
      const cleanup = mockWebSocketConnection(params.id, handleExternalBid)
      return cleanup
    }
  }, [params.id])

  // Handle external bids (from other users via WebSocket)
  const handleExternalBid = (bid: Bid) => {
    setAuction((prevAuction) => {
      if (!prevAuction) return null

      // Add the new bid to the auction
      const updatedBids = [bid, ...prevAuction.bids]
      const updatedCurrentPrice = Math.max(prevAuction.currentPrice, bid.amount)

      // Show notification
      if (notifications) {
        setLastBidNotification(`${bid.userName} ha pujado ${formatCurrency(bid.amount)}`)
        // Clear notification after 5 seconds
        setTimeout(() => setLastBidNotification(null), 5000)
      }

      // Check if we need to auto-bid
      if (autoBidConfig?.active) {
        const handleAutoBid = mockAutoBidSystem(prevAuction.id, autoBidConfig, handleBidPlaced)
        handleAutoBid(bid)
      }

      return {
        ...prevAuction,
        bids: updatedBids,
        currentPrice: updatedCurrentPrice,
      }
    })
  }

  // Handle bids placed by the current user
  const handleBidPlaced = (bid: Bid) => {
    if (!auction) return

    // Update the auction with the new bid
    const updatedAuction = addBidToAuction(auction.id, bid)
    if (updatedAuction) {
      setAuction(updatedAuction)
    }
  }

  // Handle saving auto bid configuration
  const handleSaveAutoBidConfig = (config: AutoBidConfig) => {
    setAutoBidConfig(config)
  }

  // Handle disabling auto bid
  const handleDisableAutoBid = () => {
    setAutoBidConfig(null)
  }

  // Toggle notifications
  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

  if (loading) {
    return (
      <div className="container px-4 py-8">
        <div className="max-w-3xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Cargando subasta...</h1>
        </div>
      </div>
    )
  }

  if (!auction) {
    return (
      <div className="container px-4 py-8">
        <div className="max-w-3xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Subasta no encontrada</h1>
          <p className="mb-6">La subasta que estás buscando no existe o ha sido eliminada.</p>
          <Link href="/auctions">
            <Button>Ver todas las subastas</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/auctions">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a subastas
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={toggleNotifications}>
          {notifications ? (
            <>
              <Bell className="h-4 w-4 mr-1" />
              Notificaciones activadas
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4 mr-1" />
              Notificaciones desactivadas
            </>
          )}
        </Button>
      </div>

      {lastBidNotification && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 flex items-center justify-between">
          <span>{lastBidNotification}</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setLastBidNotification(null)}>
            &times;
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg border">
              <Image
                src={auction.imageUrl || "/placeholder.svg"}
                alt={auction.title}
                fill
                className="object-cover"
                unoptimized
              />
              <Badge className="absolute top-2 right-2" variant="secondary">
                {getAuctionTypeLabel(auction.type)}
              </Badge>
              <Badge className="absolute top-2 left-2" variant="destructive">
                EN VIVO
              </Badge>
            </div>

            <div>
              <h1 className="text-3xl font-bold">{auction.title}</h1>
              <p className="text-muted-foreground mt-2">Vendedor: {auction.sellerName}</p>
            </div>

            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="rules">Reglas</TabsTrigger>
                <TabsTrigger value="autobid">Puja automática</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <p>{auction.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Precio base</h3>
                    <p>{formatCurrency(auction.basePrice)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Incremento mínimo</h3>
                    <p>{formatCurrency(auction.minIncrement)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Fecha de inicio</h3>
                    <p>{auction.startDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Fecha de finalización</h3>
                    <p>{auction.endDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="rules" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Reglas de la subasta</h3>
                      <p className="text-muted-foreground">{auction.rules}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Reglas generales</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Todas las pujas son vinculantes.</li>
                      <li>El ganador debe completar la compra en un plazo de 48 horas.</li>
                      <li>No se permiten cancelaciones una vez realizada la puja.</li>
                      <li>El vendedor se reserva el derecho de cancelar la subasta.</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="autobid" className="pt-4">
                <AutoBidConfigComponent
                  auction={auction}
                  autoBidConfig={autoBidConfig}
                  onSave={handleSaveAutoBidConfig}
                  onDisable={handleDisableAutoBid}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Precio actual</h2>
                  <div className="text-3xl font-bold text-amber-600">{formatCurrency(auction.currentPrice)}</div>
                  <p className="text-sm text-muted-foreground">{auction.bids.length} pujas realizadas</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Tiempo restante</h2>
                  <CountdownTimer
                    endDate={auction.endDate}
                    onComplete={() => {
                      router.refresh()
                    }}
                  />
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                  <Button onClick={() => setIsBidModalOpen(true)} className="w-full">
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Realizar puja
                  </Button>

                  {autoBidConfig?.active && (
                    <div className="text-sm bg-green-50 text-green-800 p-2 rounded border border-green-200">
                      <p className="font-medium">Puja automática activada</p>
                      <p className="text-xs">Límite máximo: {formatCurrency(autoBidConfig.maxAmount)}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <BidHistory bids={auction.bids} />
            </CardContent>
          </Card>
        </div>
      </div>

      <BidModal
        auction={auction}
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        onBidPlaced={handleBidPlaced}
      />
    </div>
  )
}
