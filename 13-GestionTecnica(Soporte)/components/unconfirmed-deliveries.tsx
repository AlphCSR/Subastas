"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, Clock, CheckCircle, Send } from "lucide-react"
import type { UnconfirmedDelivery } from "../lib/mock-data"

interface UnconfirmedDeliveriesProps {
  deliveries: UnconfirmedDelivery[]
}

export default function UnconfirmedDeliveries({ deliveries }: UnconfirmedDeliveriesProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<UnconfirmedDelivery | null>(null)
  const [resolvedDeliveries, setResolvedDeliveries] = useState<string[]>([])
  const [sentReminders, setSentReminders] = useState<string[]>([])

  const handleResolve = (deliveryId: string) => {
    setResolvedDeliveries([...resolvedDeliveries, deliveryId])
  }

  const handleSendReminder = (deliveryId: string) => {
    setSentReminders([...sentReminders, deliveryId])
  }

  const getDaysOverdue = (date: string) => {
    const deliveryDate = new Date(date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - deliveryDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Entrega</TableHead>
              <TableHead>Subasta</TableHead>
              <TableHead>Comprador</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Fecha límite</TableHead>
              <TableHead>Días vencidos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No hay entregas sin confirmar
                </TableCell>
              </TableRow>
            ) : (
              deliveries.map((delivery) => {
                const daysOverdue = getDaysOverdue(delivery.deadlineDate)
                return (
                  <TableRow key={delivery.id} className={resolvedDeliveries.includes(delivery.id) ? "bg-green-50" : ""}>
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>{delivery.auctionId}</TableCell>
                    <TableCell>{delivery.buyer}</TableCell>
                    <TableCell>{delivery.seller}</TableCell>
                    <TableCell>{new Date(delivery.deadlineDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={daysOverdue > 7 ? "destructive" : daysOverdue > 3 ? "warning" : "secondary"}>
                        {daysOverdue} días
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {resolvedDeliveries.includes(delivery.id) ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Confirmado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <Clock className="h-3.5 w-3.5 mr-1" />
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
                          <DropdownMenuItem onClick={() => setSelectedDelivery(delivery)}>
                            Ver detalles
                          </DropdownMenuItem>
                          {!resolvedDeliveries.includes(delivery.id) && (
                            <>
                              <DropdownMenuItem onClick={() => handleResolve(delivery.id)}>
                                Marcar como confirmado
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleSendReminder(delivery.id)}
                                disabled={sentReminders.includes(delivery.id)}
                              >
                                Enviar recordatorio
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedDelivery} onOpenChange={() => setSelectedDelivery(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la entrega no confirmada</DialogTitle>
            <DialogDescription>Información detallada sobre la entrega pendiente de confirmación</DialogDescription>
          </DialogHeader>

          {selectedDelivery && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">ID Entrega</h4>
                  <p className="text-sm">{selectedDelivery.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">ID Subasta</h4>
                  <p className="text-sm">{selectedDelivery.auctionId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Producto</h4>
                  <p className="text-sm">{selectedDelivery.productName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Precio final</h4>
                  <p className="text-sm">${selectedDelivery.finalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Comprador</h4>
                  <p className="text-sm">{selectedDelivery.buyer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Vendedor</h4>
                  <p className="text-sm">{selectedDelivery.seller}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de subasta</h4>
                  <p className="text-sm">{new Date(selectedDelivery.auctionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha límite de confirmación</h4>
                  <p className="text-sm">{new Date(selectedDelivery.deadlineDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Dirección de entrega</h4>
                <p className="text-sm">{selectedDelivery.deliveryAddress}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Notas</h4>
                <p className="text-sm">{selectedDelivery.notes || "Sin notas adicionales"}</p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                {!resolvedDeliveries.includes(selectedDelivery.id) && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleSendReminder(selectedDelivery.id)
                      }}
                      disabled={sentReminders.includes(selectedDelivery.id)}
                    >
                      {sentReminders.includes(selectedDelivery.id) ? "Recordatorio enviado" : "Enviar recordatorio"}
                      {!sentReminders.includes(selectedDelivery.id) && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={() => {
                        handleResolve(selectedDelivery.id)
                        setSelectedDelivery(null)
                      }}
                    >
                      Marcar como confirmado
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
