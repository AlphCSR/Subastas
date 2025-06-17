"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

// Datos de prueba
const activityData = [
  {
    id: 1,
    fecha: new Date(2023, 5, 15, 10, 30),
    accion: "Inicio de sesión",
    ip: "192.168.1.1",
    dispositivo: "Chrome / Windows 10",
  },
  {
    id: 2,
    fecha: new Date(2023, 5, 15, 11, 45),
    accion: "Oferta en subasta",
    ip: "192.168.1.1",
    dispositivo: "Chrome / Windows 10",
  },
  {
    id: 3,
    fecha: new Date(2023, 5, 14, 9, 15),
    accion: "Cambio de contraseña",
    ip: "192.168.1.1",
    dispositivo: "Chrome / Windows 10",
  },
  {
    id: 4,
    fecha: new Date(2023, 5, 12, 16, 20),
    accion: "Actualización de perfil",
    ip: "192.168.1.1",
    dispositivo: "Safari / macOS",
  },
  {
    id: 5,
    fecha: new Date(2023, 5, 10, 14, 5),
    accion: "Inicio de sesión",
    ip: "192.168.1.2",
    dispositivo: "Firefox / Ubuntu",
  },
  {
    id: 6,
    fecha: new Date(2023, 5, 8, 11, 30),
    accion: "Oferta en subasta",
    ip: "192.168.1.2",
    dispositivo: "Firefox / Ubuntu",
  },
  {
    id: 7,
    fecha: new Date(2023, 5, 5, 9, 45),
    accion: "Inicio de sesión",
    ip: "192.168.1.3",
    dispositivo: "Chrome / Android",
  },
]

export default function ActivityPage() {
  const [filters, setFilters] = useState({
    accion: "",
    fecha: null as Date | null,
  })

  const handleActionChange = (value: string) => {
    setFilters((prev) => ({ ...prev, accion: value }))
  }

  const handleDateChange = (date: Date | null) => {
    setFilters((prev) => ({ ...prev, fecha: date }))
  }

  const resetFilters = () => {
    setFilters({
      accion: "",
      fecha: null,
    })
  }

  // Filtrar los datos según los filtros aplicados
  const filteredData = activityData.filter((item) => {
    // Filtrar por acción
    if (filters.accion && item.accion !== filters.accion) {
      return false
    }

    // Filtrar por fecha
    if (filters.fecha) {
      const itemDate = new Date(item.fecha)
      const filterDate = new Date(filters.fecha)

      if (
        itemDate.getDate() !== filterDate.getDate() ||
        itemDate.getMonth() !== filterDate.getMonth() ||
        itemDate.getFullYear() !== filterDate.getFullYear()
      ) {
        return false
      }
    }

    return true
  })

  // Obtener acciones únicas para el filtro
  const uniqueActions = Array.from(new Set(activityData.map((item) => item.accion)))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Actividad</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Label htmlFor="filter-action">Filtrar por acción</Label>
              <Select value={filters.accion} onValueChange={handleActionChange}>
                <SelectTrigger id="filter-action">
                  <SelectValue placeholder="Todas las acciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las acciones</SelectItem>
                  {uniqueActions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label htmlFor="filter-date">Filtrar por fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="filter-date" variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.fecha ? format(filters.fecha, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.fecha || undefined}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters}>
                Limpiar filtros
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acción</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Dispositivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{format(item.fecha, "dd/MM/yyyy HH:mm")}</TableCell>
                      <TableCell>{item.accion}</TableCell>
                      <TableCell>{item.ip}</TableCell>
                      <TableCell>{item.dispositivo}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No se encontraron registros de actividad.
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
