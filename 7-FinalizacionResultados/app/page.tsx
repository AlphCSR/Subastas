"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import GanadorNotificacion from "./components/ganador-notificacion"

export default function HomePage() {
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false)

  useEffect(() => {
    // Simular una notificación después de 3 segundos
    const timer = setTimeout(() => {
      setMostrarNotificacion(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto py-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Aplicación de Subastas</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explora las diferentes secciones de la aplicación de subastas
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/subastas-finalizadas">
            <Button size="lg">Ver Subastas Finalizadas</Button>
          </Link>
          <Link href="/ganador/1">
            <Button size="lg" variant="outline">
              Ver Vista de Ganador
            </Button>
          </Link>
        </div>
      </div>

      {mostrarNotificacion && (
        <GanadorNotificacion
          subastaId="1"
          producto="iPhone 14 Pro Max"
          imagen="/placeholder.svg?height=80&width=80"
          precioFinal={1250}
        />
      )}
    </div>
  )
}
