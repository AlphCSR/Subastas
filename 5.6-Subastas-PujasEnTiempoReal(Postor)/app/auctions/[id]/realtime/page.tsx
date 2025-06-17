"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CountdownTimer } from "@/components/countdown-timer"
import { BidHistory } from "@/components/bid-history"
import { BidForm } from "@/components/bid-form"
import { getAuctionById } from "@/lib/mock-data"
import { formatCurrency, getAuctionTypeLabel } from "@/lib/utils"
import type { Auction, Bid } from "@/types/auction"

// Mock WebSocket connection
const mockWebSocketConnection = (auctionId: string, onBidReceived: (bid: Bid) => void) => {
  // Simulate receiving bids every 10-30 seconds
  const interval = setInterval(
    () => {
      // 30% chance of receiving a bid
      if (Math.random() > 0.7) {
        const amount = Math.floor(Math.random() * 50) + 10
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

interface RealtimeAuctionPageProps {
  params: {
    id: string
  }
}

export default function RealtimeAuctionPage({ params }: RealtimeAuctionPageProps) {
  const router = useRouter()
  const [auction, setAuction] = useState<Auction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch auction data
    const fetchedAuction = getAuctionById(params.id)
    if (fetchedAuction) {
      setAuction(fetchedAuction)
    }
    setLoading(false)

    // Set up WebSocket connection
    if (fetchedAuction) {
      const cleanup = mockWebSocketConnection(params.id, (bid) => {
        setAuction((prevAuction) => {
          if (!prevAuction) return null

          // Add the new bid to the auction
          const updatedBids = [bid, ...prevAuction.bids]
          const updatedCurrentPrice = Math.max(prevAuction.currentPrice, bid.amount)

          return {
            ...prevAuction,
            bids: updatedBids,
            currentPrice: updatedCurrentPrice,
          }
        })
      })

      return cleanup
    }
  }, [params.id])

  const handleBidPlaced = (bid: Bid) => {
    if (!auction) return

    setAuction({
      ...auction,
      bids: [bid, ...auction.bids],
      currentPrice: bid.amount,
    })
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
      <div className="mb-6">
        <Link href="/auctions">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a subastas
          </Button>
        </Link>
      </div>

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

                <BidForm auction={auction} onBidPlaced={handleBidPlaced} />
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
    </div>
  )
}
