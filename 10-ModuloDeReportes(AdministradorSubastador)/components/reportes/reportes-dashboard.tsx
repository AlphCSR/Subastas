"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReporteSubastas } from "./reporte-subastas"
import { ReportePujas } from "./reporte-pujas"
import { ReportePagos } from "./reporte-pagos"
import { DatePickerWithRange } from "./date-range-picker"
import type { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { mockSubastas, mockPujas, mockPagos } from "@/data/mock-data"

export default function ReportesDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  useEffect(() => {
    // Verificar que los datos se están cargando correctamente
    console.log("Datos de prueba cargados:", {
      subastas: mockSubastas.length,
      pujas: mockPujas.length,
      pagos: mockPagos.length,
    })
  }, [])

  return (
    <div className="container mx-auto py-8 px-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground">Visualiza y exporta reportes detallados del sistema de subastas</p>
        </div>
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>

      <Tabs defaultValue="subastas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subastas">Subastas Realizadas</TabsTrigger>
          <TabsTrigger value="pujas">Pujas por Usuario</TabsTrigger>
          <TabsTrigger value="pagos">Pagos Recibidos</TabsTrigger>
        </TabsList>
        <TabsContent value="subastas">
          <Card>
            <CardHeader>
              <CardTitle>Subastas Realizadas</CardTitle>
              <CardDescription>Listado de todas las subastas completadas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ReporteSubastas dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pujas">
          <Card>
            <CardHeader>
              <CardTitle>Pujas por Usuario</CardTitle>
              <CardDescription>Análisis detallado de las pujas realizadas por cada usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportePujas dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pagos">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Recibidos</CardTitle>
              <CardDescription>Registro de todos los pagos procesados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportePagos dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
