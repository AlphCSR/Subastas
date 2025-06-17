"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DownloadIcon, FileSpreadsheetIcon, FileTypeIcon, SearchIcon, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockPujas, mockUsuarios } from "@/app/data/mock-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts"

interface ReportePujasProps {
  dateRange: DateRange | undefined
}

export function ReportePujas({ dateRange }: ReportePujasProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string>("todos")

  // Filtrar pujas por rango de fechas, usuario y término de búsqueda
  const filteredPujas = mockPujas.filter((puja) => {
    const fechaPuja = new Date(puja.fecha)
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (fechaPuja >= dateRange.from && fechaPuja <= dateRange.to)

    const matchesUsuario = usuarioSeleccionado === "todos" || puja.usuarioId.toString() === usuarioSeleccionado

    const matchesSearch =
      puja.subastaTitle.toLowerCase().includes(searchTerm.toLowerCase()) || puja.id.toString().includes(searchTerm)

    return matchesDateRange && matchesUsuario && matchesSearch
  })

  // Datos para el gráfico
  const chartData = mockUsuarios
    .map((usuario) => {
      const pujasPorUsuario = filteredPujas.filter((puja) => puja.usuarioId === usuario.id)
      return {
        name: usuario.nombre,
        value: pujasPorUsuario.length,
        id: usuario.id,
      }
    })
    .filter((item) => item.value > 0)

  // Colores para el gráfico
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  // Calcular estadísticas
  const totalPujas = filteredPujas.length
  const usuariosUnicos = new Set(filteredPujas.map((puja) => puja.usuarioId)).size
  const valorPromedio =
    filteredPujas.length > 0 ? filteredPujas.reduce((sum, puja) => sum + puja.valor, 0) / filteredPujas.length : 0

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
              placeholder="Buscar pujas..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={usuarioSeleccionado} onValueChange={setUsuarioSeleccionado}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Seleccionar usuario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los usuarios</SelectItem>
              {mockUsuarios.map((usuario) => (
                <SelectItem key={usuario.id} value={usuario.id.toString()}>
                  {usuario.nombre}
                </SelectItem>
              ))}
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
            <div className="text-2xl font-bold">{totalPujas}</div>
            <p className="text-xs text-muted-foreground">Total de pujas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{usuariosUnicos}</div>
            <p className="text-xs text-muted-foreground">Usuarios participantes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              ${valorPromedio.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Valor promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} pujas`, "Cantidad"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Usuarios más activos</h3>
          <div className="space-y-2">
            {chartData
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((usuario, index) => {
                const porcentaje = totalPujas > 0 ? (usuario.value / totalPujas) * 100 : 0
                return (
                  <div key={usuario.id} className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{usuario.name}</span>
                        <span className="text-sm text-muted-foreground">{usuario.value} pujas</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                      </div>
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
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPujas.length > 0 ? (
              filteredPujas.map((puja) => {
                const usuario = mockUsuarios.find((u) => u.id === puja.usuarioId)
                return (
                  <TableRow key={puja.id}>
                    <TableCell className="font-medium">{puja.id}</TableCell>
                    <TableCell>{puja.subastaTitle}</TableCell>
                    <TableCell>{usuario?.nombre || "Desconocido"}</TableCell>
                    <TableCell>{format(new Date(puja.fecha), "dd/MM/yyyy HH:mm", { locale: es })}</TableCell>
                    <TableCell className="text-right">${puja.valor.toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          puja.ganadora ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {puja.ganadora ? "Ganadora" : "Normal"}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })
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
