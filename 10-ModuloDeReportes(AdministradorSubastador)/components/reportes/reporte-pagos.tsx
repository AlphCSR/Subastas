"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DownloadIcon, FileSpreadsheetIcon, FileTypeIcon, SearchIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// Actualizar la importación de los datos de prueba
import { mockPagos } from "@/app/data/mock-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ReportePagosProps {
  dateRange: DateRange | undefined
}

export function ReportePagos({ dateRange }: ReportePagosProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [metodoSeleccionado, setMetodoSeleccionado] = useState<string>("todos")

  // Filtrar pagos por rango de fechas, método y término de búsqueda
  const filteredPagos = mockPagos.filter((pago) => {
    const fechaPago = new Date(pago.fecha)
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (fechaPago >= dateRange.from && fechaPago <= dateRange.to)

    const matchesMetodo = metodoSeleccionado === "todos" || pago.metodoPago === metodoSeleccionado

    const matchesSearch =
      pago.subastaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.id.toString().includes(searchTerm) ||
      pago.usuario.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesDateRange && matchesMetodo && matchesSearch
  })

  // Datos para el gráfico
  const chartData = filteredPagos
    .reduce((acc: any[], pago) => {
      const date = format(new Date(pago.fecha), "dd/MM", { locale: es })
      const existingDate = acc.find((item) => item.name === date)

      if (existingDate) {
        existingDate.total += pago.monto
      } else {
        acc.push({
          name: date,
          total: pago.monto,
        })
      }

      return acc
    }, [])
    .sort((a, b) => {
      const dateA = new Date(a.name.split("/").reverse().join("/"))
      const dateB = new Date(b.name.split("/").reverse().join("/"))
      return dateA.getTime() - dateB.getTime()
    })

  // Calcular estadísticas
  const totalPagos = filteredPagos.length
  const montoTotal = filteredPagos.reduce((sum, pago) => sum + pago.monto, 0)
  const montoPromedio = totalPagos > 0 ? montoTotal / totalPagos : 0

  // Contar pagos por método
  const pagosPorMetodo = filteredPagos.reduce((acc: Record<string, number>, pago) => {
    acc[pago.metodoPago] = (acc[pago.metodoPago] || 0) + 1
    return acc
  }, {})

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
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pagos..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={metodoSeleccionado} onValueChange={setMetodoSeleccionado}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Método de pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los métodos</SelectItem>
              <SelectItem value="Tarjeta de crédito">Tarjeta de crédito</SelectItem>
              <SelectItem value="PayPal">PayPal</SelectItem>
              <SelectItem value="Transferencia">Transferencia</SelectItem>
            </SelectContent>
          </Select>
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
            <div className="text-2xl font-bold">{totalPagos}</div>
            <p className="text-xs text-muted-foreground">Total de pagos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${montoTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monto total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              ${montoPromedio.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Monto promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Total"]}
                labelFormatter={(label) => `Fecha: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Métodos de pago</h3>
          <div className="space-y-4">
            {Object.entries(pagosPorMetodo).map(([metodo, cantidad]) => {
              const porcentaje = totalPagos > 0 ? (cantidad / totalPagos) * 100 : 0
              return (
                <div key={metodo} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{metodo}</span>
                    <span className="text-sm text-muted-foreground">
                      {cantidad} pagos ({porcentaje.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Subasta</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Método</TableHead>
              <TableHead className="text-right">Monto</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPagos.length > 0 ? (
              filteredPagos.map((pago) => (
                <TableRow key={pago.id}>
                  <TableCell className="font-medium">{pago.id}</TableCell>
                  <TableCell>{pago.subastaTitle}</TableCell>
                  <TableCell>{pago.usuario}</TableCell>
                  <TableCell>{format(new Date(pago.fecha), "dd/MM/yyyy HH:mm", { locale: es })}</TableCell>
                  <TableCell>{pago.metodoPago}</TableCell>
                  <TableCell className="text-right">${pago.monto.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        pago.estado === "Completado"
                          ? "bg-green-100 text-green-800"
                          : pago.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pago.estado}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
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
