"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, AlertTriangle, CheckCircle } from "lucide-react"
import type { ErrorAuction } from "../lib/mock-data"

interface ErrorAuctionsProps {
  auctions: ErrorAuction[]
}

export default function ErrorAuctions({ auctions }: ErrorAuctionsProps) {
  const [selectedAuction, setSelectedAuction] = useState<ErrorAuction | null>(null)
  const [resolvedAuctions, setResolvedAuctions] = useState<string[]>([])

  const handleResolve = (auctionId: string) => {
    setResolvedAuctions([...resolvedAuctions, auctionId])
  }

  const getErrorSeverityColor = (severity: string) => {
    switch (severity) {
      case "alta":
        return "destructive"
      case "media":
        return "warning"
      case "baja":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Subasta</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Error</TableHead>
              <TableHead>Severidad</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auctions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No hay subastas con errores
                </TableCell>
              </TableRow>
            ) : (
              auctions.map((auction) => (
                <TableRow key={auction.id} className={resolvedAuctions.includes(auction.id) ? "bg-green-50" : ""}>
                  <TableCell className="font-medium">{auction.id}</TableCell>
                  <TableCell>{auction.productName}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={auction.errorMessage}>
                    {auction.errorMessage}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getErrorSeverityColor(auction.severity)}>{auction.severity.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{new Date(auction.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    {resolvedAuctions.includes(auction.id) ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Resuelto
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                        Pendiente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedAuction(auction)}>Ver detalles</DropdownMenuItem>
                        {!resolvedAuctions.includes(auction.id) && (
                          <DropdownMenuItem onClick={() => handleResolve(auction.id)}>
                            Marcar como resuelto
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedAuction} onOpenChange={() => setSelectedAuction(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la subasta con error</DialogTitle>
            <DialogDescription>Información detallada sobre el error en la subasta</DialogDescription>
          </DialogHeader>

          {selectedAuction && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">ID Subasta</h4>
                  <p className="text-sm">{selectedAuction.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Producto</h4>
                  <p className="text-sm">{selectedAuction.productName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Vendedor</h4>
                  <p className="text-sm">{selectedAuction.seller}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha del error</h4>
                  <p className="text-sm">{new Date(selectedAuction.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Mensaje de error</h4>
                <div className="bg-slate-50 p-3 rounded-md text-sm font-mono">{selectedAuction.errorMessage}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Detalles técnicos</h4>
                <div className="bg-slate-50 p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
                  {selectedAuction.errorDetails}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                {!resolvedAuctions.includes(selectedAuction.id) && (
                  <Button
                    onClick={() => {
                      handleResolve(selectedAuction.id)
                      setSelectedAuction(null)
                    }}
                  >
                    Marcar como resuelto
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
