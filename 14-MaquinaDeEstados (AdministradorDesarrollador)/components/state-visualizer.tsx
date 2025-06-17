"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Clock } from "lucide-react"
import type { Auction } from "@/lib/types"
import { getStateColor } from "@/lib/utils"

interface StateVisualizerProps {
  auctions: Auction[]
  onStateChange: (auctionId: string, newState: string) => void
}

export default function StateVisualizer({ auctions, onStateChange }: StateVisualizerProps) {
  const [selectedAuction, setSelectedAuction] = useState<string | null>(null)
  const [targetState, setTargetState] = useState<string>("")

  const availableStates = ["pending", "active", "paused", "ended", "cancelled", "completed"]

  const handleTransition = () => {
    if (selectedAuction && targetState) {
      onStateChange(selectedAuction, targetState)
      setTargetState("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auctions.map((auction) => (
          <Card
            key={auction.id}
            className={`cursor-pointer transition-all ${selectedAuction === auction.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedAuction(auction.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{auction.title}</h3>
                  <p className="text-sm text-muted-foreground">ID: {auction.id}</p>
                </div>
                <Badge className={getStateColor(auction.state)}>{auction.state}</Badge>
              </div>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>Actualizado: {new Date(auction.updatedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAuction && (
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">Cambiar Estado</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={targetState} onValueChange={setTargetState}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Seleccionar nuevo estado" />
              </SelectTrigger>
              <SelectContent>
                {availableStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleTransition} disabled={!targetState} className="flex items-center gap-1">
              Transicionar <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
