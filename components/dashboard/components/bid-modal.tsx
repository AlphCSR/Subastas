"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Auction {
  id: string
  title: string
  currentBid: number
  minIncrement: number
}

interface BidModalProps {
  auction: Auction
  onClose: () => void
  onBidPlaced: (amount: number) => void
}

export function BidModal({ auction, onClose, onBidPlaced }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState(auction.currentBid + auction.minIncrement)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [autoBidEnabled, setAutoBidEnabled] = useState(false)
  const [maxAutoBid, setMaxAutoBid] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (bidAmount <= auction.currentBid && !autoBidEnabled) {
      toast({
        title: "Error",
        description: "La puja debe ser mayor a la puja actual.",
        variant: "destructive",
      })
      return
    }

    if (bidAmount < auction.currentBid + auction.minIncrement && !autoBidEnabled) {
      toast({
        title: "Error",
        description: `El incremento mínimo es $${auction.minIncrement}.`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simular procesamiento de puja
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onBidPlaced(bidAmount)
    toast({
      title: "¡Puja realizada!",
      description: `Tu puja de $${bidAmount.toLocaleString()} ha sido registrada.`,
    })

    setIsLoading(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Realizar Puja</DialogTitle>
          <DialogDescription>{auction.title}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Puja actual</Label>
            <div className="text-2xl font-bold text-green-600">${auction.currentBid.toLocaleString()}</div>
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Puja Manual</TabsTrigger>
              <TabsTrigger value="auto">Puja Automática</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bidAmount">Tu puja</Label>
                <Input
                  id="bidAmount"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={auction.currentBid + auction.minIncrement}
                  step={auction.minIncrement}
                />
                <p className="text-sm text-gray-600">Incremento mínimo: ${auction.minIncrement}</p>
              </div>
            </TabsContent>

            <TabsContent value="auto" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxAutoBid">Límite máximo de puja automática</Label>
                <Input
                  id="maxAutoBid"
                  type="number"
                  value={maxAutoBid}
                  onChange={(e) => setMaxAutoBid(Number(e.target.value))}
                  min={auction.currentBid + auction.minIncrement}
                  step={auction.minIncrement}
                />
                <p className="text-sm text-gray-600">El sistema pujará automáticamente por ti hasta este límite</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidIncrement">Incremento de puja automática</Label>
                <Select defaultValue={auction.minIncrement.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={auction.minIncrement.toString()}>Mínimo (${auction.minIncrement})</SelectItem>
                    <SelectItem value={(auction.minIncrement * 2).toString()}>
                      Moderado (${auction.minIncrement * 2})
                    </SelectItem>
                    <SelectItem value={(auction.minIncrement * 5).toString()}>
                      Agresivo (${auction.minIncrement * 5})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidTiming">Momento de puja</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Inmediato</SelectItem>
                    <SelectItem value="last_minute">Último minuto</SelectItem>
                    <SelectItem value="last_seconds">Últimos 10 segundos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoBidEnabled"
                  checked={autoBidEnabled}
                  onCheckedChange={(checked) => setAutoBidEnabled(checked as boolean)}
                />
                <Label htmlFor="autoBidEnabled" className="text-sm">
                  Activar puja automática con estas configuraciones
                </Label>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Resumen:</strong> El sistema pujará automáticamente hasta ${maxAutoBid.toLocaleString()}
                  cuando seas superado, usando incrementos según tu configuración.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {autoBidEnabled ? `Configurar Auto-Puja` : `Pujar $${bidAmount.toLocaleString()}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
