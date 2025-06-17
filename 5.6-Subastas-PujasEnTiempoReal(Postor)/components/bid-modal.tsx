"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatCurrency } from "@/lib/utils"
import type { Auction, Bid } from "@/types/auction"

interface BidModalProps {
  auction: Auction
  isOpen: boolean
  onClose: () => void
  onBidPlaced: (bid: Bid) => void
}

export function BidModal({ auction, isOpen, onClose, onBidPlaced }: BidModalProps) {
  const minBidAmount = auction.currentPrice + auction.minIncrement
  const [bidAmount, setBidAmount] = useState(minBidAmount)
  const [isAutoBid, setIsAutoBid] = useState(false)
  const [maxAutoBid, setMaxAutoBid] = useState(minBidAmount * 1.5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setBidAmount(minBidAmount)
      setIsAutoBid(false)
      setMaxAutoBid(minBidAmount * 1.5)
      setError(null)
      setSuccess(null)
    }
  }, [isOpen, minBidAmount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validate bid amount
    if (bidAmount < minBidAmount) {
      setError(`La puja debe ser al menos ${formatCurrency(minBidAmount)}`)
      return
    }

    // Validate auto bid max amount
    if (isAutoBid && maxAutoBid <= bidAmount) {
      setError("El límite máximo debe ser mayor que la puja inicial")
      return
    }

    setIsSubmitting(true)

    try {
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

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Call the onBidPlaced callback
      onBidPlaced(newBid)

      // Show success message
      setSuccess("¡Puja realizada con éxito!")

      // Close modal after a short delay
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err) {
      setError("Error al realizar la puja. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Realizar puja</DialogTitle>
          <DialogDescription>
            Estás pujando por <strong>{auction.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <Check className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="bidAmount">Monto de la puja</Label>
              <Input
                id="bidAmount"
                type="number"
                min={minBidAmount}
                step={auction.minIncrement}
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                disabled={isSubmitting || !!success}
                className="col-span-3"
              />
              <p className="text-xs text-muted-foreground">Puja mínima: {formatCurrency(minBidAmount)}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoBid">Puja automática</Label>
                <p className="text-xs text-muted-foreground">El sistema pujará por ti hasta el límite establecido</p>
              </div>
              <Switch
                id="autoBid"
                checked={isAutoBid}
                onCheckedChange={setIsAutoBid}
                disabled={isSubmitting || !!success}
              />
            </div>

            {isAutoBid && (
              <div className="grid gap-2">
                <Label htmlFor="maxAutoBid">Límite máximo</Label>
                <Input
                  id="maxAutoBid"
                  type="number"
                  min={bidAmount + auction.minIncrement}
                  step={auction.minIncrement}
                  value={maxAutoBid}
                  onChange={(e) => setMaxAutoBid(Number(e.target.value))}
                  disabled={isSubmitting || !!success}
                />
                <p className="text-xs text-muted-foreground">
                  El sistema pujará automáticamente por ti hasta este límite cuando otros usuarios pujen
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting || !!success}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !!success}>
              {isSubmitting ? "Procesando..." : "Pujar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
