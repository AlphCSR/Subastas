"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Auction, Bid } from "@/types/auction"
import { formatCurrency } from "@/lib/utils"
import { addBidToAuction } from "@/lib/mock-data"

interface BidFormProps {
  auction: Auction
  onBidPlaced?: (bid: Bid) => void
}

export function BidForm({ auction, onBidPlaced }: BidFormProps) {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState(auction.currentPrice + auction.minIncrement)
  const [isAutoBid, setIsAutoBid] = useState(false)
  const [maxAutoBid, setMaxAutoBid] = useState(auction.currentPrice + auction.minIncrement * 5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create a new bid
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      userId: "current-user", // In a real app, this would be the actual user ID
      userName: "You", // In a real app, this would be the actual user name
      userAvatar: "/placeholder.svg?height=40&width=40",
      amount: bidAmount,
      timestamp: new Date(),
      isAutoBid: isAutoBid,
    }

    // Simulate API call
    setTimeout(() => {
      const updatedAuction = addBidToAuction(auction.id, newBid)
      if (updatedAuction && onBidPlaced) {
        onBidPlaced(newBid)
      }
      setIsSubmitting(false)
      router.refresh()
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bidAmount">Tu puja</Label>
        <div className="flex gap-2">
          <Input
            id="bidAmount"
            type="number"
            min={auction.currentPrice + auction.minIncrement}
            step={auction.minIncrement}
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            <ArrowUp className="h-4 w-4 mr-2" />
            Pujar
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Puja mínima: {formatCurrency(auction.currentPrice + auction.minIncrement)}
        </p>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="autoBid">Puja automática</Label>
            <p className="text-xs text-muted-foreground">Puja automáticamente hasta un límite máximo</p>
          </div>
          <Switch id="autoBid" checked={isAutoBid} onCheckedChange={setIsAutoBid} />
        </div>

        {isAutoBid && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="maxAutoBid">Cantidad máxima</Label>
            <Input
              id="maxAutoBid"
              type="number"
              min={bidAmount + auction.minIncrement}
              step={auction.minIncrement}
              value={maxAutoBid}
              onChange={(e) => setMaxAutoBid(Number(e.target.value))}
              required
            />
            <p className="text-xs text-muted-foreground">El sistema pujará automáticamente por ti hasta este límite</p>
          </div>
        )}
      </div>
    </form>
  )
}
