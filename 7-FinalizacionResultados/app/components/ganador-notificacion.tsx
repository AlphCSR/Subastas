"use client"

import { useState } from "react"
import { CheckCircle, X } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface GanadorNotificacionProps {
  subastaId: string
  producto: string
  imagen: string
  precioFinal: number
}

export default function GanadorNotificacion({ subastaId, producto, imagen, precioFinal }: GanadorNotificacionProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-green-200 animate-in slide-in-from-right">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">¡Felicidades! Has ganado</h4>
                <p className="text-sm text-muted-foreground">Subasta finalizada</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setVisible(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <img src={imagen || "/placeholder.svg"} alt={producto} className="h-12 w-12 rounded object-cover" />
              <div>
                <p className="text-sm font-medium line-clamp-1">{producto}</p>
                <p className="text-sm font-bold">${precioFinal}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/50 flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => setVisible(false)}>
          Descartar
        </Button>
        <Link href={`/ganador/${subastaId}`}>
          <Button size="sm">Ver Detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
