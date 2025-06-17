"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowUp } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Auction } from "@/types/auction"
import { formatCurrency, formatTimeRemaining, getAuctionTypeLabel } from "@/lib/utils"

interface AuctionCardProps {
  auction: Auction
}

export function AuctionCard({ auction }: AuctionCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(auction.endDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(auction.endDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [auction.endDate])

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/auctions/${auction.id}`} className="block">
        <div className="relative h-48 w-full">
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
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{auction.title}</h3>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{auction.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-amber-600 font-medium">
            <span>{formatCurrency(auction.currentPrice)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">{auction.bids.length} pujas</div>
        <Link href={`/auctions/${auction.id}/realtime-bidder`}>
          <Button size="sm">
            <ArrowUp className="h-4 w-4 mr-1" />
            Pujar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
