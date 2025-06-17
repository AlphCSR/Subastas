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
import { pujasRealizadasData } from "../data/mock-data"

export function PujasRealizadas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [categoryFilter, setCategoryFilter] = useState("todas")
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Filtrar datos según los criterios seleccionados
  const filteredData = pujasRealizadasData.filter((item) => {
    const matchesSearch =
      item.tituloSubasta.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toString().includes(searchTerm)

    const matchesStatus = statusFilter === "todos" || item.estado === statusFilter
    const matchesCategory = categoryFilter === "todas" || item.categoria === categoryFilter

    const matchesDate = !date || new Date(item.fechaPuja).toDateString() === date.toDateString()

    return matchesSearch && matchesStatus && matchesCategory && matchesDate
  })

  // Función para exportar a Excel
  const handleExportExcel = () => {
    exportToExcel(filteredData, "pujas-realizadas")
  }

  // Función para exportar a PDF
  const handleExportPdf = () => {
    exportToPdf(filteredData, "pujas-realizadas")
  }

  // Obtener categorías únicas para el filtro
  const categorias = [...new Set(pujasRealizadasData.map((item) => item.categoria))]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Pujas Realizadas</CardTitle>
            <CardDescription>Historial de todas tus pujas en subastas</CardDescription>
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
                  <SelectItem value="ganada">Ganada</SelectItem>
                  <SelectItem value="superada">Superada</SelectItem>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="finalizada">Finalizada</SelectItem>
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
                  <TableHead>Subasta</TableHead>
                  <TableHead>Fecha Puja</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((puja) => (
                    <TableRow key={puja.id}>
                      <TableCell className="font-medium">{puja.id}</TableCell>
                      <TableCell>{puja.tituloSubasta}</TableCell>
                      <TableCell>{format(new Date(puja.fechaPuja), "dd/MM/yyyy HH:mm")}</TableCell>
                      <TableCell>
                        {puja.cantidad.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                      </TableCell>
                      <TableCell>{puja.categoria}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            puja.estado === "ganada"
                              ? "success"
                              : puja.estado === "superada"
                                ? "destructive"
                                : puja.estado === "activa"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {puja.estado === "ganada"
                            ? "Ganada"
                            : puja.estado === "superada"
                              ? "Superada"
                              : puja.estado === "activa"
                                ? "Activa"
                                : "Finalizada"}
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
