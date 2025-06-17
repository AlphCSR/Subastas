"use client"

import { useState } from "react"
import { CheckCircle, Truck, CreditCard, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Datos de prueba para la subasta ganada
const subastaGanada = {
  id: "1",
  producto: "iPhone 14 Pro Max",
  imagen: "/placeholder.svg?height=300&width=300",
  precioFinal: 1250,
  precioInicial: 800,
  fechaFin: "15/06/2023",
  vendedor: {
    nombre: "TechStore",
    calificacion: 4.8,
    ventas: 245,
  },
  estado: "pendiente_pago", // pendiente_pago, pagado, enviado, entregado
  direccionEnvio: "Calle Principal 123, Ciudad de México, CP 12345",
  metodoPago: null,
  numeroSeguimiento: null,
  fechaEstimadaEntrega: "30/06/2023",
  detallesProducto: "iPhone 14 Pro Max, 256GB, Color Grafito, Nuevo y Sellado",
}

export default function GanadorPage({ params }: { params: { id: string } }) {
  const [estado, setEstado] = useState(subastaGanada.estado)

  // Función para simular el pago
  const realizarPago = () => {
    setTimeout(() => {
      setEstado("pagado")
    }, 1500)
  }

  // Función para simular el envío
  const simularEnvio = () => {
    setTimeout(() => {
      setEstado("enviado")
    }, 1500)
  }

  // Función para simular la entrega
  const simularEntrega = () => {
    setTimeout(() => {
      setEstado("entregado")
    }, 1500)
  }

  // Determinar el progreso según el estado
  const getProgreso = () => {
    switch (estado) {
      case "pendiente_pago":
        return 25
      case "pagado":
        return 50
      case "enviado":
        return 75
      case "entregado":
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href="/subastas-finalizadas">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Subastas Finalizadas
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="bg-green-50 dark:bg-green-950 border-b">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle className="text-2xl">¡Felicidades! Has ganado esta subasta</CardTitle>
                <CardDescription>Completa el proceso de pago para recibir tu producto</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Estado del Proceso</h3>
              <Progress value={getProgreso()} className="h-2 mb-2" />
              <div className="grid grid-cols-4 text-xs text-center mt-1">
                <div className={estado !== "pendiente_pago" ? "text-muted-foreground" : ""}>Ganador</div>
                <div className={estado !== "pagado" ? "text-muted-foreground" : ""}>Pago Realizado</div>
                <div className={estado !== "enviado" ? "text-muted-foreground" : ""}>Producto Enviado</div>
                <div className={estado !== "entregado" ? "text-muted-foreground" : ""}>Entregado</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Detalles de la Subasta</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">ID de Subasta:</dt>
                  <dd>{params.id}</dd>
                  <dt className="font-medium">Fecha de Finalización:</dt>
                  <dd>{subastaGanada.fechaFin}</dd>
                  <dt className="font-medium">Precio Inicial:</dt>
                  <dd>${subastaGanada.precioInicial}</dd>
                  <dt className="font-medium">Precio Final:</dt>
                  <dd className="font-bold text-green-600">${subastaGanada.precioFinal}</dd>
                  <dt className="font-medium">Vendedor:</dt>
                  <dd>
                    {subastaGanada.vendedor.nombre} ({subastaGanada.vendedor.calificacion}★)
                  </dd>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Información de Envío</h3>
                {estado === "pendiente_pago" ? (
                  <div className="text-sm text-muted-foreground">
                    La información de envío estará disponible después de realizar el pago.
                  </div>
                ) : (
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="font-medium">Dirección:</dt>
                    <dd>{subastaGanada.direccionEnvio}</dd>
                    <dt className="font-medium">Estado:</dt>
                    <dd>
                      {estado === "pagado" && "Procesando envío"}
                      {estado === "enviado" && "En camino"}
                      {estado === "entregado" && "Entregado"}
                    </dd>
                    {estado === "enviado" && (
                      <>
                        <dt className="font-medium">Número de Seguimiento:</dt>
                        <dd>TRK123456789MX</dd>
                        <dt className="font-medium">Entrega Estimada:</dt>
                        <dd>{subastaGanada.fechaEstimadaEntrega}</dd>
                      </>
                    )}
                  </dl>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="detalles">
              <TabsList>
                <TabsTrigger value="detalles">Detalles del Producto</TabsTrigger>
                <TabsTrigger value="vendedor">Información del Vendedor</TabsTrigger>
                <TabsTrigger value="politicas">Políticas de Devolución</TabsTrigger>
              </TabsList>
              <TabsContent value="detalles" className="pt-4">
                <p>{subastaGanada.detallesProducto}</p>
              </TabsContent>
              <TabsContent value="vendedor" className="pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-muted h-12 w-12 rounded-full flex items-center justify-center">
                    {subastaGanada.vendedor.nombre.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{subastaGanada.vendedor.nombre}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-amber-500">★ {subastaGanada.vendedor.calificacion}</span>
                      <span className="text-muted-foreground">{subastaGanada.vendedor.ventas} ventas</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver Perfil del Vendedor
                </Button>
              </TabsContent>
              <TabsContent value="politicas" className="pt-4">
                <p className="text-sm">
                  Tienes 7 días después de recibir el producto para solicitar una devolución si el artículo no coincide
                  con la descripción. Contacta al vendedor directamente para iniciar el proceso de devolución.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-4">
                <img
                  src={subastaGanada.imagen || "/placeholder.svg"}
                  alt={subastaGanada.producto}
                  className="rounded-lg mb-4 max-w-full h-auto"
                />
                <h3 className="font-medium text-lg text-center">{subastaGanada.producto}</h3>
              </div>

              <dl className="grid grid-cols-2 gap-2 text-sm">
                <dt>Precio Final:</dt>
                <dd className="font-bold">${subastaGanada.precioFinal}</dd>
                <dt>Comisión:</dt>
                <dd>$25.00</dd>
                <dt>Envío:</dt>
                <dd>$15.00</dd>
                <Separator className="col-span-2 my-2" />
                <dt className="font-bold">Total:</dt>
                <dd className="font-bold">${subastaGanada.precioFinal + 25 + 15}</dd>
              </dl>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {estado === "pendiente_pago" && (
                <Button className="w-full" onClick={realizarPago}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Realizar Pago
                </Button>
              )}

              {estado === "pagado" && (
                <Button className="w-full" onClick={simularEnvio}>
                  <Truck className="mr-2 h-4 w-4" />
                  Simular Envío
                </Button>
              )}

              {estado === "enviado" && (
                <Button className="w-full" onClick={simularEntrega}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Simular Entrega
                </Button>
              )}

              {estado === "entregado" && (
                <Button className="w-full" variant="outline">
                  Dejar Valoración
                </Button>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compartir esta subasta con amigos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Necesitas Ayuda?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Contactar al Vendedor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Reportar un Problema
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Preguntas Frecuentes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
