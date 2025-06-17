"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Premio } from "@/lib/data/premios-mock"
import { CheckCircle, Clock, Package, Truck } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ConfirmarRecepcionProps {
  premio: Premio | null
  onConfirm: () => void
}

type EstadoEntrega = "pendiente" | "en_camino" | "entregado"

export default function ConfirmarRecepcion({ premio, onConfirm }: ConfirmarRecepcionProps) {
  const [estado, setEstado] = useState<EstadoEntrega>("en_camino")
  const [progreso, setProgreso] = useState(65)

  // Simular cambio de estado después de un tiempo
  const simularEntrega = () => {
    setEstado("entregado")
    setProgreso(100)
  }

  if (!premio) return null

  return (
    <div className="space-y-6 py-4">
      <Card>
        <CardHeader>
          <CardTitle>Estado de tu premio: {premio.nombre}</CardTitle>
          <CardDescription>
            Número de seguimiento: SUB-{Math.floor(Math.random() * 10000)}-{new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={progreso} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center mb-6">
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full p-2 ${estado === "pendiente" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}
              >
                <Package className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">Preparando</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full p-2 ${estado === "en_camino" ? "bg-primary text-primary-foreground" : estado === "entregado" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">En camino</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full p-2 ${estado === "entregado" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">Entregado</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Detalles de la entrega</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Fecha estimada:</div>
                <div>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                <div>Dirección:</div>
                <div>Av. Libertador 1234, Buenos Aires</div>
                <div>Método de entrega:</div>
                <div>Entrega a domicilio</div>
              </div>
            </div>

            {estado === "entregado" ? (
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <h4 className="font-medium">¡Tu premio ha sido entregado!</h4>
                </div>
                <p className="text-sm mt-2">
                  Entregado el {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <Clock className="h-5 w-5 mr-2" />
                  <h4 className="font-medium">Tu premio está en camino</h4>
                </div>
                <p className="text-sm mt-2">Recibirás una notificación cuando sea entregado</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {estado !== "entregado" && (
            <Button variant="outline" onClick={simularEntrega}>
              Simular entrega
            </Button>
          )}
          <Button onClick={onConfirm} disabled={estado !== "entregado"}>
            Confirmar recepción
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
