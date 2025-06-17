"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search } from "lucide-react"
import type { TransitionEvent, Auction } from "@/lib/types"
import { getStateColor } from "@/lib/utils"

interface TransitionHistoryProps {
  transitions: TransitionEvent[]
  auctions: Auction[]
}

export default function TransitionHistory({ transitions, auctions }: TransitionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransitions = transitions.filter(
    (transition) =>
      transition.auctionId.includes(searchTerm) ||
      auctions
        .find((a) => a.id === transition.auctionId)
        ?.title.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  )

  const getAuctionTitle = (auctionId: string) => {
    return auctions.find((a) => a.id === auctionId)?.title || "Subasta desconocida"
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por ID o título de subasta..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha/Hora</TableHead>
              <TableHead>Subasta</TableHead>
              <TableHead>Transición</TableHead>
              <TableHead>Usuario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransitions.length > 0 ? (
              filteredTransitions.map((transition) => (
                <TableRow key={transition.id}>
                  <TableCell className="whitespace-nowrap">{new Date(transition.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{getAuctionTitle(transition.auctionId)}</div>
                      <div className="text-xs text-muted-foreground">{transition.auctionId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={getStateColor(transition.from)}>{transition.from}</Badge>
                      <ArrowRight className="h-4 w-4" />
                      <Badge className={getStateColor(transition.to)}>{transition.to}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{transition.triggeredBy}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No se encontraron transiciones
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
