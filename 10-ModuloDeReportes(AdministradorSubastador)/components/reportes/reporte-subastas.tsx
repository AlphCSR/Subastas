"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DownloadIcon, FileSpreadsheetIcon, FileTypeIcon, SearchIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockSubastas } from "@/app/data/mock-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface ReporteSubastasProps {
  dateRange: DateRange | undefined
}

export function ReporteSubastas({ dateRange }: ReporteSubastasProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar subastas por rango de fechas y término de búsqueda
  const filteredSubastas = mockSubastas.filter((subasta) => {
    const fechaSubasta = new Date(subasta.fechaFinalizacion)
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (fechaSubasta >= dateRange.from && fechaSubasta <= dateRange.to)

    const matchesSearch =
      subasta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subasta.id.toString().includes(searchTerm) ||
      subasta.ganador.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesDateRange && matchesSearch
  })

  // Datos para el gráfico
  const chartData = filteredSubastas.reduce((acc: any[], subasta) => {
    const month = format(new Date(subasta.fechaFinalizacion), "MMM", { locale: es })
    const existingMonth = acc.find((item) => item.name === month)

    if (existingMonth) {
      existingMonth.total += subasta.precioFinal
      existingMonth.count += 1
    } else {
      acc.push({
        name: month,
        total: subasta.precioFinal,
        count: 1,
      })
    }

    return acc
  }, [])

  // Calcular estadísticas
  const totalSubastas = filteredSubastas.length
  const totalIngresos = filteredSubastas.reduce((sum, subasta) => sum + subasta.precioFinal, 0)
  const precioPromedio = totalSubastas > 0 ? totalIngresos / totalSubastas : 0

  const exportarPDF = () => {
    console.log("Exportando a PDF...")
    // Aquí iría la lógica para exportar a PDF
  }

  const exportarExcel = () => {
    console.log("Exportando a Excel...")
    // Aquí iría la lógica para exportar a Excel
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título, ID o ganador..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportarPDF}>
              <FileTypeIcon className="mr-2 h-4 w-4" />
              Exportar a PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportarExcel}>
              <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
              Exportar a Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalSubastas}</div>
            <p className="text-xs text-muted-foreground">Subastas completadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${totalIngresos.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Ingresos totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              ${precioPromedio.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Precio promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Total"]}
              labelFormatter={(label) => `Mes: ${label}`}
            />
            <Bar dataKey="total" name="Ingresos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Ganador</TableHead>
              <TableHead className="text-right">Precio Final</TableHead>
              <TableHead className="text-right">Pujas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubastas.length > 0 ? (
              filteredSubastas.map((subasta) => (
                <TableRow key={subasta.id}>
                  <TableCell className="font-medium">{subasta.id}</TableCell>
                  <TableCell>{subasta.titulo}</TableCell>
                  <TableCell>{format(new Date(subasta.fechaFinalizacion), "dd/MM/yyyy", { locale: es })}</TableCell>
                  <TableCell>{subasta.ganador}</TableCell>
                  <TableCell className="text-right">${subasta.precioFinal.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{subasta.numeroPujas}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
