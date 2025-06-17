"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, History, Bug } from "lucide-react"
import StateVisualizer from "./state-visualizer"
import TransitionHistory from "./transition-history"
import SagaVisualizer from "./saga-visualizer"
import { mockAuctions, mockTransitions, mockSagaEvents } from "@/lib/mock-data"
import type { Auction, TransitionEvent } from "@/lib/types"

export default function StateMachinePanel() {
  const [auctions, setAuctions] = useState<Auction[]>(mockAuctions)
  const [transitions, setTransitions] = useState<TransitionEvent[]>(mockTransitions)

  // Función para simular una transición de estado
  const handleStateTransition = (auctionId: string, newState: string) => {
    // Actualizar el estado de la subasta
    const updatedAuctions = auctions.map((auction) =>
      auction.id === auctionId ? { ...auction, state: newState } : auction,
    )

    // Registrar la transición en el historial
    const newTransition: TransitionEvent = {
      id: `tr-${Date.now()}`,
      auctionId,
      from: auctions.find((a) => a.id === auctionId)?.state || "",
      to: newState,
      timestamp: new Date().toISOString(),
      triggeredBy: "admin@example.com",
    }

    setAuctions(updatedAuctions)
    setTransitions([newTransition, ...transitions])
  }

  return (
    <Tabs defaultValue="current-states" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="current-states" className="flex items-center gap-2">
          <Activity size={16} />
          Estados Actuales
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <History size={16} />
          Historial de Transiciones
        </TabsTrigger>
        <TabsTrigger value="saga" className="flex items-center gap-2">
          <Bug size={16} />
          Visualización SAGA
        </TabsTrigger>
      </TabsList>

      <TabsContent value="current-states">
        <Card>
          <CardHeader>
            <CardTitle>Estados de Subastas</CardTitle>
            <CardDescription>Visualización y gestión de los estados actuales de las subastas</CardDescription>
          </CardHeader>
          <CardContent>
            <StateVisualizer auctions={auctions} onStateChange={handleStateTransition} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Historial de Transiciones</CardTitle>
            <CardDescription>Registro cronológico de cambios de estado en las subastas</CardDescription>
          </CardHeader>
          <CardContent>
            <TransitionHistory transitions={transitions} auctions={auctions} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="saga">
        <Card>
          <CardHeader>
            <CardTitle>Visualización SAGA</CardTitle>
            <CardDescription>Monitoreo de eventos y transacciones distribuidas para debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <SagaVisualizer sagaEvents={mockSagaEvents} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
