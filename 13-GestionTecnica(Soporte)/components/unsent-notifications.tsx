"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import type { UnsentNotification } from "../lib/mock-data"

interface UnsentNotificationsProps {
  notifications: UnsentNotification[]
}

export default function UnsentNotifications({ notifications }: UnsentNotificationsProps) {
  const [selectedNotification, setSelectedNotification] = useState<UnsentNotification | null>(null)
  const [sentNotifications, setSentNotifications] = useState<string[]>([])
  const [retryingNotifications, setRetryingNotifications] = useState<string[]>([])

  const handleSend = (notificationId: string) => {
    setRetryingNotifications([...retryingNotifications, notificationId])

    // Simular el envío exitoso después de un tiempo
    setTimeout(() => {
      setRetryingNotifications(retryingNotifications.filter((id) => id !== notificationId))
      setSentNotifications([...sentNotifications, notificationId])
    }, 1500)
  }

  const getNotificationType = (type: string) => {
    switch (type) {
      case "auction_end":
        return "Fin de subasta"
      case "bid_outbid":
        return "Oferta superada"
      case "delivery_reminder":
        return "Recordatorio de entrega"
      case "payment_confirmation":
        return "Confirmación de pago"
      default:
        return type
    }
  }

  const getErrorTypeColor = (errorType: string) => {
    switch (errorType) {
      case "server_error":
        return "destructive"
      case "timeout":
        return "warning"
      case "invalid_recipient":
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
              <TableHead>ID</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Destinatario</TableHead>
              <TableHead>Error</TableHead>
              <TableHead>Intentos</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No hay notificaciones sin enviar
                </TableCell>
              </TableRow>
            ) : (
              notifications.map((notification) => (
                <TableRow
                  key={notification.id}
                  className={sentNotifications.includes(notification.id) ? "bg-green-50" : ""}
                >
                  <TableCell className="font-medium">{notification.id}</TableCell>
                  <TableCell>{getNotificationType(notification.type)}</TableCell>
                  <TableCell>{notification.recipient}</TableCell>
                  <TableCell>
                    <Badge variant={getErrorTypeColor(notification.errorType)}>{notification.errorType}</Badge>
                  </TableCell>
                  <TableCell>{notification.attempts}</TableCell>
                  <TableCell>{new Date(notification.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    {sentNotifications.includes(notification.id) ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Enviado
                      </Badge>
                    ) : retryingNotifications.includes(notification.id) ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
                        Enviando...
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        Fallido
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
                        <DropdownMenuItem onClick={() => setSelectedNotification(notification)}>
                          Ver detalles
                        </DropdownMenuItem>
                        {!sentNotifications.includes(notification.id) &&
                          !retryingNotifications.includes(notification.id) && (
                            <DropdownMenuItem onClick={() => handleSend(notification.id)}>
                              Reintentar envío
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

      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la notificación no enviada</DialogTitle>
            <DialogDescription>Información detallada sobre la notificación fallida</DialogDescription>
          </DialogHeader>

          {selectedNotification && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">ID Notificación</h4>
                  <p className="text-sm">{selectedNotification.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Tipo</h4>
                  <p className="text-sm">{getNotificationType(selectedNotification.type)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Destinatario</h4>
                  <p className="text-sm">{selectedNotification.recipient}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha del error</h4>
                  <p className="text-sm">{new Date(selectedNotification.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Tipo de error</h4>
                  <p className="text-sm">{selectedNotification.errorType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Intentos realizados</h4>
                  <p className="text-sm">{selectedNotification.attempts}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Mensaje de error</h4>
                <div className="bg-slate-50 p-3 rounded-md text-sm font-mono">{selectedNotification.errorMessage}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Contenido de la notificación</h4>
                <div className="bg-slate-50 p-3 rounded-md text-sm">
                  <p>
                    <strong>Asunto:</strong> {selectedNotification.subject}
                  </p>
                  <p className="mt-2">
                    <strong>Mensaje:</strong>
                  </p>
                  <p className="mt-1">{selectedNotification.content}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                {!sentNotifications.includes(selectedNotification.id) &&
                  !retryingNotifications.includes(selectedNotification.id) && (
                    <Button
                      onClick={() => {
                        handleSend(selectedNotification.id)
                        setSelectedNotification(null)
                      }}
                    >
                      Reintentar envío
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
