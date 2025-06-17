"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, FileSpreadsheet, FileText, Search } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { exportToExcel, exportToPdf } from "../utils/export-utils"
import { subastasGanadasData } from "../data/mock-data"

export function SubastasGanadas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [categoryFilter, setCategoryFilter] = useState("todas")
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Filtrar datos según los criterios seleccionados
  const filteredData = subastasGanadasData.filter((item) => {
    const matchesSearch =
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toString().includes(searchTerm)

    const matchesStatus = statusFilter === "todos" || item.estado === statusFilter
    const matchesCategory = categoryFilter === "todas" || item.categoria === categoryFilter

    const matchesDate = !date || new Date(item.fechaGanada).toDateString() === date.toDateString()

    return matchesSearch && matchesStatus && matchesCategory && matchesDate
  })

  // Función para exportar a Excel
  const handleExportExcel = () => {
    exportToExcel(filteredData, "subastas-ganadas")
  }

  // Función para exportar a PDF
  const handleExportPdf = () => {
    exportToPdf(filteredData, "subastas-ganadas")
  }

  // Obtener categorías únicas para el filtro
  const categorias = [...new Set(subastasGanadasData.map((item) => item.categoria))]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Subastas Ganadas</CardTitle>
            <CardDescription>Historial de subastas en las que has resultado ganador</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPdf}>
              <FileText className="mr-2 h-4 w-4" />
              HTML
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="busqueda">Búsqueda</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busqueda"
                  type="search"
                  placeholder="Buscar por título o ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="pendiente">Pendiente de pago</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Fecha Ganada</TableHead>
                  <TableHead>Precio Final</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((subasta) => (
                    <TableRow key={subasta.id}>
                      <TableCell className="font-medium">{subasta.id}</TableCell>
                      <TableCell>{subasta.titulo}</TableCell>
                      <TableCell>{format(new Date(subasta.fechaGanada), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        {subasta.precioFinal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                      </TableCell>
                      <TableCell>{subasta.categoria}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            subasta.estado === "completado"
                              ? "default"
                              : subasta.estado === "pendiente"
                                ? "secondary"
                                : subasta.estado === "enviado"
                                  ? "outline"
                                  : "success"
                          }
                        >
                          {subasta.estado === "completado"
                            ? "Completado"
                            : subasta.estado === "pendiente"
                              ? "Pendiente de pago"
                              : subasta.estado === "enviado"
                                ? "Enviado"
                                : "Entregado"}
                        </Badge>
                      </TableCell>
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
      </CardContent>
    </Card>
  )
}
